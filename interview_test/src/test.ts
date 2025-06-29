interface Bird {
    layEggs(): void;
  }


interface FlyingBird extends Bird {
    fly(): void;
  }

  class Duck implements FlyingBird {
    fly() {
      console.log("Duck flying");
    }
    layEggs() {}
  }


  class Penguin implements  Bird{
    layEggs(): void {
        
    }
  }
  interface Database {
    save(data: string): void;
  }

  class MySQLDatabase implements Database {
    save(data: string) {
      console.log("Saving to MySQL:", data);
    }
  }
  
  class MongoDBDatabase implements Database {
    save(data: string) {
      console.log("Saving to MongoDB:", data);
    }
  }


