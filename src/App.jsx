import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CourseMapView from './components/CourseMapView';
import LessonStudio from './components/LessonStudio';
import HarvardCS50PView from './components/HarvardCS50PView';
import CapstoneProjectsView from './components/CapstoneProjectsView';
import DatabaseModal from './components/DatabaseModal';
import { PyodideProvider } from './contexts/PyodideContext';
import { LESSONS } from './data/lessonsData';
import { loadUserStats, saveUserStats, DEFAULT_STATS } from './utils/storageDB';
import confetti from 'canvas-confetti';

function calcStreak(lastVisitISO) {
  if (!lastVisitISO) return 1;
  const last = new Date(lastVisitISO);
  const today = new Date();
  const diffMs = today.setHours(0, 0, 0, 0) - last.setHours(0, 0, 0, 0);
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  return diffDays;
}

export default function App() {
  const [activeTab, setActiveTab] = useState('course');
  const [activeLesson, setActiveLesson] = useState(null);
  const [isDBModalOpen, setIsDBModalOpen] = useState(false);

  const [userStats, setUserStats] = useState(() => {
    const data = loadUserStats();
    const today = new Date().toISOString().split('T')[0];
    const lastVisit = data.lastVisitDate;
    let newStreak = data.streak;

    if (lastVisit !== today) {
      const diffDays = calcStreak(lastVisit);
      if (diffDays === 1) {
        newStreak = (data.streak || 1) + 1;
      } else if (diffDays > 1) {
        newStreak = 1;
      }
    }
    return { ...data, streak: newStreak, lastVisitDate: today };
  });

  // Persist to storageDB whenever userStats updates
  useEffect(() => {
    saveUserStats(userStats);
  }, [userStats]);

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

  // Save active lesson
  useEffect(() => {
    try {
      if (activeLesson) {
        localStorage.setItem('shifu_active_lesson', JSON.stringify({ tab: activeTab, lessonId: activeLesson.id }));
      } else {
        localStorage.removeItem('shifu_active_lesson');
      }
    } catch { /* ignore */ }
  }, [activeLesson, activeTab]);

  const handleCompleteLesson = (lessonId, xpEarned) => {
    setUserStats(prev => {
      const alreadyDone = prev.completedLessonIds.includes(lessonId);
      const newCompleted = alreadyDone ? prev.completedLessonIds : [...prev.completedLessonIds, lessonId];
      const newXp = prev.xp + (alreadyDone ? 10 : xpEarned);
      const newLevel = Math.max(prev.level, Math.floor(newXp / 100) + 1);

      const newBadges = [...prev.badges];
      if (newLevel > prev.level && !newBadges.some(b => b.includes(`Daraja ${newLevel}`))) {
        newBadges.push(`⭐ Daraja ${newLevel} erishildi!`);
      }
      if (newCompleted.length === 1 && !newBadges.includes('🌱 Birinchi dars!')) newBadges.push('🌱 Birinchi dars!');
      if (newCompleted.length === 6 && !newBadges.some(b => b.includes('Yarim'))) newBadges.push("🔥 Yarim yo'l!");
      if (newCompleted.length === 12 && !newBadges.some(b => b.includes('Kurs yakunlandi'))) newBadges.push('🏆 Kurs yakunlandi!');

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        completedLessonIds: newCompleted,
        badges: newBadges
      };
    });

    try {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    } catch { /* ignore */ }
  };

  const handleNextLesson = (targetLesson) => {
    if (targetLesson) {
      setActiveLesson(targetLesson);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevLesson = (targetLesson) => {
    if (targetLesson) {
      setActiveLesson(targetLesson);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleToggleUnlockAll = () => {
    setUserStats(prev => ({
      ...prev,
      unlockedAll: !prev.unlockedAll
    }));
  };

  const handleUnlockAllDirect = () => {
    setUserStats(prev => ({
      ...prev,
      unlockedAll: true,
      completedLessonIds: Array.from(new Set([...prev.completedLessonIds, ...LESSONS.map(l => l.id)]))
    }));
  };

  const handleResetProgress = () => {
    const fresh = { ...DEFAULT_STATS, lastVisitDate: new Date().toISOString().split('T')[0] };
    setUserStats(fresh);
    localStorage.removeItem('shifu_active_lesson');
    setActiveLesson(null);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setActiveLesson(null);
  };

  return (
    <PyodideProvider>
      <div className="app-container">
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={handleTabChange} 
          userStats={userStats}
          onOpenDBModal={() => setIsDBModalOpen(true)}
        />

        <main className="main-content">
          {activeTab === 'course' && !activeLesson && (
            <CourseMapView
              lessons={LESSONS}
              completedLessonIds={userStats.completedLessonIds}
              unlockedAll={userStats.unlockedAll}
              onToggleUnlockAll={handleToggleUnlockAll}
              onSelectLesson={setActiveLesson}
            />
          )}

          {activeTab === 'course' && activeLesson && (
            <LessonStudio
              lesson={activeLesson}
              lessons={LESSONS}
              onCompleteLesson={handleCompleteLesson}
              onBack={() => setActiveLesson(null)}
              onNextLesson={handleNextLesson}
              onPrevLesson={handlePrevLesson}
            />
          )}

          {activeTab === 'cs50p' && <HarvardCS50PView />}
          {activeTab === 'projects' && <CapstoneProjectsView />}
        </main>

        <DatabaseModal
          isOpen={isDBModalOpen}
          onClose={() => setIsDBModalOpen(false)}
          userStats={userStats}
          onUpdateStats={setUserStats}
          onUnlockAll={handleUnlockAllDirect}
          onReset={handleResetProgress}
        />

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
