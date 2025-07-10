const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const bodyParser = require('body-parser');



// Load gRPC proto

const packageDef = protoLoader.loadSync(path.resolve(__dirname, './proto/student.proto'));
const grpcObject = grpc.loadPackageDefinition(packageDef);
const schoolPackage = grpcObject.school;

// gRPC client
const grpcClient = new schoolPackage.SchoolService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);


// MongoDB User schema
const User = mongoose.model('User', new mongoose.Schema({
    email: String,
    password: String,
  }));


  // JWT secret key
const SECRET = 'your_jwt_secret_key';

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/express_auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
  

// Middleware to protect routes
function authMiddleware(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token required' });
  
    try {
      const decoded = jwt.verify(token, SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
  }



// Auth: Register
app.post('/auth/register', async (req, res) => {
    const { email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'User already exists' });
  
    const user = await User.create({ email, password });
    res.json(user);
  });
  
  // Auth: Login
  app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  
    const token = jwt.sign({ userId: user._id }, SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
  
  // User: Get profile (protected)
  app.get('/user/me', authMiddleware, async (req, res) => {
    const user = await User.findById(req.user.userId);
    res.json(user);
  });
  
  // gRPC: Create student (protected)
  app.post('/students', authMiddleware, (req, res) => {
    grpcClient.CreateStudent(req.body, (err, response) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(response);
    });
  });
  
  // gRPC: Get student by id (protected)
  app.get('/students/:id', authMiddleware, (req, res) => {
    grpcClient.GetStudent({ id: parseInt(req.params.id) }, (err, response) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(response);
    });
  });
  
  app.listen(4000, () => console.log('🚀 Express API running at http://localhost:4000'));