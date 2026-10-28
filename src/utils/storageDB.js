// Shifu Python — Mahalliy Ma'lumotlar Bazasi va Sinxronizatsiya Tizimi (Local DB Engine)

const DB_KEY = 'shifu_python_user_progress_v2';
const ACTIVE_LESSON_KEY = 'shifu_active_lesson';

export const DEFAULT_STATS = {
  xp: 0,
  level: 1,
  streak: 1,
  lastVisitDate: new Date().toISOString().split('T')[0],
  completedLessonIds: [],
  unlockedAll: false, // Foydalanuvchi barcha darslarni erkin ochib qo'yishi mumkin
  badges: ['🐣 Yangi Boshlovchi']
};

export function loadUserStats() {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (!raw) return { ...DEFAULT_STATS };
    const data = JSON.parse(raw);
    return {
      ...DEFAULT_STATS,
      ...data,
      completedLessonIds: Array.isArray(data.completedLessonIds) ? data.completedLessonIds : []
    };
  } catch (err) {
    console.warn("StorageDB load error:", err);
    return { ...DEFAULT_STATS };
  }
}

export function saveUserStats(stats) {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(stats));
    // Zaxira nusxa
    localStorage.setItem(`${DB_KEY}_backup`, JSON.stringify(stats));
  } catch (err) {
    console.warn("StorageDB save error:", err);
  }
}

export function exportProgressJSON(stats) {
  const blob = new Blob([JSON.stringify(stats, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `shifu_python_progress_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importProgressJSON(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (typeof parsed.xp === 'number' && Array.isArray(parsed.completedLessonIds)) {
          resolve(parsed);
        } else {
          reject(new Error("Fayl formati mos kelmadi"));
        }
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error("Faylni o'qishda xatolik"));
    reader.readAsText(file);
  });
}
