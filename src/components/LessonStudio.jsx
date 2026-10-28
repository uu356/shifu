import React, { useState, useEffect, useCallback, useRef } from 'react';
import AITeacherPanel from './AITeacherPanel';
import { usePyodide } from '../contexts/PyodideContext';

export default function LessonStudio({ 
  lesson, 
  lessons = [], 
  onCompleteLesson, 
  onBack,
  onNextLesson,
  onPrevLesson
}) {
  const { runCode, isLoading: isPyodideLoading, loadingMessage, isRunning } = usePyodide();

  const [exerciseMode, setExerciseMode] = useState("guided");

  const currentIndex = lessons.findIndex(l => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex >= 0 && currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

  const getStarterCode = (mode) => {
    if (mode === "guided" && lesson.content?.stepByStepExercise?.starterCode) {
      return lesson.content.stepByStepExercise.starterCode;
    }
    if (mode === "independent" && lesson.content?.independentTask?.starterCode) {
      return lesson.content.independentTask.starterCode;
    }
    return lesson.content?.starterCode || `# ${lesson.title}\nprint("Salom, Dunyo!")`;
  };

  const [code, setCode] = useState(() => getStarterCode("guided"));
  const [output, setOutput] = useState("");
  const [error, setError] = useState(null);
  const [validationSuccess, setValidationSuccess] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [alreadyCompletedThisSession, setAlreadyCompletedThisSession] = useState(false);

  useEffect(() => {
    setCode(getStarterCode(exerciseMode));
    setOutput("");
    setError(null);
    setValidationSuccess(false);
    setValidationMessage("");
    setAlreadyCompletedThisSession(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson, exerciseMode]);

  const handleRunRef = useRef(null);

  // Ctrl+Enter shortcut to run code — uses ref to avoid stale closure
  const handleKeyDown = useCallback((e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (handleRunRef.current) handleRunRef.current();
    }
  }, []);

  // Keep ref in sync so handleKeyDown always calls latest handleRun
  useEffect(() => {
    handleRunRef.current = handleRun;
  });

  const handleRun = async () => {
    if (isRunning) return;
    setOutput("⏳ Kod bajarilmoqda...");
    setError(null);
    setValidationSuccess(false);
    setValidationMessage("");

    const result = await runCode(code);
    setOutput(result.output || "");

    if (result.error) {
      setError(result.error);
      return;
    }

    // --- Auto-validation ---
    if (exerciseMode === "guided" && lesson.content?.stepByStepExercise?.validator) {
      const isValid = lesson.content.stepByStepExercise.validator(result.output);
      if (isValid) {
        setValidationSuccess(true);
        setValidationMessage("✅ Barakalla! Bosqichma-bosqich mashq bajarildi. Endi mustaqil topshiriqni bajaring yoki to'g'ridan-to'g'ri keyingi darsga o'ting!");
        if (!alreadyCompletedThisSession) {
          setAlreadyCompletedThisSession(true);
          onCompleteLesson(lesson.id, Math.round(lesson.xp / 2));
        }
      } else {
        if (!result.output || !result.output.trim()) {
          setValidationMessage("ℹ️ Kodingiz hali hech qanday natija bermadi. Chap tarafdagi yo'riqnoma va maslahatga qarab kodni yozing.");
        } else {
          setValidationMessage("ℹ️ Natija kutilgancha emas. Chap tarafdagi yo'riqnomani qayta o'qib, kodingizni tekshiring.");
        }
      }
    } else if (exerciseMode === "independent" && lesson.content?.independentTask?.validator) {
      const isValid = lesson.content.independentTask.validator(code, result.output);
      if (isValid) {
        setValidationSuccess(true);
        setValidationMessage(`🎉 Ajoyib! Dars to'liq muvaffaqiyatli yakunlandi. +${lesson.xp} XP hisobingizga qo'shildi!`);
        if (!alreadyCompletedThisSession) {
          setAlreadyCompletedThisSession(true);
          onCompleteLesson(lesson.id, lesson.xp);
        }
      } else {
        const hints = lesson.content.independentTask.errorHelp || [];
        const hintText = hints.length > 0 ? "\n\n💡 Maslahatlar:\n" + hints.join("\n") : "";
        setValidationMessage(`ℹ️ Topshiriq mezonlari to'liq bajarilmadi.${hintText}`);
      }
    } else {
      // Generic: any successful output counts
      if (result.output && !result.error) {
        setValidationSuccess(true);
        setValidationMessage(`✅ Dastur muvaffaqiyatli ishladi! +${lesson.xp} XP`);
        if (!alreadyCompletedThisSession) {
          setAlreadyCompletedThisSession(true);
          onCompleteLesson(lesson.id, lesson.xp);
        }
      }
    }
  };

  const initialCode = getStarterCode(exerciseMode);

  return (
    <div>
      {/* Top Bar with Navigation */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.25rem',
        flexWrap: 'wrap',
        gap: '0.75rem',
        background: 'var(--bg-surface)',
        padding: '0.75rem 1.25rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          <button className="btn-secondary" onClick={onBack} title="O'quv xaritasiga qaytish">
            ← O'quv xaritasi
          </button>
          
          {prevLesson && (
            <button 
              className="btn-secondary" 
              onClick={() => onPrevLesson && onPrevLesson(prevLesson)}
              title={`${prevLesson.title} darsiga o'tish`}
            >
              ◀ {prevLesson.id}-dars
            </button>
          )}

          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', padding: '0 0.3rem' }}>
            Dars {lesson.id} / {lessons.length || 12}
          </span>

          {nextLesson && (
            <button 
              className="btn-primary" 
              style={{ padding: '0.45rem 1rem', fontSize: '0.82rem', width: 'auto' }}
              onClick={() => onNextLesson && onNextLesson(nextLesson)}
              title={`${nextLesson.title} darsiga o'tish`}
            >
              Keyingi dars ({nextLesson.id}-dars) ▶
            </button>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{
            fontSize: '0.82rem',
            color: isPyodideLoading ? '#fbbf24' : '#34d399',
            fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem'
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: isPyodideLoading ? '#fbbf24' : '#34d399', display: 'inline-block' }} />
            {isPyodideLoading ? loadingMessage : "Python 3.12 Tayyor"}
          </span>
          <span className="brand-badge">+{lesson.xp} XP</span>
        </div>
      </div>

      <div className="studio-layout">
        {/* LEFT: Theory */}
        <div className="theory-panel">
          <div>
            <div className="section-tag">{lesson.icon} {lesson.id}-dars</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.4rem' }}>{lesson.title}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{lesson.summary}</p>
          </div>

          <div className="theory-block">
            <h3>🎯 Dars maqsadi</h3>
            <p>{lesson.content?.goal}</p>
          </div>

          <div className="theory-block">
            <h3>📖 Tushuntirish</h3>
            <div style={{ whiteSpace: 'pre-line', fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.75' }}>
              {lesson.content?.explanation}
            </div>
          </div>

          {lesson.content?.workingExample && (
            <div className="theory-block">
              <h3>💡 Ishlaydigan misol</h3>
              <p style={{ fontSize: '0.85rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                Kuzating va tahlil qiling:
              </p>
              <pre className="code-snippet">{lesson.content.workingExample}</pre>
            </div>
          )}

          {/* Mode Selector */}
          <div className="theory-block" style={{ border: '1px solid rgba(99, 102, 241, 0.5)' }}>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.85rem' }}>
              <button
                className={`step-btn ${exerciseMode === 'guided' ? 'active' : ''}`}
                onClick={() => setExerciseMode("guided")}
              >
                📋 Bosqichma-bosqich mashq
              </button>
              {lesson.content?.independentTask && (
                <button
                  className={`step-btn ${exerciseMode === 'independent' ? 'active' : ''}`}
                  onClick={() => setExerciseMode("independent")}
                >
                  🚀 Mustaqil topshiriq
                </button>
              )}
            </div>

            {exerciseMode === "guided" && lesson.content?.stepByStepExercise && (
              <div>
                <h4 style={{ color: '#38bdf8', marginBottom: '0.4rem', fontSize: '0.9rem' }}>Yo'riqnoma:</h4>
                <p style={{ fontSize: '0.88rem', lineHeight: 1.6 }}>{lesson.content.stepByStepExercise.instruction}</p>
                {lesson.content.stepByStepExercise.hint && (
                  <p style={{ fontSize: '0.8rem', color: '#a5b4fc', fontStyle: 'italic', marginTop: '0.5rem' }}>
                    💡 {lesson.content.stepByStepExercise.hint}
                  </p>
                )}
              </div>
            )}

            {exerciseMode === "independent" && lesson.content?.independentTask && (
              <div>
                <h4 style={{ color: '#fbbf24', marginBottom: '0.4rem', fontSize: '0.9rem' }}>
                  {lesson.content.independentTask.title}
                </h4>
                <p style={{ fontSize: '0.88rem', whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                  {lesson.content.independentTask.instruction}
                </p>
                {lesson.content.independentTask.criteria && (
                  <div style={{ marginTop: '0.75rem' }}>
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600, marginBottom: '0.25rem' }}>Tekshirish mezonlari:</p>
                    <ul style={{ paddingLeft: '1.1rem', fontSize: '0.8rem', color: '#94a3b8' }}>
                      {lesson.content.independentTask.criteria.map((c, i) => <li key={i}>{c}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          <AITeacherPanel
            currentTopic={lesson.title}
            userCode={code}
            userError={error}
          />
        </div>

        {/* RIGHT: Editor + Terminal */}
        <div className="workspace-panel">
          <div className="editor-card">
            <div className="editor-header">
              <span className="editor-title">🐍 main.py</span>
              <button
                className="btn-secondary"
                style={{ padding: '0.3rem 0.75rem', fontSize: '0.78rem' }}
                onClick={() => { setCode(initialCode); setOutput(""); setError(null); setValidationMessage(""); }}
              >
                Kodni tiklash
              </button>
            </div>

            <textarea
              className="code-area"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="# Python kodingizni bu yerga yozing..."
              spellCheck="false"
              autoCapitalize="none"
            />

            <div className="editor-footer">
              <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                Ctrl + Enter — tez ishga tushirish
              </span>
              <button
                className="btn-primary"
                style={{ width: 'auto', padding: '0.65rem 1.75rem' }}
                onClick={handleRun}
                disabled={isRunning || isPyodideLoading}
              >
                {isRunning ? "⏳ Bajarilmoqda..." : "▶ Kodni ishga tushirish"}
              </button>
            </div>
          </div>

          {/* Terminal */}
          <div className="terminal-card">
            <div className="terminal-header">
              <div className="terminal-dots">
                <div className="dot red" /> <div className="dot yellow" /> <div className="dot green" />
              </div>
              <span>Terminal — Chiqish Oynasi</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Python 3.12</span>
            </div>
            <div className="terminal-body">
              {output && !output.startsWith("⏳") && (
                <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'var(--font-mono)', color: '#34d399' }}>{output}</pre>
              )}
              {output.startsWith("⏳") && (
                <div style={{ color: '#fbbf24', fontStyle: 'italic' }}>{output}</div>
              )}
              {error && (
                <div className="terminal-error">
                  <strong>⚠️ Xatolik:</strong>
                  <div style={{ marginTop: '0.35rem', whiteSpace: 'pre-wrap' }}>{error}</div>
                </div>
              )}

              {/* Validation Card & Action Buttons */}
              {validationMessage && (
                <div style={{
                  marginTop: '0.75rem', padding: '1rem', borderRadius: 'var(--radius-sm)',
                  background: validationSuccess ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.1)',
                  border: `1px solid ${validationSuccess ? '#10b981' : '#f59e0b'}`,
                  color: validationSuccess ? '#34d399' : '#fbbf24',
                  fontWeight: 600, fontSize: '0.88rem'
                }}>
                  <div style={{ whiteSpace: 'pre-line', marginBottom: validationSuccess ? '0.75rem' : 0 }}>
                    {validationMessage}
                  </div>

                  {validationSuccess && (
                    <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                      {exerciseMode === "guided" && lesson.content?.independentTask && (
                        <button
                          className="btn-secondary"
                          style={{
                            background: 'rgba(245, 158, 11, 0.2)',
                            borderColor: '#f59e0b',
                            color: '#fbbf24',
                            fontWeight: 700,
                            padding: '0.45rem 1rem'
                          }}
                          onClick={() => setExerciseMode("independent")}
                        >
                          🚀 Mustaqil topshiriqqa o'tish
                        </button>
                      )}

                      {nextLesson && (
                        <button
                          className="btn-primary"
                          style={{
                            width: 'auto',
                            padding: '0.45rem 1.25rem',
                            background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                            fontWeight: 700
                          }}
                          onClick={() => onNextLesson && onNextLesson(nextLesson)}
                        >
                          ➔ Keyingi dars ({nextLesson.id}-dars: {nextLesson.title})
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}

              {!output && !error && !validationMessage && (
                <div style={{ color: 'var(--text-dim)', fontStyle: 'italic' }}>
                  Kodni ishga tushirsangiz, natija bu yerda ko'rinadi...
                </div>
              )}
            </div>
          </div>

          {/* Quick Bottom Nav Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '1rem',
            padding: '0.75rem',
            background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}>
            <div>
              {prevLesson ? (
                <button
                  className="btn-secondary"
                  onClick={() => onPrevLesson && onPrevLesson(prevLesson)}
                >
                  ◀ {prevLesson.title}
                </button>
              ) : (
                <button className="btn-secondary" onClick={onBack}>
                  ← O'quv xaritasi
                </button>
              )}
            </div>

            <div>
              {nextLesson ? (
                <button
                  className="btn-primary"
                  style={{ width: 'auto', padding: '0.5rem 1.5rem', background: 'linear-gradient(135deg, #4f46e5, #06b6d4)' }}
                  onClick={() => onNextLesson && onNextLesson(nextLesson)}
                >
                  Keyingi dars: {nextLesson.title} ➔
                </button>
              ) : (
                <button
                  className="btn-primary"
                  style={{ width: 'auto', padding: '0.5rem 1.5rem', background: 'linear-gradient(135deg, #059669, #10b981)' }}
                  onClick={onBack}
                >
                  🏆 Kurs yakunlandi! Xaritaga qaytish ➔
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
