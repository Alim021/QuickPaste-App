import React, { useState } from 'react';

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
      // USE LOCAL BACKEND FOR NOW
      const url = 'http://localhost:5000/api/pastes';
      console.log('🚀 Fetching from:', url);
      
      const res = await fetch(url, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ content: text }),
      });

      console.log('📡 Response status:', res.status);
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errorText}`);
      }

      const data = await res.json();
      console.log('✅ Success:', data);
      setLink(data.url);
    } catch (error) {
      console.error('❌ Error:', error);
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 50, textAlign: 'center' }}>
      <h1>Create Paste</h1>
      
      <textarea
        rows={10}
        cols={50}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your text here..."
        style={{ margin: '20px 0', padding: 10, fontSize: 16 }}
      />
      <br />
      
      <button 
        onClick={createPaste} 
        disabled={loading}
        style={{ 
          padding: '12px 24px', 
          fontSize: 16,
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: 5,
          cursor: 'pointer'
        }}
      >
        {loading ? 'Creating...' : 'Create Paste'}
      </button>

      {link && (
        <div style={{ 
          marginTop: 30, 
          padding: 20, 
          background: '#d4edda', 
          borderRadius: 5 
        }}>
          <p style={{ color: '#155724', fontWeight: 'bold' }}>
            ✅ Paste created successfully
          </p>
          <a 
            href={link} 
            target="_blank" 
            rel="noreferrer"
            style={{ color: '#0056b3', wordBreak: 'break-all' }}
          >
            {link}
          </a>
          <br />
          <button 
            onClick={() => {
              navigator.clipboard.writeText(link);
              alert('Link copied!');
            }}
            style={{ 
              marginTop: 10,
              padding: '8px 16px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: 5,
              cursor: 'pointer'
            }}
          >
            📋 Copy Link
          </button>
        </div>
      )}
    </div>
  );
}