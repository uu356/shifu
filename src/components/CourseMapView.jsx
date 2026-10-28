import React from 'react';

export default function CourseMapView({ 
  lessons, 
  completedLessonIds, 
  onSelectLesson, 
  unlockedAll, 
  onToggleUnlockAll 
}) {
  const completedCount = completedLessonIds.length;
  const progressPercent = Math.round((completedCount / lessons.length) * 100);

  return (
    <div>
      <div className="section-hero">
        <div className="section-tag">
          <span>🎮</span> O'yinlashtirilgan O'quv Yo'li
        </div>
        <h1 className="section-title">Python Asoslari: Noldan Amaliyotgacha</h1>
        <p className="section-subtitle">
          Har bir darsni bosqichma-bosqich yakunlang, XP ballar to'plang va amaliy topshiriqlarni brauzeringizda to'g'ridan-to'g'ri ishga tushiring.
        </p>

        {/* Action Controls & Progress Bar */}
        <div style={{
          marginTop: '1.5rem',
          background: 'var(--bg-surface)',
          padding: '1.25rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.75rem',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            <div>
              <span style={{ fontSize: '0.95rem', fontWeight: 700 }}>
                Umumiy natija: {completedCount} / {lessons.length} dars
              </span>
              <span style={{ color: '#38bdf8', marginLeft: '0.75rem', fontWeight: 700 }}>
                {progressPercent}% tugatildi
              </span>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                className="btn-secondary"
                style={{
                  fontSize: '0.8rem',
                  padding: '0.35rem 0.85rem',
                  background: unlockedAll ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.06)',
                  borderColor: unlockedAll ? '#10b981' : 'var(--border)',
                  color: unlockedAll ? '#34d399' : 'var(--text-main)',
                  fontWeight: 600
                }}
                onClick={onToggleUnlockAll}
              >
                {unlockedAll ? "🔓 Barcha darslar ochiq (Erkin rejim)" : "🔒 Qulfsiz rejimga o'tish"}
              </button>
            </div>
          </div>

          <div style={{ height: '10px', background: 'var(--bg-main)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
            <div style={{
              width: `${progressPercent}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #4f46e5, #06b6d4)',
              transition: 'width 0.4s ease'
            }} />
          </div>
        </div>
      </div>

      <div className="map-grid">
        {lessons.map((lesson) => {
          const isCompleted = completedLessonIds.includes(lesson.id);
          // A lesson is accessible if unlockedAll is true, or lesson 1, or previous completed
          const isNaturallyUnlocked = lesson.id === 1 || completedLessonIds.includes(lesson.id - 1);
          const isUnlocked = unlockedAll || isNaturallyUnlocked;
          const isCurrent = isUnlocked && !isCompleted;

          return (
            <div 
              key={lesson.id} 
              className={`lesson-card ${isCompleted ? 'completed-card' : ''}`}
              style={{
                border: isCurrent ? '1px solid rgba(99, 102, 241, 0.8)' : isCompleted ? '1px solid rgba(16, 185, 129, 0.5)' : '1px solid var(--border)',
                background: isCompleted ? 'rgba(16, 185, 129, 0.04)' : 'var(--bg-surface)'
              }}
            >
              <div>
                <div className="card-top">
                  <div className="card-icon">{lesson.icon}</div>
                  <span className={`card-status ${isCompleted ? 'status-completed' : isCurrent ? 'status-current' : 'status-locked'}`}>
                    {isCompleted ? '✓ Bajarildi' : isCurrent ? '⚡ Hozirgi' : '📖 Ochiq'}
                  </span>
                </div>

                <h3 className="lesson-name">{lesson.title}</h3>
                <p className="lesson-desc">{lesson.summary}</p>
              </div>

              <div>
                <div className="card-meta">
                  <span>⚡ +{lesson.xp} XP</span>
                  <span>⏱️ ~{lesson.estimatedMinutes} daqiqa</span>
                </div>

                <button 
                  className="btn-primary"
                  style={{
                    background: isCompleted 
                      ? 'linear-gradient(135deg, #059669, #10b981)' 
                      : isCurrent
                      ? 'linear-gradient(135deg, #4f46e5, #6366f1)'
                      : 'linear-gradient(135deg, #334155, #475569)'
                  }}
                  onClick={() => onSelectLesson(lesson)}
                >
                  {isCompleted ? "Qayta ko'rish" : isCurrent ? "Darsni boshlash →" : "Darsga o'tish →"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
