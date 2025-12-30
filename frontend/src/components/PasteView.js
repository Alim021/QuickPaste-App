import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PasteView.css';

export default function PasteView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState('Loading...');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPaste = async () => {
      try {
        const API_URL = 'https://quickpaste-app-backend.onrender.com/api';

        const res = await fetch(`${API_URL}/pastes/${id}`);
        if (!res.ok) throw new Error('Paste not found');

        const data = await res.json();
        setContent(data.content);
      } catch (err) {
        setError('Paste not found or has expired');
      }
    };

    fetchPaste();
  }, [id]);

  if (error) {
    return (
      <div className="error-box">
        <h2>Error: {error}</h2>
        <button className="back-btn" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="paste-container">
      <button className="back-btn" onClick={() => navigate('/')}>
        ← Back to Home
      </button>

      <h2 className="paste-title">Paste Content</h2>

      <pre className="paste-content">
        {content}
      </pre>

      <button
        className="copy-btn"
        onClick={() => navigator.clipboard.writeText(content)}
      >
        Copy Text
      </button>
    </div>
  );
}
