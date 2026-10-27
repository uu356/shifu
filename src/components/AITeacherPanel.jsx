import React, { useState, useEffect, useRef } from 'react';

const INITIAL_MESSAGE = {
  sender: "ai",
  text: "Assalomu alaykum! Men sizning shaxsiy Python ustozingizman. Mavzuni tushunishda, xatolarni tahlil qilishda yoki bosqichma-bosqich maslahat olishda yordam bera olaman. Keling, dasturlashni birga o'rganamiz! 🚀"
};

export default function AITeacherPanel({ currentTopic, userCode, userError }) {
  const [step, setStep] = useState(1);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const messagesEndRef = useRef(null);

  // Reset chat when topic changes (new lesson or CS50P topic)
  useEffect(() => {
    setMessages([INITIAL_MESSAGE]);
    setStep(1);
    setQuestion("");
  }, [currentTopic]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const requestHelp = async (selectedStep = step, customQuery = question) => {
    if (loading) return;
    setLoading(true);
    setStep(selectedStep);

    const userMsg = customQuery.trim() || (selectedStep === 1
      ? "Mavzu yoki xatoni sodda tushuntirib bering."
      : selectedStep === 2
      ? "Keyingi qadam uchun kichik maslahat bering."
      : "Shunga o'xshash boshqa mashq bering.");

    const newMessages = [...messages, { sender: "user", text: userMsg }].slice(-20);
    setMessages(newMessages);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "/api/ai-teacher";
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: currentTopic || "Python asoslari",
          userCode,
          userError,
          question: userMsg,
          step: selectedStep
        }),
        signal: AbortSignal.timeout(8000)
      });

      if (res.ok) {
        const data = await res.json();
        setMessages(prev => [...prev, { sender: "ai", text: data.reply }].slice(-20));
        setLoading(false);
        setQuestion("");
        return;
      }
    } catch {
      // Seamless local fallback
    }

    // ---- Intelligent local fallback ----
    await new Promise(r => setTimeout(r, 400));

    let reply = "";
    const err = (userError || "").toLowerCase();
    const q = userMsg.toLowerCase();

    if (q.includes("yechim") || q.includes("javob ber") || q.includes("yozib ber") || q.includes("tayyor kod")) {
      reply = `Dasturchilik — mustaqil fikrlash orqali rivojlanadigan ko'nikma! 💡

Agar men to'g'ridan-to'g'ri yechimni bersam, siz bu mantiqni o'zingiz o'zlashtira olmaysiz.

Keling, birgalikda bosqichma-bosqich yechamiz:
1️⃣ Dastur nima natija chiqarishi kerak?
2️⃣ Hozircha qaysi qatorlargacha yozishga muvaffaq bo'ldingiz?
3️⃣ Qayerda qotib qoldingiz?

Kodingizni yuboring — men yo'l ko'rsataman! 🎯`;
    } else if (err.includes("syntaxerror") || err.includes("qo'shtirnoq") || err.includes("qavs")) {
      if (selectedStep === 1) {
        reply = `📘 Tushuntirish: Kodingizda SyntaxError — bu Python til qoidalariga xilof yozuv.

Eng ko'p uchraydigan sabablar:
• Qo'shtirnoq juftligi yopilmagan: print("Salom) ← to'g'risi: print("Salom")
• Qavslar yopilmagan: print("hi" ← to'g'risi: print("hi")
• Ikki nuqta (: ) unutilgan: if x > 0 ← to'g'risi: if x > 0:

Kodingizning qaysi qatorida qo'shtirnoq yoki qavs yopilmagan deb o'ylaysiz?`;
      } else if (selectedStep === 2) {
        reply = `🔍 Maslahat: Har bir ochilgan belgining juftini izlang:
• " → " (juft bo'lishi kerak)
• ' → ' (juft bo'lishi kerak)
• ( → ) (yopilishi kerak)

Kodingizni boshidan oxirigacha belgilarni sanang. Toq qolgan bitta belgi — mana o'sha xato!`;
      } else {
        reply = `🎯 O'xshash mashq:
Quyidagi kodni to'g'rilang (3 ta xato bor):
\`\`\`python
print("Salom, dunyo!)
print('Python o'rganish yoqadi)
print("XP: " + 100
\`\`\``;
      }
    } else if (err.includes("nameerror") || err.includes("is not defined")) {
      reply = `⚠️ NameError: Python o'zgaruvchi yoki funksiyani taniy olmadi.

Sabablari:
1. Katta-kichik harf xatosi: Print ← to'g'risi: print
2. O'zgaruvchi e'lon qilinmagan: ism ← avval ism = "Ali" deb yozing
3. Matn qo'shtirnoqsiz: print(Salom) ← to'g'risi: print("Salom")

Xato belgisi qanday edi? Uni menga yuboring.`;
    } else if (err.includes("indentationerror")) {
      reply = `📐 IndentationError: Satr boshidagi bo'shliqlar noto'g'ri.

Pythonda qoidalar:
• if/for/while/def dan keyin blokning ichki qatorlari 4 ta bo'shliq bilan suriladi
• Bir blok ichida bo'shliqlar soni bir xil bo'lishi kerak
• Tab va bo'shliqlarni aralashtirib yubormang

Muharriringiz "spaces" rejimida (tab emas) ishlayaptimi?`;
    } else if (selectedStep === 1) {
      reply = `📘 Tushuntirish — "${currentTopic}" mavzusi:

Bu mavzuning asosiy maqsadi: dasturga mantiqiy qarorlar qabul qildirish va ma'lumotlarni to'g'ri boshqarish.

Birinchi qadam — vazifaning nimani so'rayotganini tahlil qilish:
• Dastur nima chiqarishi kerak?
• Qanday ma'lumot bilan ishlash kerak?
• Qaysi Python konstruksiyasi (if/for/def) mos keladi?

Siz hozir qaysi qismida qotib qoldingiz?`;
    } else if (selectedStep === 2) {
      reply = `✨ Maslahat:

Kodni kichik bo'laklarga bo'ling va har birini alohida sinang.

Strategiya:
1. Avval eng oddiy holatni ishlatib ko'ring
2. Bir qatorda xato bo'lsa, print() bilan oraliq natijalarni tekshiring
3. print(type(o'zgaruvchi)) — tur nima ekanini tekshiradi

Qaysi qatordan keyingi qadamni boshlash kerak deb o'ylaysiz?`;
    } else {
      reply = `🚀 O'xshash mashq:

"${currentTopic}" mavzusida bilimingizni sinab ko'ring:

Ikkita print() funksiyasi bilan:
• Birinchisida o'z ismingizni
• Ikkinchisida bugungi sanamiyani (yil sifatida)
chiqaring.

Keyin shu ma'lumotlarni bitta f-string ichida birlashtiring!`;
    }

    setMessages(prev => [...prev, { sender: "ai", text: reply }].slice(-20));
    setLoading(false);
    setQuestion("");
  };

  return (
    <div className="ai-teacher-box">
      <div className="ai-header">
        <div className="ai-avatar">
          <div className="ai-avatar-icon">🤖</div>
          <div>
            <div className="ai-title">AI Ustoz (Teacher)</div>
            <div className="ai-subtitle">{currentTopic ? currentTopic.substring(0, 35) + (currentTopic.length > 35 ? '...' : '') : 'Python yordamchisi'}</div>
          </div>
        </div>
        <span className="brand-badge">Sokratik uslub</span>
      </div>

      {/* 3 Step Buttons */}
      <div className="ai-steps">
        {[
          { n: 1, label: "1. Tushuntirish" },
          { n: 2, label: "2. Maslahat" },
          { n: 3, label: "3. Mashq" }
        ].map(({ n, label }) => (
          <button
            key={n}
            className={`step-btn ${step === n ? 'active' : ''}`}
            onClick={() => requestHelp(n, "")}
            disabled={loading}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Chat Thread */}
      <div style={{ maxHeight: '240px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className="ai-response"
            style={{
              background: msg.sender === 'user' ? 'rgba(6, 182, 212, 0.1)' : 'var(--bg-surface)',
              borderLeft: `3px solid ${msg.sender === 'ai' ? '#6366f1' : '#06b6d4'}`,
              fontSize: msg.sender === 'user' ? '0.85rem' : '0.88rem',
              whiteSpace: 'pre-wrap'
            }}
          >
            {msg.sender === 'ai' && <span style={{ fontSize: '0.75rem', color: '#6366f1', display: 'block', marginBottom: '3px' }}>🤖 AI Ustoz</span>}
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="ai-response" style={{ color: '#94a3b8', fontStyle: 'italic' }}>
            🤔 AI Ustoz javob tayyorlamoqda...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => { e.preventDefault(); if (question.trim()) requestHelp(step, question); }}
        style={{ display: 'flex', gap: '0.5rem' }}
      >
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Savolingizni yozing..."
          style={{
            flex: 1, background: 'var(--bg-card)', border: '1px solid var(--border)',
            padding: '0.6rem 0.85rem', borderRadius: 'var(--radius-sm)', color: 'white', fontSize: '0.85rem'
          }}
        />
        <button
          type="submit"
          className="btn-primary"
          style={{ width: 'auto', padding: '0.6rem 1rem' }}
          disabled={loading || !question.trim()}
        >
          So'rash
        </button>
      </form>
    </div>
  );
}
