import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Auto backend detect
const API_BASE_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://quickpaste-app-backend.onrender.com';

export default function PasteView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [content, setContent] = useState('');
  const [views, setViews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPaste = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/pastes/${id}`);
        if (!res.ok) throw new Error('Paste not found');

        const data = await res.json();
        setContent(data.content);
        setViews(data.views || 0);
      } catch {
        setError('Paste not found');
      } finally {
        setLoading(false);
      }
    };

    fetchPaste();
  }, [id]);

  if (loading) {
    return <p style={{ textAlign: 'center', padding: 40 }}>Loading...</p>;
  }

  if (error) {
    return (
      <div style={{ padding: 30, textAlign: 'center' }}>
        <h2>❌ {error}</h2>
        <button onClick={() => navigate('/')}>Go Home</button>
      </div>
    );
  }

  return (
    <div style={{
      padding: 20,
      maxWidth: 900,
      margin: '0 auto'
    }}>
      <button onClick={() => navigate('/')}>← Back</button>

      <div style={{ margin: '15px 0', fontSize: 14 }}>
        👁️ Views: {views} | ID: {id}
      </div>

      <div style={{
        background: '#f8f9fa',
        borderRadius: 8,
        padding: 20,
        position: 'relative'
      }}>
        <button
          onClick={() => {
            navigator.clipboard.writeText(content);
            alert('Text copied!');
          }}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            padding: '6px 12px',
            background: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: 4
          }}
        >
          📋 Copy
        </button>

        <pre style={{
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          fontFamily: 'monospace',
          fontSize: 15
        }}>
          {content}
        </pre>
      </div>
    </div>
  );
}
