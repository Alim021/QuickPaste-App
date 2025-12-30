import React, { useState } from 'react';

// Auto backend detect
const API_BASE_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://quickpaste-app-backend.onrender.com';

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
      const url = `${API_BASE_URL}/api/pastes`;
      console.log('🚀 Fetching from:', url);

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: text }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      setLink(data.url);
    } catch (err) {
      console.error(err);
      alert('Failed to create paste');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      padding: 20,
      maxWidth: 800,
      margin: '0 auto',
      textAlign: 'center'
    }}>
      <h1>Quick Paste</h1>

      <textarea
        rows={10}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste text here..."
        style={{
          width: '100%',
          padding: 12,
          fontSize: 16,
          borderRadius: 6,
          border: '1px solid #ccc',
          marginBottom: 15
        }}
      />

      <button
        onClick={createPaste}
        disabled={loading}
        style={{
          width: '100%',
          padding: 14,
          fontSize: 16,
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: 6,
          cursor: 'pointer'
        }}
      >
        {loading ? 'Creating...' : 'Create Paste'}
      </button>

      {link && (
        <div style={{
          marginTop: 25,
          background: '#e6fffa',
          padding: 15,
          borderRadius: 6
        }}>
          <p>✅ Paste created</p>
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            style={{ wordBreak: 'break-all' }}
          >
            {link}
          </a>

          <button
            onClick={() => {
              navigator.clipboard.writeText(link);
              alert('Link copied!');
            }}
            style={{
              display: 'block',
              width: '100%',
              marginTop: 10,
              padding: 10,
              background: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: 6
            }}
          >
            📋 Copy Link
          </button>
        </div>
      )}
    </div>
  );
}
