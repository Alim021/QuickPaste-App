import React, { useState } from 'react';
import './Home.css';

export default function Home() {
  const [text, setText] = useState('');
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);

  const createPaste = async () => {
    if (!text.trim()) {
      alert('Please enter some text');
      return;
    }

    setLoading(true);
    try {
      const API_URL = 'https://quickpaste-app-backend.onrender.com/api';

      const res = await fetch(`${API_URL}/pastes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: text }),
      });

      if (!res.ok) throw new Error('Failed to create paste');

      const data = await res.json();
      setLink(data.url);
    } catch (error) {
      console.error(error);
      alert('Error creating paste');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">Quick Paste</h1>

        <textarea
          className="home-textarea"
          placeholder="Type your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          className="create-btn"
          onClick={createPaste}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Paste'}
        </button>

        {link && (
          <div className="success-box">
            <p>✅ Paste created successfully</p>
            <a href={link} target="_blank" rel="noreferrer">
              {link}
            </a>
            <button
              className="copy-btn"
              onClick={() => navigator.clipboard.writeText(link)}
            >
              Copy Link
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
