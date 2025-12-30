import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function PasteView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [views, setViews] = useState(0);

  useEffect(() => {
    const fetchPaste = async () => {
      try {
        console.log('Fetching paste ID:', id);
        
        // USE LOCAL BACKEND FOR NOW
        const res = await fetch(`http://localhost:5000/api/pastes/${id}`);
        
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || `HTTP ${res.status}`);
        }
        
        const data = await res.json();
        console.log('Paste data:', data);
        
        setContent(data.content);
        setViews(data.views || 0);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'Paste not found');
      } finally {
        setLoading(false);
      }
    };

    fetchPaste();
  }, [id]);

  
  if (loading) {
    return (
      <div style={{ padding: 50, textAlign: 'center' }}>
        <div style={{
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #3498db',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 20px'
        }}></div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        <p>Loading paste...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        padding: 50, 
        textAlign: 'center',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <div style={{ 
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h2 style={{ marginTop: 0 }}>❌ {error}</h2>
          <p>Paste ID: <code>{id}</code></p>
          <p>The paste you're looking for doesn't exist or has expired.</p>
        </div>
        
        <button 
          onClick={() => navigate('/')}
          style={{
            padding: '12px 24px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          ← Create New Paste
        </button>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '30px',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <div style={{ marginBottom: '30px' }}>
        <button 
          onClick={() => navigate('/')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          ← Back to Home
        </button>
        
        <div style={{ 
          marginTop: '15px',
          color: '#666',
          fontSize: '14px'
        }}>
          <span>Paste ID: <code>{id}</code></span>
          <span style={{ marginLeft: '20px' }}>👁️ Views: {views}</span>
        </div>
      </div>

      <h2 style={{ marginBottom: '20px' }}>Paste Content</h2>
      
      <div style={{
        backgroundColor: '#f8f9fa',
        border: '1px solid #dee2e6',
        borderRadius: '8px',
        padding: '25px',
        marginBottom: '25px',
        position: 'relative'
      }}>
        <button
          onClick={() => {
            navigator.clipboard.writeText(content);
            alert('Text copied to clipboard!');
          }}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            padding: '8px 16px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          📋 Copy Text
        </button>
        
        <pre style={{
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          fontFamily: 'monospace',
          fontSize: '15px',
          lineHeight: '1.5',
          margin: 0,
          paddingRight: '100px'
        }}>
          {content}
        </pre>
      </div>
      
      <div style={{ 
        display: 'flex', 
        gap: '10px',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => {
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `paste-${id}.txt`;
            a.click();
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: '#17a2b8',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          ⬇️ Download as .txt
        </button>
        
        <button
          onClick={() => window.print()}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ffc107',
            color: '#212529',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          🖨️ Print
        </button>
      </div>
    </div>
  );
}