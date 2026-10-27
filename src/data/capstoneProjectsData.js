// Darajalarga qarab tizimlashtirilgan Katta Loyihalar (Capstone Projects)
// Har bir loyiha 12 bandlik to'liq metodik oqimga ega

export const CAPSTONE_PROJECTS = [
  {
    id: "level-1-guess-number",
    level: 1,
    levelName: "1-daraja: Boshlovchi loyihalari",
    title: "🎯 Tasodifiy Son Topish O'yini",
    badge: "Boshlovchi Loyihachi",
    summary: "Foydalanuvchi va kompyuter o'rtasida shartlar, taqqoslash va int/input ga asoslangan interaktiv terminal o'yini.",
    flow: {
      goal: "Tasodifiy o'ylangan sonni (1 dan 50 gacha) taxminlar sonini hisoblagan holda topish o'yinini yaratish orqali boshlang'ich Python sintaksisini mustahkamlash.",
      prerequisites: ["print() va input()", "O'zgaruvchilar va int() konvertatsiyasi", "if, elif, else shartlari", "while yoki for sikli"],
      requirements: [
        "Kompyuter 1 dan 50 gacha tasodifiy butun son o'ylashi kerak (random.randint).",
        "Foydalanuvchidan son kiritish so'ralsin va har bir urinish hisoblab borilsin.",
        "Agar kiritilgan son kichik bo'lsa: 'Kattaroq son ayting!' deb maslahat berilsin.",
        "Agar kiritilgan son katta bo'lsa: 'Kichikroq son ayting!' deb maslahat berilsin.",
        "To'g'ri topilganda tabriklash va jami urinishlar sonini chiqarish."
      ],
      steps: [
        "1-qadam: random modulini chaqirish va sirli sonni aniqlash.",
        "2-qadam: Urinishlar hisoblagichini 0 ga tenglash.",
        "3-qadam: Cheksiz while sikli ochish va foydalanuvchidan input olish.",
        "4-qadam: int() bilan son shakliga o'tkazish va shartlar (if/elif/else) orqali tekshirish.",
        "5-qadam: To'g'ri topilganda 'break' orqali sikldan chiqish va natijani chiqarish."
      ],
      acceptanceCriteria: [
        "Dastur kamida 1 marta random.randint(1, 50) ni ishlatishi kerak.",
        "Har bir urinishda foydalanuvchiga to'g'ri yo'nalish ('Katta'/'Kichik') berilishi shart.",
        "Muvaffaqiyatli topilganda urinishlar soni aniq ko'rsatilishi lozim."
      ],
      independentWork: `# O'zingiz mustaqil boshlang
import random

sirli_son = random.randint(1, 20)
urinishlar = 0

print("1 dan 20 gacha son o'yladim. Topishga harakat qiling!")
# Davomini o'zingiz yozing:
`,
      testCases: [
        { type: "Oddiy holat", input: "15, 10, 12", expected: "Kichikroq / Kattaroq / To'g'ri topdingiz!" },
        { type: "Noto'g'ri kiritish", input: "'yigirma'", expected: "Xatolik yuz bermasligi uchun try-except qo'shish tavsiya etiladi." },
        { type: "Edge case", input: "1 yoki 50 chegaraviy qiymatlar", expected: "Chegaralar to'g'ri ishlashi kerak." }
      ],
      aiTeacherHelp: {
        step1: "Tushunish: Kompyuter o'ylagan son bilan foydalanuvchi kiritgan sonni qaysi mantiqiy operatorlar bilan solishtirasiz?",
        step2: "Maslahat: Har bir urinishda 'urinishlar += 1' qilishni va foydalanuvchi kiritgan qiymat matn (str) bo'lgani uchun uni int() ga o'girishni unutmang.",
        step3: "O'xshash mashq: 2 ta sonni solishtirib 'Katta' yoki 'Teng' deb chiqaruvchi kichik if-else bloki yozing."
      },
      codeReview: "Kodingiz qanchalik sodda o'qiladi? O'zgaruvchilar nomi mantiqiymi (masalan: taxmin, sirli_son)?",
      refactorPhase: "Kodni yaxshilang: Foydalanuvchiga faqat 5 ta imkoniyat bering. Agar 5 urinishda topolmasa, 'Yutqazdingiz!' deb chiqarsin.",
      presentation: "Dasturingizni do'stingizga tushuntiring: qaysi qatorda kompyuter qaror qabul qiladi?",
      extension: "Kuchli o'quvchilar uchun: O'yin tugagach 'Yana o'ynashni xohlaysizmi? (ha/yo'q)' deb so'rash funksiyasini qo'shing."
    }
  },
  {
    id: "level-2-expense-tracker",
    level: 2,
    levelName: "2-daraja: Asoslarni birlashtirish",
    title: "💰 Terminal Xarajatlar Qaydnomasi",
    badge: "Mantiq Ustasi",
    summary: "Funksiyalar, ro'yxatlar (list) va lug'atlar (dict) yordamida shaxsiy byudjetni boshqarish tizimi.",
    flow: {
      goal: "Foydalanuvchining kundalik xarajatlarini (nomi, miqdori, toifasi) ro'yxatga oluvchi va umumiy xarajatni hisoblovchi toza modulli terminal dasturini tuzish.",
      prerequisites: ["Funksiyalar (def, return)", "Ro'yxatlar va lug'atlar", "while menyu sikli", "String formatlash"],
      requirements: [
        "1. Xarajat qo'shish (nom, summa, toifa).",
        "2. Barcha xarajatlarni chiroyli jadval ko'rinishida ko'rish.",
        "3. Jami sarflangan summani hisoblash.",
        "4. Eng katta xarajatni aniqlash.",
        "5. Dasturdan chiqish."
      ],
      steps: [
        "1-qadam: xarajatlar = [] bo'sh ro'yxatini e'lon qilish.",
        "2-qadam: xarajat_qosh(nom, summa, toifa) funksiyasini yozish.",
        "3-qadam: xarajatlarni_korsat() funksiyasini tuzish.",
        "4-qadam: jami_hisobla() funksiyasini yozish.",
        "5-qadam: Foydalanuvchi menyusi uchun while True tsiklini boshqarish."
      ],
      acceptanceCriteria: [
        "Kod kamida 3 ta alohida funksiyaga ajratilgan bo'lishi kerak.",
        "Har bir xarajat kamida {'nom': ..., 'summa': ..., 'toifa': ...} shaklida lug'at sifatida saqlansin.",
        "Manfiy son kiritilganda dastur ogohlantirish bersin."
      ],
      independentWork: `# 2-daraja mustaqil loyihasi
xarajatlar = []

def xarajat_qosh(nom, summa, toifa="umumiy"):
    pass

def jami_sarf():
    pass
`,
      testCases: [
        { type: "Oddiy holat", input: "Tushlik, 35000, Ovqat", expected: "Muvaffaqiyatli qo'shildi, jami: 35000" },
        { type: "Noto'g'ri summa", input: "-10000 yoki harf", expected: "'Musbat raqam kiriting' xabari chiqishi kerak." },
        { type: "Bo'sh ro'yxat", input: "Xarajat bo'lmaganda jami ko'rish", expected: "'Hozircha xarajatlar mavjud emas' deb chiqarsin." }
      ],
      aiTeacherHelp: {
        step1: "Tushunish: Xarajatlarni faqat ro'yxatga append qilsak yetarlimi yoki har birini lug'at qilib saqlash qulayroqmi?",
        step2: "Maslahat: Jami summani hisoblash uchun 'sum(x['summa'] for x in xarajatlar)' ifodasidan yoki oddiy for siklidan foydalanishingiz mumkin.",
        step3: "O'xshash mashq: 3 ta sonli lug'atlar ro'yxatidagi ma'lum kalit yig'indisini hisoblab ko'ring."
      },
      codeReview: "Har bir funksiyaning vazifasi bittami? Takrorlanuvchi print yoki input kodlari bormi?",
      refactorPhase: "Kodni tozalang: Toifalar (masalan: 'ovqat', 'transport', 'kitob') bo'yicha guruhlab ko'rsatish funksiyasini qo'shing.",
      presentation: "Dasturingiz qanday qilib foydalanuvchi xato kiritishidan himoyalanganini tushuntirib bering.",
      extension: "Kuchli o'quvchilar uchun: Xarajatlarni o'chirish yoki tahrirlash imkoniyatini qo'shing."
    }
  },
  {
    id: "level-3-json-bookstore",
    level: 3,
    levelName: "3-daraja: Fayllar va tartibli kod",
    title: "📁 JSON Saqlovchili Kutubxona Katalogi",
    badge: "Fayl Muhandisi",
    summary: "Ma'lumotlar yo'qolib ketmasligi uchun JSON faylda saqlovchi, xatolarni try-except bilan boshqaruvchi dastur.",
    flow: {
      goal: "Dastur yopilib qayta yoqilganda ham saqlanib qoladigan, kitoblar (ID, nom, muallif, yil) boshqaruv tizimini yaratish.",
      prerequisites: ["with open() fayl operatsiyalari", "json moduli (loads, dumps)", "try-except xatolar boshqaruvi", "Modullarga ajratish"],
      requirements: [
        "books.json fayliga yozish va undan o'qish.",
        "Fayl yo'q bo'lsa (FileNotFoundError) avtomatik yangi bo'sh fayl yaratish.",
        "Kitob qidirish (nomi yoki muallifi bo'yicha filtr).",
        "Kitob o'chirish va yangilash.",
        "Har bir asosiy funksiyaga assert yoki unit test yozish."
      ],
      steps: [
        "1-qadam: storage.py faylida yuklash (load) va saqlash (save) funksiyalarini yozish.",
        "2-qadam: kitob_qoshish va kitob_topish mantiqini ishlab chiqish.",
        "3-qadam: JSON Decode xatolarini xavfsiz boshqarish.",
        "4-qadam: main.py da menyuni ishga tushirish.",
        "5-qadam: README.md va test_books.py faylini yozish."
      ],
      acceptanceCriteria: [
        "Dastur qayta yoqilganda eski kiritilgan kitoblar saqlanib qolishi shart.",
        "Fayl buzilgan holatda ham dastur birdan qulab tushmasligi, ogohlantirish berishi lozim."
      ],
      independentWork: `# 3-daraja
import json

FAYL_NOMI = "kitoblar.json"

def kitoblarni_oqish():
    # FileNotFoundError ni ushlang
    pass
`,
      testCases: [
        { type: "Fayl mavjud emas", input: "Birinchi marta ishga tushirish", expected: "Yangi kitoblar.json yaratiladi." },
        { type: "Qidiruv", input: "'Navoiy'", expected: "Muallifi Navoiy bo'lgan barcha kitoblar chiqadi." }
      ],
      aiTeacherHelp: {
        step1: "Tushunish: Nega fayllar bilan ishlaganda oddiy 'open' emas, aynan 'with open' ishlatiladi?",
        step2: "Maslahat: json.dump(data, file, indent=4) kodi faylni odam o'qiy oladigan chiroyli formatda saqlaydi.",
        step3: "O'xshash mashq: Oddiy lug'atni json.dumps orqali matnga va json.loads orqali yana lug'atga o'giring."
      },
      codeReview: "Fayl ochiq qolib ketmaganmi? Xatolar to'g'ri 'except' bilan tutildimi?",
      refactorPhase: "Kodni alohida modullarga (storage.py va ui.py) ajrating.",
      presentation: "README.md faylingizda loyihani ishga tushirish yo'riqnomasini ko'rsating.",
      extension: "Qo'shimcha: Kitoblarni CSV formatida eksport qilish imkoniyatini yarating."
    }
  },
  {
    id: "level-4-oop-warehouse",
    level: 4,
    levelName: "4-daraja: OOP va real dastur tuzilmasi",
    title: "🏛️ Ombor va Buyurtmalar Boshqaruv Tizimi",
    badge: "OOP Arxitektori",
    summary: "Class, obyektlar, kompozitsiya, inkapsulyatsiya va maxsus metodlar (__str__, __len__) yordamida real biznes modelini yaratish.",
    flow: {
      goal: "Mahsulotlar (Product), Mijozlar (Customer) va Buyurtmalar (Order) klasslari orqali professional OOP dasturi tuzish.",
      prerequisites: ["Klasslar va obyektlar (class, __init__)", "Kompozitsiya (bir klass ichida boshqa klass)", "Typing va docstringlar", "Logging tizimi"],
      requirements: [
        "Product klassi: nomi, narxi, qoldiq miqdori (stock).",
        "Order klassi: mijoz, mahsulotlar ro'yxati, jami summa hisoblash.",
        "Qoldiq yetarli bo'lmaganda 'OutOfStockError' nomli maxsus xato (custom exception) chiqarish.",
        "Klasslarga typing (masalan: def add_product(self, p: Product) -> bool) qo'llash."
      ],
      steps: [
        "1-qadam: Product modelini yaratish va unga narxni tekshiruvchi getter/setter qo'yish.",
        "2-qadam: Customer modelini yaratish.",
        "3-qadam: Order klassini yaratish va mahsulot qo'shishda qoldiqni kamaytirish.",
        "4-qadam: Logging orqali har bir operatsiyani konsolga qayd etish."
      ],
      acceptanceCriteria: [
        "Merosxo'rlik (Inheritance) keraksiz joyda ishlatilmasin, kompozitsiya asosiy o'rinda bo'lsin.",
        "Har bir klass o'z ma'suliyatiga ega bo'lsin (Single Responsibility).",
        "Barcha metodlar tur ko'rsatgichlari (type hints) bilan ta'minlansin."
      ],
      independentWork: `class Mahsulot:
    def __init__(self, nom: str, narx: float, miqdor: int):
        self.nom = nom
        self.narx = narx
        self.miqdor = miqdor
`,
      testCases: [
        { type: "Muvaffaqiyatli buyurtma", input: "Mahsulot narxi 100, miqdor 2", expected: "Buyurtma yaratiladi, ombordagi miqdor 2 taga kamayadi." },
        { type: "Qoldiq yetmasligi", input: "Omborda 1 ta bor, buyurtma 5 ta", expected: "OutOfStockError xatosi qaytariladi." }
      ],
      aiTeacherHelp: {
        step1: "Tushunish: Nima uchun Buyurtma Mahsulotning bolasi (inheritance) emas, balki uni o'z ichiga oluvchi (composition) bo'lishi kerak?",
        step2: "Maslahat: Mahsulot narxini manfiy kiritishdan himoyalash uchun @property dekoratoridan foydalaning.",
        step3: "O'xshash mashq: Oddiy BankAccount klassi va pul yechishda balans yetmaslik xatosini yarating."
      },
      codeReview: "Klasslar o'rtasida haddan tashqari bog'liqlik (tight coupling) yo'qmi?",
      refactorPhase: "Chegirma (Discount) tizimini Strategy andozasi orqali qo'shing.",
      presentation: "Nima uchun ushbu klass tuzilmasini tanlaganingizni arxitektura diagrammasi bilan tushuntiring.",
      extension: "Kuchli o'quvchilar uchun: Barcha buyurtmalarni SQLite bazasiga saqlovchi qatlam qo'shing."
    }
  },
  {
    id: "level-5-fastapi-database",
    level: 5,
    levelName: "5-daraja: Ma’lumotlar bazasi va API",
    title: "⚡ SQLite va REST API Vazifalar Xizmati",
    badge: "Backend Muhandisi",
    summary: "Ma'lumotlar bazasi (SQL / SQLite), HTTP so'rovlar, autentifikatsiya va xavfsiz REST API yaratish.",
    flow: {
      goal: "Foydalanuvchilar o'z vazifalarini yaratishi, o'qishi, yangilashi va o'chirishi mumkin bo'lgan to'liq RESTful backend API qurish.",
      prerequisites: ["SQL asoslari (CREATE, SELECT, INSERT, UPDATE)", "HTTP protokoli (GET, POST, PUT, DELETE, Status kodlar)", "FastAPI yoki Flask asoslari", "Parollarni xesh qilish (bcrypt)"],
      requirements: [
        "Foydalanuvchi ro'yxatdan o'tishi va tizimga kirishi (JWT token bilan).",
        "Parollar ochiq matnda saqlanmasin (faqat xesh shaklida).",
        "SQLite ma'lumotlar bazasi bilan xavfsiz ishlash (SQL injection dan himoya).",
        "Input validatsiyasi (masalan, Pydantic orqali).",
        "Barcha endpointlar uchun Swagger / OpenAPI hujjatlari bo'lishi."
      ],
      steps: [
        "1-qadam: Ma'lumotlar bazasi jadvallarini loyihalash (users va todos).",
        "2-qadam: Parollarni xeshlovchi va tekshiruvchi xavfsizlik modulini yozish.",
        "3-qadam: CRUD API yo'llarini (routes) yaratish.",
        "4-qadam: Token orqali himoyalangan yo'llarni tekshirish.",
        "5-qadam: pytest bilan API testlarini yozish."
      ],
      acceptanceCriteria: [
        "Hech bir parol bazada ochiq qolmasligi shart.",
        "Foydalanuvchi faqat o'ziga tegishli vazifalarni ko'rishi va tahrirlashi mumkin.",
        "Noto'g'ri so'rovlarga to'g'ri HTTP kodlari (400, 401, 404, 422) qaytishi lozim."
      ],
      independentWork: `# SQLite bazasiga ulanish
import sqlite3

def ulanish_ol():
    conn = sqlite3.connect("database.db")
    return conn
`,
      testCases: [
        { type: "Ro'yxatdan o'tish", input: "user: test, pass: 123456", expected: "201 Created va foydalanuvchi ID si qaytadi." },
        { type: "Birovning vazifasiga kirish", input: "Boshqa foydalanuvchi ID si bilan GET", expected: "403 Forbidden yoki 404 Not Found." }
      ],
      aiTeacherHelp: {
        step1: "Tushunish: SQL Injection nima va nima uchun SQL so'roviga matnni to'g'ridan-to'g'ri formatlab (+) qo'shish qat'iyan taqiqlanadi?",
        step2: "Maslahat: Har doim parametrli so'rovlardan (cursor.execute('SELECT * FROM users WHERE id = ?', (user_id,))) foydalaning.",
        step3: "O'xshash mashq: SQLite da bitta jadval yaratib, unga xavfsiz INSERT qilishni sinab ko'ring."
      },
      codeReview: "Maxfiy sozlamalar (SECRET_KEY) .env faylga chiqarilganmi?",
      refactorPhase: "Ma'lumotlar bazasi migratsiyalari uchun Alembic vositasini joriy qiling.",
      presentation: "API'ning Swagger UI interfeysi orqali ishlashini namoyish qiling.",
      extension: "Qo'shimcha: Docker konteyneriga o'rab, bulutga (Cloud Run / Render) joylashga tayyorlang."
    }
  },
  {
    id: "level-6-production-pipeline",
    level: 6,
    levelName: "6-daraja: Ilg‘or va production’ga yaqin loyihalar",
    title: "🚀 Asinxron Background Bildirishnoma va Ma'lumotlar Pipeline'i",
    badge: "Katta Muhandis (Staff Eng)",
    summary: "Asyncio, background tasklar, kesh (Redis), metrikalar monitoringi va production standartidagi kod arxitekturasi.",
    flow: {
      goal: "Katta hajmdagi ma'lumotlarni asinxron qayta ishlovchi, xatolarga chidamli, tezkor kesh va log tizimiga ega servis qurish.",
      prerequisites: ["async / await va asyncio", "Concurrency vs Parallelism tushunchalari", "Profiling va xotira optimizatsiyasi", "CI/CD va avtomatlashtirish"],
      requirements: [
        "Katta CSV fayllarni qismlarga (chunks) bo'lib xotirani to'ldirmasdan asinxron qayta ishlash.",
        "Qayta-qayta chaqiriladigan ma'lumotlarni keshda saqlash.",
        "Har bir jarayonning ishlash vaqtini va xotirasini profil qilish (cProfile yoki tracemalloc).",
        "To'liq avtomatik GitHub Actions CI testi va lint tekshiruvi."
      ],
      steps: [
        "1-qadam: Asinxron ma'lumot o'quvchi pipeline generatorini tuzish.",
        "2-qadam: Rate limiting va xavfsiz navbat (queue) mexanizmini qo'yish.",
        "3-qadam: Tizim metrikalarini (latency, throughput) yig'ish.",
        "4-qadam: Dockerfile va pyproject.toml ni professional darajada tayyorlash."
      ],
      acceptanceCriteria: [
        "100,000 qatorli fayl xotirada 50MB dan ortiq joy egallamasdan oqim (stream) sifatida ishlanishi shart.",
        "Barcha asinxron tasklar xatolik yuz berganda xavfsiz yopilishi (graceful shutdown) kerak."
      ],
      independentWork: `# Asinxron pipeline boshlang'ich kodi
import asyncio

async def ma'lumot_qayta_ishla(chunk):
    await asyncio.sleep(0.01)
    return len(chunk)
`,
      testCases: [
        { type: "Yuklama ostida ishlash", input: "100 ta parallel so'rov", expected: "Hech qanday bloklanishsiz o'rtacha 50ms da yakunlanadi." },
        { type: "Server to'xtaganda (SIGINT)", expected: "Barcha chala qolgan tasklar bazaga yozilib, keyin to'xtaydi." }
      ],
      aiTeacherHelp: {
        step1: "Tushunish: CPU-bound va I/O-bound vazifalar orasidagi farq nima va asyncio qaysi birida eng katta yutuq beradi?",
        step2: "Maslahat: Katta fayllarni o'qiyotganda butun faylni xotiraga yuklamasdan 'line by line' generator ishlatish xotirani tejaydi.",
        step3: "O'xshash mashq: asyncio.gather orqali 3 ta parallel simulyatsiya vazifasini ishga tushiring."
      },
      codeReview: "Resurslar oqishi (memory leak) xavfi bormi? Xavfsizlik bo'yicha OWASP talablariga muvofiqmi?",
      refactorPhase: "Kesh muddati (TTL) tugashini avtomatik boshqaruvchi fon xizmati qo'shing.",
      presentation: "Profiling grafiklari orqali dastur qanchalik tezlashganini dalillar bilan ko'rsatib bering.",
      extension: "Kubernetes yoki Cloud Run uchun production health-check probe (/healthz) endpointlarini qo'shing."
    }
  }
];
