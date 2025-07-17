import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  // 1️⃣ MOUNTING: runs once after component is first rendered
  useEffect(() => {
    console.log("✅ Component mounted");
    // 3️⃣ UNMOUNTING: cleanup before component is removed from the DOM
    return () => {
      console.log("❌ Component will unmount");
    };
  }, []); // empty array means: run once on mount, and cleanup on unmount

  // 2️⃣ UPDATING: runs every time `count` changes
  useEffect(() => {
    console.log("🔁 Component updated: count =", count);
  }, [count]); // only runs when count changes

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default App
