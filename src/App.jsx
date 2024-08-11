import React, { useState, useEffect } from "react";
import FlashcardViewer from "./FlashcardViewer";
import AdminDashboard from "./AdminDashboard";
import "./App.css";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="App">
      <h1>Flashcard Learning Tool</h1>
      <button onClick={() => setIsAdmin(!isAdmin)}>
        {isAdmin ? "Switch to User View" : "Switch to Admin View"}
      </button>
      {isAdmin ? <AdminDashboard /> : <FlashcardViewer />}
    </div>
  );
}

export default App;
