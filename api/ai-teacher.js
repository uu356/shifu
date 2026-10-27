const SYSTEM_PROMPT = `Sen Shifu Python platformasining do'stona, sabrli va professional o'zbek tilidagi AI Ustozisan.
Asosiy qoidalaring:
1. Birinchi javobdayoq tayyor yechim kodini berma!
2. Sokratik uslubda yo'naltir: avval tushuntirish, keyin kichik maslahat, so'ng o'xshash mashq ber.
3. Koddagi xatolarni sodda o'zbek tilida tushuntir.
4. Yosh yoki bilim darajasini taxmin qilma; sodda, hurmat bilan va ilhomlantiruvchi ohangda javob ber.
5. Agar talaba to'g'ridan-to'g'ri "javobni ayt" desa, avval o'zi urinib ko'rganmi deb so'ra yoki qadamba-qadam yo'l ko'rsat.
6. Harvard CS50P topshiriqlarini foydalanuvchi o'rniga ishlab berma; faqat konsepsiyani tushuntir va o'xshash mashq ber.
7. Javoblar qisqa, aniq va o'zbek tilida bo'lsin.`;

function generateLocalPedagogicalFeedback({ topic, userCode, userError, question, step = 1 }) {
  const err = (userError || "").trim();
  const q = (question || "").toLowerCase();

  if (err.includes("SyntaxError") || err.includes("qo'shtirnoq") || err.includes("qavs")) {
    if (step === 1) {
      return `Kodingizda sintaktik xatolik (SyntaxError) sezilmoqda.\n\nPythonda sintaktik xato - bu til qoidalariga mos kelmaydigan belgi yoki yozuvdir.\nMatnlarning boshi va oxiridagi qo'shtirnoqlarga hamda har bir ochilgan '(' qavs yopilganiga e'tibor bering.\n\nSizning kodingizdagi qaysi qatorda matn to'liq yopilmagan deb o'ylaysiz?`;
    } else if (step === 2) {
      return "Kichik maslahat:\n```python\n# To'g'ri yozuv namunasi:\nprint(\"Salom, Dunyo!\")\n```\nQo'shtirnoq juft bo'lishi kerak. Kodingizdagi qo'shtirnoqlarni sanab ko'ring - ular toq bo'lib qolmaganmi?";
    } else {
      return "O'xshash mashq:\nO'z sevgan shahringiz nomini ekranga bitta `print()` orqali chiqarishga urinib ko'ring.";
    }
  }

  if (err.includes("NameError") || err.includes("is not defined")) {
    return "NameError: Python o'zgaruvchi yoki funksiyani taniy olmadi.\n\nSabablari:\n1. Katta-kichik harf xatosi: `Print` to'g'risi: `print`\n2. O'zgaruvchi e'lon qilinmagan: avval `ism = \"Ali\"` deb yozing\n3. Matn qo'shtirnoqsiz: `print(Salom)` to'g'risi: `print(\"Salom\")`";
  }

  if (err.includes("IndentationError")) {
    return "IndentationError: Satr boshidagi bo'shliqlar noto'g'ri.\n\nPythonda qoidalar:\n- if/for/while/def dan keyin blokning ichki qatorlari 4 ta bo'shliq bilan suriladi\n- Bir blok ichida bo'shliqlar soni bir xil bo'lishi kerak\n- Tab va bo'shliqlarni aralashtirib yubormang";
  }

  if (err.includes("TypeError")) {
    return "TypeError: Noto'g'ri ma'lumot turlari bilan amal bajarildi.\n\nKo'p uchraydigan sabab: matn va sonni to'g'ridan-to'g'ri qo'shib bo'lmaydi.\nYechim: `str(son)` bilan matnga aylantiring yoki f-string ishlating:\n  `print(f\"Natija: {son}\")`";
  }

  if (err.includes("ZeroDivisionError")) {
    return "ZeroDivisionError: Nolga bo'lish mumkin emas!\n\nTekshirish qo'shing:\n```python\nif b != 0:\n    print(a / b)\nelse:\n    print(\"Nolga bo'lish mumkin emas!\")\n```";
  }

  if (q.includes("yechim") || q.includes("javob ber") || q.includes("yozib ber") || q.includes("tayyor kod") || q.includes("yechib ber")) {
    return "Dasturchilik - mustaqil fikrlash orqali rivojlanadigan ko'nikma!\n\nAgar men to'g'ridan-to'g'ri yechimni bersam, siz bu mantiqni o'zingiz o'zlashtira olmaysiz.\n\nKeling, birgalikda bosqichma-bosqich yechamiz:\n1. Dastur nima natija chiqarishi kerak?\n2. Hozircha qaysi qatorlargacha yozishga muvaffaq bo'ldingiz?\n3. Qayerda qotib qoldingiz?\n\nKodingizni yuboring - men yo'l ko'rsataman!";
  }

  if (topic && topic.includes("CS50")) {
    return "Harvard CS50P bo'yicha juda ajoyib mavzuni tanlabsiz!\n\nUshbu mavzuning asosiy g'oyasi: vazifani kichik, tekshirilishi oson bo'lgan bo'laklarga ajratish.\nAvval eng sodda holatdan boshlang. Qaysi tushuncha sizga hozir eng ko'p noaniq tuyulyapti?";
  }

  if (step === 1) {
    return `Tushuntirish - "${topic || 'Python'}" mavzusi:\n\nBu mavzuning asosiy maqsadi: dasturga mantiqiy qarorlar qabul qildirish va ma'lumotlarni to'g'ri boshqarish.\n\nBirinchi qadam - vazifaning nimani so'rayotganini tahlil qilish:\n- Dastur nima chiqarishi kerak?\n- Qanday ma'lumot bilan ishlash kerak?\n- Qaysi Python konstruksiyasi (if/for/def) mos keladi?\n\nSiz hozir qaysi qismida qotib qoldingiz?`;
  } else if (step === 2) {
    return "Maslahat:\n\nKodni kichik bo'laklarga bo'ling va har birini alohida sinang.\n\nStrategiya:\n1. Avval eng oddiy holatni ishlatib ko'ring\n2. Bir qatorda xato bo'lsa, `print()` bilan oraliq natijalarni tekshiring\n3. `print(type(ozgaruvchi))` - tur nima ekanini tekshiradi\n\nQaysi qatordan keyingi qadamni boshlash kerak deb o'ylaysiz?";
  } else {
    return `O'xshash mashq - "${topic || 'Python'}" mavzusida bilimingizni sinab ko'ring:\n\nIkkita print() funksiyasi bilan:\n- Birinchisida o'z ismingizni\n- Ikkinchisida bugungi yilni (masalan: 2025)\nchiqaring.\n\nKeyin shu ma'lumotlarni bitta f-string ichida birlashtiring!`;
  }
}

async function parseBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  return new Promise((resolve) => {
    let data = '';
    req.on('data', chunk => { data += chunk; });
    req.on('end', () => {
      try { resolve(JSON.parse(data)); } catch { resolve({}); }
    });
    req.on('error', () => resolve({}));
  });
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(200).json({ status: "ok", service: "Shifu Python AI Teacher Serverless" });
  }

  try {
    const body = await parseBody(req);
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
                  text: `${SYSTEM_PROMPT}\n\nMavzu: ${topic || "Umumiy Python"}\nO'quvchining hozirgi kodi:\n\`\`\`python\n${userCode || "# Kod yozilmagan"}\n\`\`\`\n\nXatolik (agar bo'lsa):\n${userError || "Xatolik yo'q"}\n\nO'quvchining savoli:\n${question || "Kodimni tahlil qilib, kichik maslahat bering."}\n\nYordam bosqichi: ${step}-bosqich (1: tushuntirish, 2: maslahat, 3: o'xshash mashq).`
                }]
              }],
              generationConfig: { maxOutputTokens: 600, temperature: 0.7 }
            })
          }
        );
        clearTimeout(timeout);

        const data = await response.json();
        if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
          return res.status(200).json({
            provider: "gemini",
            reply: data.candidates[0].content.parts[0].text
          });
        }
        if (data.error) console.warn("Gemini API error:", data.error.message);
      } catch (externalErr) {
        console.warn("Gemini API call failed, using local fallback:", externalErr.message);
      }
    }

    const localReply = generateLocalPedagogicalFeedback({ topic, userCode, userError, question, step });
    return res.status(200).json({
      provider: "local-pedagogy-engine",
      reply: localReply
    });

  } catch (error) {
    console.error("Handler error:", error);
    return res.status(500).json({ error: "Xatolik yuz berdi. Iltimos qaytadan urinib ko'ring." });
  }
}
