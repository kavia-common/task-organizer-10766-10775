import React from "react";
import './App.css';
import './figma_design_system.css';
import TodoApp from "./TodoApp";

// PUBLIC_INTERFACE
function App() {
  // For theming, keep the App wrapper for potential future theme toggles (scaffolded).
  return (
    <div className="App" style={{ margin: 0, padding: 0, minHeight: "100vh", background: "var(--system-bg-base)" }}>
      <TodoApp />
    </div>
  );
}

export default App;
