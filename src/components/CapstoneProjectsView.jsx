import React, { useState } from 'react';
import { CAPSTONE_PROJECTS } from '../data/capstoneProjectsData';
import AITeacherPanel from './AITeacherPanel';
import { usePyodide } from '../contexts/PyodideContext';

export default function CapstoneProjectsView() {
  const [selectedLevel, setSelectedLevel] = useState(1);
  const currentProject = CAPSTONE_PROJECTS.find(p => p.level === selectedLevel) || CAPSTONE_PROJECTS[0];

  const [code, setCode] = useState(currentProject.flow.independentWork);
  const [output, setOutput] = useState("");
  const [error, setError] = useState(null);

  const { runCode, isRunning, isLoading } = usePyodide();

  const handleSelectLevel = (lvl) => {
    setSelectedLevel(lvl);
    const p = CAPSTONE_PROJECTS.find(item => item.level === lvl) || CAPSTONE_PROJECTS[0];
    setCode(p.flow.independentWork);
    setOutput("");
    setError(null);
  };

  const handleRun = async () => {
    setOutput("⏳ Loyiha kodi bajarilmoqda...");
    setError(null);
    const res = await runCode(code);
    setOutput(res.output || "");
    if (res.error) setError(res.error);
  };

  const flow = currentProject.flow;

  return (
    <div>
      <div className="section-hero">
        <div className="section-tag"><span>🏆</span> Darajali Katta Loyihalar</div>
        <h1 className="section-title">Capstone Projects: Real Dasturlar Yarating</h1>
        <p className="section-subtitle">
          Katta loyihalar — shunchaki mashq emas, bilimlarni yaxlit dasturga jamlash vositasi.
          Har bir daraja uchun 12 bosqichli qat'iy o'quv oqimi va AI murabbiy bilan ishlang.
        </p>
      </div>

      {/* Level Tabs */}
      <div className="levels-bar">
        {CAPSTONE_PROJECTS.map((p) => (
          <button
            key={p.id}
            className={`level-tab ${p.level === selectedLevel ? 'active' : ''}`}
            onClick={() => handleSelectLevel(p.level)}
          >
            {p.level}-daraja: {p.badge}
          </button>
        ))}
      </div>

      {/* Project Header */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '1.75rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.75rem' }}>
          <div>
            <span className="brand-badge" style={{ background: 'rgba(6,182,212,0.2)', color: '#38bdf8', borderColor: 'rgba(6,182,212,0.4)' }}>
              {currentProject.levelName}
            </span>
            <h2 style={{ fontSize: '1.7rem', fontWeight: 800, marginTop: '0.5rem' }}>{currentProject.title}</h2>
          </div>
          <div className="stat-pill xp">🏅 {currentProject.badge}</div>
        </div>
        <p style={{ color: '#cbd5e1', lineHeight: 1.65 }}>{currentProject.summary}</p>
      </div>

      {/* 12-Stage Workflow Cards */}
      <div className="project-workflow">
        <div className="workflow-card">
          <h4>🎯 1. Maqsad</h4>
          <p style={{ fontSize: '0.88rem', color: '#cbd5e1' }}>{flow.goal}</p>
        </div>
        <div className="workflow-card">
          <h4>🔑 2. Old Shartlar</h4>
          <ul className="workflow-list">{flow.prerequisites.map((item, i) => <li key={i}>{item}</li>)}</ul>
        </div>
        <div className="workflow-card">
          <h4>📋 3. Talablar</h4>
          <ul className="workflow-list">{flow.requirements.map((item, i) => <li key={i}>{item}</li>)}</ul>
        </div>
        <div className="workflow-card">
          <h4>🪜 4. Bosqichlar</h4>
          <ul className="workflow-list">{flow.steps.map((item, i) => <li key={i}>{item}</li>)}</ul>
        </div>
        <div className="workflow-card">
          <h4>✅ 5. Qabul Mezonlari</h4>
          <ul className="workflow-list">{flow.acceptanceCriteria.map((item, i) => <li key={i}>{item}</li>)}</ul>
        </div>
        <div className="workflow-card">
          <h4>🧪 7. Test Holatlari</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {flow.testCases.map((tc, i) => (
              <div key={i} style={{ background: 'var(--bg-editor)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem' }}>
                <strong style={{ color: '#38bdf8' }}>{tc.type}:</strong> {tc.input} → {tc.expected}
              </div>
            ))}
          </div>
        </div>
        <div className="workflow-card">
          <h4>🔍 9 & 10. Kod Review & Refactor</h4>
          <p style={{ fontSize: '0.88rem', color: '#cbd5e1' }}><strong>Review:</strong> {flow.codeReview}</p>
          <p style={{ fontSize: '0.88rem', color: '#fbbf24', marginTop: '0.5rem' }}><strong>Refactor:</strong> {flow.refactorPhase}</p>
        </div>
        <div className="workflow-card">
          <h4>🎤 11 & 12. Taqdimot & Kengaytma</h4>
          <p style={{ fontSize: '0.88rem', color: '#cbd5e1' }}><strong>Taqdimot:</strong> {flow.presentation}</p>
          <p style={{ fontSize: '0.88rem', color: '#a5b4fc', marginTop: '0.5rem' }}><strong>Kengaytma:</strong> {flow.extension}</p>
        </div>
      </div>

      {/* Coding Studio + AI Teacher */}
      <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: '#818cf8' }}>
            🤖 8. AI Murabbiy Maslahatlari
          </h3>
          <AITeacherPanel
            currentTopic={`Katta Loyiha: ${currentProject.title} (Daraja ${currentProject.level})`}
            userCode={code}
            userError={error}
          />
        </div>

        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: '#34d399' }}>
            💻 6. Mustaqil Ish: Loyihani Yozing
          </h3>
          <div className="editor-card" style={{ height: '340px' }}>
            <div className="editor-header">
              <span className="editor-title">🐍 project_level_{currentProject.level}.py</span>
              <button
                className="btn-secondary"
                style={{ padding: '0.2rem 0.6rem', fontSize: '0.78rem' }}
                onClick={() => { setCode(currentProject.flow.independentWork); setOutput(""); setError(null); }}
              >
                Boshlang'ich
              </button>
            </div>
            <textarea
              className="code-area"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck="false"
              autoCapitalize="none"
            />
            <div className="editor-footer">
              <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>Ctrl+Enter — tez ishga tushirish</span>
              <button
                className="btn-primary"
                style={{ width: 'auto', padding: '0.65rem 1.5rem' }}
                onClick={handleRun}
                disabled={isRunning || isLoading}
              >
                {isRunning ? "⏳ Bajarilmoqda..." : "▶ Loyihani sinash"}
              </button>
            </div>
          </div>

          <div className="terminal-card" style={{ height: '160px', marginTop: '1rem' }}>
            <div className="terminal-header">
              <div className="terminal-dots">
                <div className="dot red" /><div className="dot yellow" /><div className="dot green" />
              </div>
              <span>Loyiha Terminal</span>
            </div>
            <div className="terminal-body">
              {output && !output.startsWith("⏳") && (
                <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'var(--font-mono)', color: '#34d399' }}>{output}</pre>
              )}
              {output.startsWith("⏳") && <div style={{ color: '#fbbf24', fontStyle: 'italic' }}>{output}</div>}
              {error && <div className="terminal-error" style={{ whiteSpace: 'pre-wrap' }}>{error}</div>}
              {!output && !error && (
                <div style={{ color: 'var(--text-dim)', fontStyle: 'italic' }}>
                  Loyiha kodingiz natijasi bu yerda ko'rinadi...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
