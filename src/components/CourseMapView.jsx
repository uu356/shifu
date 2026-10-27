import React from 'react';

export default function CourseMapView({ lessons, completedLessonIds, onSelectLesson }) {
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

        {/* Progress Bar */}
        <div style={{ marginTop: '1.5rem', background: 'var(--bg-surface)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.88rem', fontWeight: 600 }}>
            <span>Umumiy natija: {completedCount} / {lessons.length} dars</span>
            <span style={{ color: '#38bdf8' }}>{progressPercent}% tugatildi</span>
          </div>
          <div style={{ height: '8px', background: 'var(--bg-main)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
            <div style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, #4f46e5, #06b6d4)', transition: 'width 0.4s ease' }} />
          </div>
        </div>
      </div>

      <div className="map-grid">
        {lessons.map((lesson, index) => {
          const isCompleted = completedLessonIds.includes(lesson.id);
          // A lesson is unlocked if it is lesson 1 OR previous lesson was completed
          const isUnlocked = lesson.id === 1 || completedLessonIds.includes(lesson.id - 1);
          const isCurrent = isUnlocked && !isCompleted;

          return (
            <div 
              key={lesson.id} 
              className={`lesson-card ${!isUnlocked ? 'locked' : ''}`}
            >
              <div>
                <div className="card-top">
                  <div className="card-icon">{lesson.icon}</div>
                  <span className={`card-status ${isCompleted ? 'status-completed' : isCurrent ? 'status-current' : 'status-locked'}`}>
                    {isCompleted ? '✓ Bajarildi' : isCurrent ? '⚡ Hozirgi' : '🔒 Qulflangan'}
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
                  className={isUnlocked ? "btn-primary" : "btn-primary"}
                  disabled={!isUnlocked}
                  onClick={() => onSelectLesson(lesson)}
                >
                  {isCompleted ? "Qayta ko'rish" : isUnlocked ? "Darsni boshlash →" : "Oldingi darsni yakunlang"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
