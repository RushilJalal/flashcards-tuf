import React, { useState, useEffect } from "react";

function FlashcardViewer() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

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

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    setIsFlipped(false);
  };

  const prevCard = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length
    );
    setIsFlipped(false);
  };

  if (flashcards.length === 0) return <div>Loading...</div>;

  const currentCard = flashcards[currentIndex];

  return (
    <div className="flashcard-viewer">
      <div
        className={`flashcard ${isFlipped ? "flipped" : ""}`}
        onClick={flipCard}
      >
        <div className="front">{currentCard.question}</div>
        <div className="back">{currentCard.answer}</div>
      </div>
      <div className="navigation">
        <button onClick={prevCard}>Previous</button>
        <button onClick={nextCard}>Next</button>
      </div>
    </div>
  );
}

export default FlashcardViewer;
