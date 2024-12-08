import React, { useState } from 'react';

const Git = () => {
  const [gitHubLink, setGitHubLink] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidURL(gitHubLink)) {
      console.log('GitHub Link Submitted:', gitHubLink);
      setSubmitted(true);
    } else {
      alert('Please enter a valid GitHub URL.');
    }
  };

  const isValidURL = (link) => {
    const urlRegex = /^(https:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/;
    return urlRegex.test(link);
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>Submit Your GitHub Project</h3>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="gitHubLink" style={{ display: 'block', marginBottom: '5px' }}>
              GitHub Project Link:
            </label>
            <input
              type="url"
              id="gitHubLink"
              value={gitHubLink}
              onChange={(e) => setGitHubLink(e.target.value)}
              placeholder="https://github.com/username/repo"
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
              required
            />
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              padding: '10px 15px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Submit
          </button>
        </form>
      ) : (
        <div>
          <p>Thank you! Your GitHub link has been submitted:</p>
          <a href={gitHubLink} target="_blank" rel="noopener noreferrer">
            {gitHubLink}
          </a>
        </div>
      )}
    </div>
  );
};

export default Git;
