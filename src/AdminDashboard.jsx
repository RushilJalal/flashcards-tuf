import React, { useState, useEffect } from "react";

function AdminDashboard() {
  const [flashcards, setFlashcards] = useState([]);
  const [newCard, setNewCard] = useState({ question: "", answer: "" });

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/flashcards");
      if (!response.ok) {
        throw new Error("Failed to fetch flashcards");
      }
      const data = await response.json();
      setFlashcards(data);
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    }
  };

  const addFlashcard = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCard),
      });
      if (!response.ok) {
        throw new Error("Failed to add flashcard");
      }
      setNewCard({ question: "", answer: "" });
      fetchFlashcards();
    } catch (error) {
      console.error("Error adding flashcard:", error);
    }
  };

  const updateFlashcard = async (id, updatedCard) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/flashcards/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedCard),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update flashcard");
      }
      fetchFlashcards();
    } catch (error) {
      console.error("Error updating flashcard:", error);
    }
  };

  const deleteFlashcard = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/flashcards/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete flashcard");
      }
      fetchFlashcards();
    } catch (error) {
      console.error("Error deleting flashcard:", error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="add-flashcard">
        <input
          type="text"
          placeholder="Question"
          value={newCard.question}
          onChange={(e) => setNewCard({ ...newCard, question: e.target.value })}
        />
        <input
          type="text"
          placeholder="Answer"
          value={newCard.answer}
          onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}
        />
        <button onClick={addFlashcard}>Add Flashcard</button>
      </div>
      <div className="flashcard-list">
        {flashcards.map((card) => (
          <div key={card.id} className="flashcard-item">
            <input
              type="text"
              value={card.question}
              onChange={(e) =>
                updateFlashcard(card.id, { ...card, question: e.target.value })
              }
            />
            <input
              type="text"
              value={card.answer}
              onChange={(e) =>
                updateFlashcard(card.id, { ...card, answer: e.target.value })
              }
            />
            <button onClick={() => deleteFlashcard(card.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
