import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CourseMapView from './components/CourseMapView';
import LessonStudio from './components/LessonStudio';
import HarvardCS50PView from './components/HarvardCS50PView';
import CapstoneProjectsView from './components/CapstoneProjectsView';
import { PyodideProvider } from './contexts/PyodideContext';
import { LESSONS } from './data/lessonsData';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'shifu_python_user_progress_v2';

function calcStreak(lastVisitISO) {
  if (!lastVisitISO) return 1;
  const last = new Date(lastVisitISO);
  const today = new Date();
  const diffMs = today.setHours(0, 0, 0, 0) - last.setHours(0, 0, 0, 0);
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  return diffDays; // 0 = same day, 1 = consecutive, >1 = broken
}

const DEFAULT_STATS = {
  xp: 0,
  level: 1,
  streak: 1,
  lastVisitDate: new Date().toISOString().split('T')[0],
  completedLessonIds: [],
  badges: ['🐣 Yangi Boshlovchi']
};

export default function App() {
  const [activeTab, setActiveTab] = useState('course');
  const [activeLesson, setActiveLesson] = useState(null);

  const [userStats, setUserStats] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Update streak on load
        const today = new Date().toISOString().split('T')[0];
        const lastVisit = parsed.lastVisitDate;
        let newStreak = parsed.streak;

        if (lastVisit !== today) {
          const diffDays = calcStreak(lastVisit);
          if (diffDays === 1) {
            // Consecutive day → streak up
            newStreak = (parsed.streak || 1) + 1;
          } else if (diffDays > 1) {
            // Gap → streak reset
            newStreak = 1;
          }
        }
        return { ...parsed, streak: newStreak, lastVisitDate: today };
      }
    } catch { /* ignore */ }
    return { ...DEFAULT_STATS, lastVisitDate: new Date().toISOString().split('T')[0] };
  });

  // Persist to localStorage on every stats change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userStats));
    } catch { /* ignore */ }
  }, [userStats]);

  // Also save active lesson so page-refresh restores it
  useEffect(() => {
    try {
      if (activeLesson) {
        localStorage.setItem('shifu_active_lesson', JSON.stringify({ tab: activeTab, lessonId: activeLesson.id }));
      } else {
        localStorage.removeItem('shifu_active_lesson');
      }
    } catch { /* ignore */ }
  }, [activeLesson, activeTab]);

  // Restore active lesson from localStorage on first load
  useEffect(() => {
    try {
      const saved = localStorage.getItem('shifu_active_lesson');
      if (saved) {
        const { tab, lessonId } = JSON.parse(saved);
        const lesson = LESSONS.find(l => l.id === lessonId);
        if (lesson) {
          setActiveTab(tab || 'course');
          setActiveLesson(lesson);
        }
      }
    } catch { /* ignore */ }
  }, []);

  const handleCompleteLesson = (lessonId, xpEarned) => {
    setUserStats(prev => {
      const alreadyDone = prev.completedLessonIds.includes(lessonId);
      if (alreadyDone) return prev;

      const newCompleted = [...prev.completedLessonIds, lessonId];
      const newXp = prev.xp + xpEarned;
      const newLevel = Math.max(prev.level, Math.floor(newXp / 100) + 1);

      // Badge awards
      const newBadges = [...prev.badges];
      if (newLevel > prev.level && !newBadges.some(b => b.includes(`Daraja ${newLevel}`))) {
        newBadges.push(`⭐ Daraja ${newLevel} erishildi!`);
      }
      if (newCompleted.length === 1) newBadges.push('🌱 Birinchi dars!');
      if (newCompleted.length === 6) newBadges.push('🔥 Yarim yo\'l!');
      if (newCompleted.length === 12) newBadges.push('🏆 Kurs yakunlandi!');

      return { ...prev, xp: newXp, level: newLevel, completedLessonIds: newCompleted, badges: newBadges };
    });

    // Confetti celebration
    try {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    } catch { /* ignore */ }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setActiveLesson(null);
  };

  return (
    <PyodideProvider>
      <div className="app-container">
        <Navbar activeTab={activeTab} setActiveTab={handleTabChange} userStats={userStats} />

        <main className="main-content">
          {activeTab === 'course' && !activeLesson && (
            <CourseMapView
              lessons={LESSONS}
              completedLessonIds={userStats.completedLessonIds}
              onSelectLesson={setActiveLesson}
            />
          )}
          {activeTab === 'course' && activeLesson && (
            <LessonStudio
              lesson={activeLesson}
              onCompleteLesson={handleCompleteLesson}
              onBack={() => setActiveLesson(null)}
            />
          )}
          {activeTab === 'cs50p' && <HarvardCS50PView />}
          {activeTab === 'projects' && <CapstoneProjectsView />}
        </main>

        <footer style={{
          borderTop: '1px solid var(--border)', padding: '1.25rem 2rem',
          textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-dim)'
        }}>
          <p>Shifu Python — O'zbek tilidagi interaktiv, o'yin elementlariga ega Python ta'lim platformasi.</p>
          <p style={{ marginTop: '0.2rem' }}>Harvard CS50P mustaqil ta'limiy ko'prigi. Harvard University bilan rasmiy aloqa yo'q.</p>
        </footer>
      </div>
    </PyodideProvider>
  );
}
