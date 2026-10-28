import React from 'react';

export default function Navbar({ activeTab, setActiveTab, userStats, onOpenDBModal }) {
  return (
    <header className="navbar">
      <div className="nav-brand" onClick={() => setActiveTab("course")}>
        <div className="brand-logo">🐍</div>
        <div>
          <span className="brand-title">Shifu Python</span>
          <span className="brand-badge">O'zbekcha</span>
        </div>
      </div>

      <nav className="nav-menu">
        <button 
          className={`nav-item ${activeTab === "course" ? "active" : ""}`}
          onClick={() => setActiveTab("course")}
        >
          <span>🗺️</span>
          <span>Mening kursim</span>
        </button>

        <button 
          className={`nav-item ${activeTab === "cs50p" ? "active" : ""}`}
          onClick={() => setActiveTab("cs50p")}
        >
          <span>🎓</span>
          <span>Harvard CS50P</span>
        </button>

        <button 
          className={`nav-item ${activeTab === "projects" ? "active" : ""}`}
          onClick={() => setActiveTab("projects")}
        >
          <span>🚀</span>
          <span>Katta loyihalar</span>
        </button>
      </nav>

      <div className="nav-stats" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <div className="stat-pill xp" title="To'plangan tajriba ballari">
          <span>⚡</span>
          <span>{userStats.xp} XP</span>
        </div>

        <div className="stat-pill level" title="Sizning hozirgi darajangiz">
          <span>🏆</span>
          <span>Daraja {userStats.level}</span>
        </div>

        <div className="stat-pill streak" title="Ketma-ket o'rganish kunlari">
          <span>🔥</span>
          <span>{userStats.streak} kun</span>
        </div>

        {/* Database & Settings button */}
        <button
          onClick={onOpenDBModal}
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid var(--border)',
            padding: '0.4rem 0.75rem',
            borderRadius: 'var(--radius-full)',
            color: '#cbd5e1',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
          title="Ma'lumotlar bazasi va saqlash sozlamalari"
        >
          <span>🗄️</span>
          <span>Baza</span>
        </button>
      </div>
    </header>
  );
}
