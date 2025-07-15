import React, { useEffect } from "react";
import RoomCreator from "./component/RoomCreator";
import "./App.css"; // Import global styles
import { signInUser } from "./firebase/firebase";

const App = () => {

  useEffect(() => {
    handleSignIn();
  },[]);
  async function handleSignIn(){
    await signInUser();
  }
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
