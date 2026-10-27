import React, { useState } from 'react';
import { CS50P_TOPICS, CS50P_OFFICIAL_URL, CS50P_DISCLAIMER } from '../data/cs50pData';
import AITeacherPanel from './AITeacherPanel';
import { usePyodide } from '../contexts/PyodideContext';

export default function HarvardCS50PView() {
  const [selectedTopic, setSelectedTopic] = useState(CS50P_TOPICS[0]);
  const [practiceCode, setPracticeCode] = useState(CS50P_TOPICS[0].similarPractice.starterCode);
  const [output, setOutput] = useState("");
  const [error, setError] = useState(null);

  const { runCode, isRunning, isLoading, loadingMessage } = usePyodide();

  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
    setPracticeCode(topic.similarPractice.starterCode);
    setOutput("");
    setError(null);
  };

  const handleRunPractice = async () => {
    setOutput("⏳ Mashq kodi bajarilmoqda...");
    setError(null);
    const res = await runCode(practiceCode);
    setOutput(res.output || "");
    if (res.error) setError(res.error);
  };

  return (
    <div>
      {/* Disclaimer Banner */}
      <div className="cs50-banner">
        <div>
          <span className="cs50-badge">Mustaqil Ta'limiy Ko'prik</span>
          <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: 'white', margin: '0.5rem 0' }}>
            Harvard CS50P Kursini O'zbek Tilida O'rganish
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '0.92rem', maxWidth: '700px', lineHeight: 1.6 }}>
            Harvard Universitetining "CS50's Introduction to Programming with Python" kursida o'qiyapsizmi?
            Mavzuni tanlang va uning mohiyatini AI Ustoz yordamida o'zbek tilida tushunib oling.
          </p>
          <p className="cs50-disclaimer">{CS50P_DISCLAIMER}</p>
        </div>
        <a
          href={CS50P_OFFICIAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{
            whiteSpace: 'nowrap',
            background: 'linear-gradient(135deg, #a51c30, #c41e3a)',
            padding: '0.85rem 1.5rem',
            textDecoration: 'none',
            flexShrink: 0
          }}
        >
          ↗ Rasmiy CS50P Sahifasi
        </a>
      </div>

      {/* Python Status */}
      <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{
          width: 8, height: 8, borderRadius: '50%',
          background: isLoading ? '#fbbf24' : '#34d399',
          display: 'inline-block', flexShrink: 0
        }} />
        <span style={{ fontSize: '0.82rem', color: isLoading ? '#fbbf24' : '#34d399', fontWeight: 600 }}>
          {isLoading ? loadingMessage : "Python 3.12 Tayyor"}
        </span>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '1.5rem' }}>

        {/* Left: Topics List */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', height: 'fit-content' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem', color: '#93c5fd' }}>
            📚 CS50P Mavzular Ro'yxati
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {CS50P_TOPICS.map((topic) => {
              const isSel = selectedTopic.id === topic.id;
              return (
                <button
                  key={topic.id}
                  onClick={() => handleSelectTopic(topic)}
                  style={{
                    textAlign: 'left', padding: '0.7rem 0.9rem',
                    borderRadius: 'var(--radius-md)', cursor: 'pointer',
                    background: isSel ? 'rgba(79,70,229,0.25)' : 'transparent',
                    border: `1px solid ${isSel ? '#6366f1' : 'transparent'}`,
                    color: isSel ? '#ffffff' : 'var(--text-muted)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ fontSize: '0.7rem', color: isSel ? '#a5b4fc' : '#64748b', fontWeight: 600 }}>
                    {topic.cs50Week}
                  </div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>{topic.title}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Topic Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          {/* Topic Overview */}
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
            <span className="brand-badge">{selectedTopic.cs50Week}</span>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '0.5rem', marginBottom: '0.5rem' }}>
              {selectedTopic.title}
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.65, marginBottom: '1rem' }}>
              {selectedTopic.description}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {selectedTopic.concepts.map((c, i) => (
                <span key={i} style={{
                  background: 'var(--bg-editor)', border: '1px solid var(--border)',
                  padding: '2px 8px', borderRadius: 'var(--radius-sm)',
                  fontSize: '0.73rem', fontFamily: 'var(--font-mono)', color: '#38bdf8'
                }}>{c}</span>
              ))}
            </div>
          </div>

          {/* AI Teacher */}
          <AITeacherPanel
            currentTopic={`Harvard CS50P: ${selectedTopic.title} (${selectedTopic.cs50Week})`}
            userCode={practiceCode}
            userError={error}
          />

          {/* Practice Editor */}
          <div className="editor-card">
            <div className="editor-header">
              <span className="editor-title">🎯 O'xshash mashq: {selectedTopic.similarPractice.title}</span>
              <button
                className="btn-secondary"
                style={{ padding: '0.25rem 0.65rem', fontSize: '0.78rem' }}
                onClick={() => { setPracticeCode(selectedTopic.similarPractice.starterCode); setOutput(""); setError(null); }}
              >
                Kodni tiklash
              </button>
            </div>
            <div style={{ padding: '0.75rem 1.25rem', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border)', fontSize: '0.86rem', color: '#94a3b8' }}>
              <strong>Vazifa:</strong> {selectedTopic.similarPractice.task}
            </div>
            <textarea
              className="code-area"
              style={{ minHeight: '150px' }}
              value={practiceCode}
              onChange={(e) => setPracticeCode(e.target.value)}
              spellCheck="false"
              autoCapitalize="none"
            />
            <div className="editor-footer">
              <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                Harvard topshirig'ini emas — shunga o'xshash yangi mashqni bajaring.
              </span>
              <button
                className="btn-primary"
                style={{ width: 'auto', padding: '0.65rem 1.5rem' }}
                onClick={handleRunPractice}
                disabled={isRunning || isLoading}
              >
                {isRunning ? "⏳ Bajarilmoqda..." : "▶ Mashqni ishga tushirish"}
              </button>
            </div>
          </div>

          {/* Terminal */}
          <div className="terminal-card" style={{ height: '170px' }}>
            <div className="terminal-header">
              <div className="terminal-dots">
                <div className="dot red" /><div className="dot yellow" /><div className="dot green" />
              </div>
              <span>Mashq Natijasi</span>
            </div>
            <div className="terminal-body">
              {output && !output.startsWith("⏳") && (
                <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'var(--font-mono)', color: '#34d399' }}>{output}</pre>
              )}
              {output.startsWith("⏳") && <div style={{ color: '#fbbf24', fontStyle: 'italic' }}>{output}</div>}
              {error && <div className="terminal-error" style={{ whiteSpace: 'pre-wrap' }}>{error}</div>}
              {!output && !error && (
                <div style={{ color: 'var(--text-dim)', fontStyle: 'italic' }}>
                  Mashq kodini ishga tushiring...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
