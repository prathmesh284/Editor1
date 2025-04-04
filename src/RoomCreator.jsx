import React, { useState } from "react";
import MonacoEditorComponent from "./MonacoEditorComponent";
import "./RoomCreator.css"; // Import separate styles

const RoomCreator = () => {
  const [roomId, setRoomId] = useState("");
  const [isRoomCreated, setIsRoomCreated] = useState(false);

  const createRoom = () => {
    const generatedRoomId = `room-${Math.random().toString(36).substr(2, 9)}`;
    setRoomId(generatedRoomId);
    setIsRoomCreated(true);
  };

  const joinRoom = () => {
    if (roomId.trim() !== "") {
      setIsRoomCreated(true);
    }
  };

  return (
    <div className="room-container">
      {!isRoomCreated ? (
        <div className="room-card">
          <h2 className="room-title">Create or Join a Room</h2>
          <button className="room-btn create-btn" onClick={createRoom}>
            🚀 Create New Room
          </button>

          <div className="room-separator">or</div>

          <input
            type="text"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="room-input"
          />
          <button className="room-btn join-btn" onClick={joinRoom}>
            🔗 Join Room
          </button>
        </div>
      ) : (
        <MonacoEditorComponent roomId={roomId} />
      )}
    </div>
  );
};

export default RoomCreator;
