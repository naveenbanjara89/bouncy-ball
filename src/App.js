import React, { useState } from "react";
import PhaserGame from "./PhaserGame"; // Import the Phaser game component

const App = () => {
  const [sessions, setSessions] = useState([]);
  const [isGameActive, setIsGameActive] = useState(false);

  const handleSessionEnd = (sessionData) => {
    setSessions([...sessions, sessionData]);
    setIsGameActive(false); // Stop the game when the session ends
  };

  const startNewSession = () => {
    // console.log("colision input : "+document.getElementById('collision-input').value)
    setIsGameActive(true); // Start the game when button is clicked
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <div style={{ width: "30%", padding: "20px" }}>
        {!isGameActive ? (
          <>
            <button onClick={startNewSession}>Start Game</button>
            <div>
              <input
                id="collision-input"
                type="text"
                placeholder="Enter collisions"
              />
            </div>
          </>
        ) : (
          <>
            <PhaserGame
              total_collisions={
                document.getElementById("collision-input").value
              }
              onSessionEnd={handleSessionEnd}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
