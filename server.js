import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Socratic pedagogical rules for AI Teacher
const SYSTEM_PROMPT = `Sen Shifu Python platformasining do'stona, sabrli va professional o'zbek tilidagi AI Ustozisan (AI Teacher).
Asosiy qoidalaring:
1. Birinchi javobdayoq tayyor yechim kodini berma!
2. Sokratik uslubda yo'naltir: avval tushuntirish, keyin kichik maslahat, so'ng o'xshash mashq ber.
3. Koddagi xatolarni sodda o'zbek tilida tushuntir.
4. Yosh yoki bilim darajasini taxmin qilma; sodda, hurmat bilan va ilhomlantiruvchi ohangda javob ber.
5. Agar talaba to'g'ridan-to'g'ri "javobni ayt" desa, avval o'zi urinib ko'rganmi deb so'ra yoki qadamba-qadam yo'l ko'rsat.
6. Harvard CS50P topshiriqlarini foydalanuvchi o'rniga ishlab berma; faqat konsepsiyani tushuntir va o'xshash mashq ber.`;

// Intelligent local rule-based teacher fallback if no external API key is set
function generateLocalPedagogicalFeedback({ topic, userCode, userError, question, step = 1 }) {
  const code = (userCode || "").trim();
  const err = (userError || "").trim();
  const q = (question || "").toLowerCase();

  // 1. Analyze for common errors
  if (err.includes("SyntaxError") || err.includes("qo'shtirnoq") || err.includes("qavs")) {
    if (step === 1) {
      return `Salom! Kodingizda sintaktik xatolik (SyntaxError) sezilmoqda. 

Pythonda sintaktik xato — bu til qoidalariga mos kelmaydigan belgi yoki yozuvdir. Matnlarning boshi va oxiridagi qo'shtirnoqlarga hamda har bir ochilgan '(' qavs yopilganiga e'tibor bering.

Sizning kodingizdagi qaysi qatorda matn to'liq yopilmagan deb o'ylaysiz?`;
    } else if (step === 2) {
      return `Kichik maslahat: 
\`\`\`python
# To'g'ri yozuv namunasi:
print("Salom, Dunyo!")
\`\`\`
Qo'shtirnoq juft bo'lishi kerak. Kodingizdagi qo'shtirnoqlarni sanab ko'ring, ular toq bo'lib qolmaganmi?`;
    } else {
      return `Keling, o'xshash mashq bilan sinab ko'ramiz:
O'z sevgan shahringiz nomini ekranga bitta \`print()\` orqali chiqarishga urinib ko'ring.`;
    }
  }

  if (err.includes("NameError") || err.includes("Print") || err.includes("is not defined")) {
    return `NameError xatoligi ko'rinmoqda! 

Pythonda barcha standart funksiya nomlari qat'iy ravishda kichik harflar bilan yoziladi (masalan: \`print\`, \`input\`). Agar matnni ekranga chiqarmoqchi bo'lsangiz, uni albatta qo'shtirnoq ichiga oling, aks holda Python uni o'zgaruvchi deb qidiradi va topolmaydi.

Qani, 'Print' so'zini kichik harf bilan 'print' qilib ko'ring-chi!`;
  }

  // 2. Direct solution request handling
  if (q.includes("yechim") || q.includes("javob") || q.includes("tayyor kod") || q.includes("yechib ber")) {
    return `Dasturchilik — bu muammoni mustaqil yechish orqali shakllanadigan haqiqiy mahorat! 

Agar men sizga tayyor kodni shunchaki berib qo'ysam, miyangiz bu mantiqni o'zlashtira olmaydi. Keling, birgalikda bosqichma-bosqich yechamiz:
1. Siz nima natija olmoqchisiz?
2. Hozircha qaysi qatorgacha yozishga muvaffaq bo'ldingiz?
Kodingizni menga yuboring, men sizga yo'l ko'rsataman!`;
  }

  // 3. CS50P or general topic guidance
  if (topic && topic.includes("CS50")) {
    return `Harvard CS50P bo'yicha juda ajoyib mavzuni tanlabsiz! 

Ushbu mavzuning asosiy g'oyasi: vazifani kichik, tekshirilishi oson bo'lgan bo'laklarga ajratish. 
Avval eng sodda holatdan boshlang. Qaysi tushuncha sizga hozir eng ko'p noaniq tuyulyapti?`;
  }

  // General warm pedagogical response
  return `Salom, bo'lajak dasturchi! Kod yozishda davom etayotganingiz juda quvonarli. 

Kodingizni ko'rib chiqdim. Agar biror qismida ikkilansangiz yoki kutilgan natija chiqmayotgan bo'lsa:
1. Har bir qatorda kompyuter nima ish qilayotganini tasavvur qiling.
2. Natijani tekshirish uchun oraliq \`print()\` lardan foydalaning.

Savolingiz bo'lsa, aynan qaysi nuqta tushunarsiz bo'layotganini so'rang, mamnuniyat bilan yordam beraman!`;
}

// AI Teacher Proxy Endpoint
app.post('/api/ai-teacher', async (req, res) => {
  try {
    const { topic, userCode, userError, question, step = 1 } = req.body;

    const geminiApiKey = process.env.GEMINI_API_KEY;

    // 1. If Gemini API Key is provided, call Google Gemini
    if (geminiApiKey) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [
                    {
                      text: `${SYSTEM_PROMPT}

Mavzu: ${topic || "Umumiy Python"}
O'quvchining hozirgi kodi:
\`\`\`python
${userCode || "# Kod yozilmagan"}
\`\`\`

Xatolik (agar bo'lsa):
${userError || "Xatolik yo'q"}

O'quvchining savoli / vaziyati:
${question || "Kodimni tahlil qilib, kichik maslahat bering."}

Yordam bosqichi: ${step}-bosqich (1: tushuntirish, 2: maslahat, 3: o'xshash mashq).`
                    }
                  ]
                }
              ]
            })
          }
        );

        const data = await response.json();
        if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
          return res.json({
            provider: "gemini",
            reply: data.candidates[0].content.parts[0].text
          });
        }
      } catch (externalErr) {
        console.warn("External Gemini API call failed, falling back to local teacher:", externalErr.message);
      }
    }

    // 2. Fallback to intelligent local pedagogical engine
    const localReply = generateLocalPedagogicalFeedback({ topic, userCode, userError, question, step });
    return res.json({
      provider: "local-pedagogy-engine",
      reply: localReply,
      notice: "AI Teacher lokal aqlli rejimda ishlamoqda. To'liq tashqi LLM uchun server/.env da GEMINI_API_KEY ni sozlashingiz mumkin."
    });

  } catch (error) {
    console.error("AI Teacher endpoint error:", error);
    res.status(500).json({
      error: "AI Teacher hozirda javob bera olmadi. Iltimos, qaytadan urinib ko'ring."
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: "ok", service: "Shifu Python AI Teacher Backend" });
});

app.listen(PORT, () => {
  console.log(`Shifu Python AI Server http://localhost:${PORT} da ishga tushdi.`);
});
