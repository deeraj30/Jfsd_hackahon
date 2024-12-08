import React, { useState } from 'react';

const Feedback = () => {
  const feedbackOptions = [
    "4/5 stars: Good design!",
    "3/5 stars: Needs improvement.",
    "No feedback is provided by the mentor.",
    "5/5 stars: Excellent work!",
    "2/5 stars: Significant improvements needed.",
  ];

  const [randomFeedback, setRandomFeedback] = useState('');

  const handleGenerateFeedback = () => {
    const randomIndex = Math.floor(Math.random() * feedbackOptions.length);
    setRandomFeedback(feedbackOptions[randomIndex]);
  };

  const validateInput = () => {
    if (randomFeedback.trim() === '') {
      alert('No feedback generated. Please click the button to generate feedback.');
    } else {
      alert('Feedback successfully generated!');
    }
  };

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '20px auto',
        padding: '20px',
        border: '2px solid blue',
        borderRadius: '10px',
        textAlign: 'center',
        backgroundColor: '#f0f8ff',
      }}
    >
      <h3 style={{ color: 'blue' }}>Mentor Feedback</h3>
      <p style={{ fontSize: '18px', color: 'blue', marginBottom: '20px' }}>
        {randomFeedback || 'Click below to generate feedback'}
      </p>
      <button
        onClick={handleGenerateFeedback}
        style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '10px 15px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '10px',
        }}
      >
        Generate Feedback
      </button>
      <br />
     
    </div>
  );
};

export default Feedback;
