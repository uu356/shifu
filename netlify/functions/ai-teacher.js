const SYSTEM_PROMPT = `Sen Shifu Python platformasining do'stona, sabrli va professional o'zbek tilidagi AI Ustozisan.
Asosiy qoidalaring:
1. Birinchi javobdayoq tayyor yechim kodini berma!
2. Sokratik uslubda yo'naltir: avval tushuntirish, keyin kichik maslahat, so'ng o'xshash mashq ber.
3. Koddagi xatolarni sodda o'zbek tilida tushuntir.
4. Yosh yoki bilim darajasini taxmin qilma; sodda, hurmat bilan va ilhomlantiruvchi ohangda javob ber.
5. Agar talaba to'g'ridan-to'g'ri "javobni ayt" desa, avval o'zi urinib ko'rganmi deb so'ra yoki qadamba-qadam yo'l ko'rsat.
6. Harvard CS50P topshiriqlarini foydalanuvchi o'rniga ishlab berma.
7. Javoblar qisqa, aniq va o'zbek tilida bo'lsin.`;

function generateLocalFeedback({ topic, userCode, userError, question, step = 1 }) {
  const err = (userError || "").trim();
  const q = (question || "").toLowerCase();

  if (err.includes("SyntaxError") || err.includes("qavs") || err.includes("qo'shtirnoq")) {
    if (step === 1) return "Kodingizda SyntaxError bor.\n\nQo'shtirnoqlar yopilganmi? Har bir '(' uchun ')' bo'lishi kerak.\n\nQaysi qatorda xato bo'lishi mumkin?";
    if (step === 2) return "Maslahat:\n```python\nprint(\"To'g'ri yozuv\")\n```\nQo'shtirnoqlarni sanab ko'ring - ular juft bo'lishi kerak.";
    return "Mashq: Sevgan shahringizni bitta print() bilan chiqaring.";
  }

  if (err.includes("NameError") || err.includes("is not defined")) {
    return "NameError: Python o'zgaruvchi yoki funksiyani topa olmadi.\n\n1. print kichik harf bilan yozilishi kerak (Print emas)\n2. O'zgaruvchi avval e'lon qilinishi kerak\n3. Matn qo'shtirnoq ichida bo'lishi kerak: print(\"Salom\")";
  }

  if (err.includes("IndentationError")) {
    return "IndentationError: Bo'shliqlar xato.\n\nif/for/while/def dan keyin 4 ta bo'shliq kerak.";
  }

  if (err.includes("TypeError")) {
    return "TypeError: Noto'g'ri turlar.\n\nMatn va sonni qo'shib bo'lmaydi. F-string ishlating:\nprint(f\"Natija: {son}\")";
  }

  if (err.includes("ZeroDivisionError")) {
    return "ZeroDivisionError: Nolga bo'lish mumkin emas!\n\nif b != 0: ni tekshiring.";
  }

  if (q.includes("yechim") || q.includes("javob ber") || q.includes("tayyor kod")) {
    return "Tayyor kodni bersam, siz o'zlashtira olmaysiz!\n\n1. Dastur nima chiqarishi kerak?\n2. Qayergacha yozishga muvaffaq bo'ldingiz?\n3. Qayerda qotib qoldingiz?\n\nKodingizni yuboring - yo'l ko'rsataman!";
  }

  if (topic && topic.includes("CS50")) {
    return "Harvard CS50P - ajoyib tanlov!\n\nVazifani kichik bo'laklarga bo'ling. Qaysi tushuncha noaniq?";
  }

  if (step === 1) {
    return `Tushuntirish - "${topic || 'Python'}" mavzusi:\n\nDastur nima chiqarishi kerak?\nQaysi Python konstruksiyasi kerak (if/for/def)?\n\nQayerda qotib qoldingiz?`;
  } else if (step === 2) {
    return "Maslahat:\n\nHar bir qatorni alohida sinang.\nprint() bilan oraliq natijalarni tekshiring.\nprint(type(x)) - turni tekshiradi.";
  } else {
    return `O'xshash mashq - "${topic || 'Python'}":\n\nIkkita print() bilan:\n- Ismingizni\n- Bugungi yilni\nchiqaring, keyin f-string bilan birlashtiring!`;
  }
}

exports.handler = async function(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ status: 'ok', service: 'Shifu Python AI Teacher' })
    };
  }

  try {
    let body = {};
    try { body = JSON.parse(event.body || '{}'); } catch {}
    
    const { topic, userCode, userError, question, step = 1 } = body;
    const geminiApiKey = process.env.GEMINI_API_KEY;

    if (geminiApiKey) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 7000);

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            signal: controller.signal,
            body: JSON.stringify({
              contents: [{
                role: 'user',
                parts: [{
                  text: `${SYSTEM_PROMPT}\n\nMavzu: ${topic || "Python"}\nKod:\n\`\`\`python\n${userCode || "# yozilmagan"}\n\`\`\`\nXatolik: ${userError || "yo'q"}\nSavol: ${question || "maslahat bering"}\nBosqich: ${step}`
                }]
              }],
              generationConfig: { maxOutputTokens: 600, temperature: 0.7 }
            })
          }
        );
        clearTimeout(timeout);

        const data = await response.json();
        if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ provider: "gemini", reply: data.candidates[0].content.parts[0].text })
          };
        }
        if (data.error) console.warn("Gemini error:", data.error.message);
      } catch (err) {
        console.warn("Gemini failed:", err.message);
      }
    }

    const localReply = generateLocalFeedback({ topic, userCode, userError, question, step });
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ provider: "local-pedagogy-engine", reply: localReply })
    };

  } catch (error) {
    console.error("Function error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Xatolik yuz berdi." })
    };
  }
};
