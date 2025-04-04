import React, { useState } from "react";
import RoomCreator from "./RoomCreator";
import "./App.css"; // Import global styles

const App = () => {
  return (
    <div className="app-container">
      <aside className="sidebar">
        <h1 className="logo">🚀 CodeSync</h1>
        <p className="sidebar-text">Real-time Collaborative Coding</p>
      </aside>
      <main className="main-content">
        <RoomCreator />
      </main>
    </div>
  );
};

export default App;
