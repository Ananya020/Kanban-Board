import React from "react";
import Board from "./components/Board";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Kanban Board</h1>
        <Board />
      </div>
    </div>
  );
}

export default App;
