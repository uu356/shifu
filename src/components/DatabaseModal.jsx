import React, { useRef } from 'react';
import { exportProgressJSON, importProgressJSON } from '../utils/storageDB';

export default function DatabaseModal({ 
  isOpen, 
  onClose, 
  userStats, 
  onUpdateStats, 
  onUnlockAll, 
  onReset 
}) {
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleExport = () => {
    exportProgressJSON(userStats);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = await importProgressJSON(file);
      onUpdateStats(data);
      alert("✅ Ma'lumotlar bazasi fayldan muvaffaqiyatli tiklandi!");
      onClose();
    } catch (err) {
      alert("❌ Xatolik: " + err.message);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div style={{
        background: '#1e293b',
        border: '1px solid #334155',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '520px',
        padding: '1.75rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        color: '#f8fafc'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🗄️</span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>Ma'lumotlar Bazasi & Sozlamalar</h3>
          </div>
          <button 
            onClick={onClose}
            style={{ fontSize: '1.2rem', color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>

        {/* Status Card */}
        <div style={{
          background: '#0f172a',
          padding: '1rem',
          borderRadius: '12px',
          border: '1px solid #334155',
          marginBottom: '1.25rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#34d399', fontSize: '0.85rem', fontWeight: 700 }}>
            <span>🟢</span> Mahalliy Baza Faol (LocalStorage + Zaxira)
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', textAlign: 'center', marginTop: '0.75rem' }}>
            <div style={{ background: '#1e293b', padding: '0.5rem', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>To'plangan XP</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fbbf24' }}>{userStats.xp}</div>
            </div>
            <div style={{ background: '#1e293b', padding: '0.5rem', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Daraja</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#38bdf8' }}>{userStats.level}</div>
            </div>
            <div style={{ background: '#1e293b', padding: '0.5rem', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Tugatilgan</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#34d399' }}>{userStats.completedLessonIds.length} / 12</div>
            </div>
          </div>
        </div>

        {/* Database Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {/* Unlock All Lessons Button */}
          <button
            onClick={() => {
              onUnlockAll();
              alert("🎉 Barcha 12 ta dars qulfdan chiqarildi! Istalgan darsga erkin o'tishingiz mumkin.");
              onClose();
            }}
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              border: '1px solid #10b981',
              background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(6,182,212,0.2))',
              color: '#34d399',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            <span>🔓</span> Barcha Darslarni Qulfdan Chiqarish (1-12)
          </button>

          {/* Export JSON */}
          <button
            onClick={handleExport}
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              border: '1px solid #475569',
              background: '#334155',
              color: '#f8fafc',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            <span>💾</span> Progressni Faylga Saqlash (JSON Export)
          </button>

          {/* Import JSON */}
          <button
            onClick={() => fileInputRef.current?.click()}
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              border: '1px solid #475569',
              background: '#1e293b',
              color: '#cbd5e1',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            <span>📂</span> Fayldan Tiklash (JSON Import)
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept=".json" 
            style={{ display: 'none' }} 
          />

          {/* Reset */}
          <button
            onClick={() => {
              if (window.confirm("Haqiqatan ham barcha progressni qayta o'rnatmoqchimisiz?")) {
                onReset();
                onClose();
              }
            }}
            style={{
              padding: '0.65rem 1rem',
              borderRadius: '10px',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#f87171',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              marginTop: '0.5rem'
            }}
          >
            🔄 Progressni Nollash (Reset)
          </button>
        </div>
      </div>
    </div>
  );
}
