import React from "react";
import "./LearningCard.css";
function LearningCard({ title, completion, onClick }) {
  return (
    <div className="learning-card">
      <h3 className="learning-title">{title}</h3>
      <p className="learning-completion">Completion: {completion}%</p>
      <button className="learning-button" onClick={onClick}>
        Resume
      </button>
    </div>
  );
}

export default LearningCard;
