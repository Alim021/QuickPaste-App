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
        const res = await fetch(`http://localhost:5000/api/pastes/${id}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setContent(data.content);
      } catch {
        setError('Paste not found or has expired');
      }
    };

    fetchPaste();
  }, [id]);

  if (error) {
    return <div className="error-box">{error}</div>;
  }

  return (
    <div className="pasteview-container">
      <div className="paste-card">

        {/* 🔙 Back Button */}
        <button
          className="back-btn"
          onClick={() => navigate('/')}
        >
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
    </div>
  );
}
