// 12 ta tizimlashtirilgan darslar — barcha darslarda to'liq interaktiv topshiriqlar
export const LESSONS = [
  {
    id: 1,
    title: "1. print() va matn",
    slug: "print-and-strings",
    icon: "💬",
    xp: 50,
    estimatedMinutes: 10,
    summary: "Dasturlash olamiga birinchi qadam: ekranga matn chiqarish va print() funksiyasi sirlari.",
    content: {
      goal: "Kompyuterga o'zingiz xohlagan matn va xabarlarni ekranga chiqarishni o'rgatish hamda print() funksiyasining ishlash qoidasini tushunish.",
      explanation: `Dasturlashda kompyuter bilan muloqot qilishning eng oddiy usuli — bu ma'lumotni ekranga chiqarishdir.

Pythonda bu vazifani print() maxsus buyrug'i (funksiyasi) bajaradi.

Asosiy qoidalar:
1. Harflar registri: Pythonda har doim kichik harflar bilan print deb yoziladi. Print yoki PRINT deb yozsangiz, NameError beradi.
2. Qavslar: Funksiya nomidan so'ng ( va ) qavslar qo'yiladi.
3. Matn (String): Ekranga chiqarmoqchi bo'lgan har qanday matn "..." yoki '...' ichiga olinadi.`,
      workingExample: `# Bu ishlaydigan misol:
print("Salom, O'zbekiston!")
print('Python o\\'rganish juda qiziqarli!')
print("Bugun yangi bilim egallaymiz.")`,
      stepByStepExercise: {
        instruction: "Muharrirda print() funksiyasidan foydalanib, ekranga \"Salom, Dunyo!\" matnini chiqaruvchi kod yozing va 'Kodni ishga tushirish' tugmasini bosing.",
        starterCode: `# 1-topshiriq: Ekranga "Salom, Dunyo!" matnini chiqaruvchi kod yozing:
# (Maslahat: print() funksiyasidan foydalaning va matnni qo'shtirnoqqa oling)


`,
        validator: (output) => output.includes("Salom, Dunyo!"),
        hint: "Qo'shtirnoq ichidagi 'Salom, Dunyo!' matni katta-kichik harflar va vergul bilan birga to'g'ri yozilishi kerak."
      },
      independentTask: {
        title: "Mustaqil topshiriq: O'zingizni tanishtiring",
        instruction: `Quyidagi shartlarni bajaring:
1. Birinchi qatorda o'z ismingizni chiqaring.
2. Ikkinchi qatorda o'rganayotgan maqsadingizni chiqaring.
3. Dastur kamida 2 qatordan iborat bo'lsin.`,
        starterCode: `# 1-qator: ismingiz
# 2-qator: maqsadingiz
`,
        criteria: [
          "Kamida ikkita print() funksiyasi ishlatilgan bo'lishi kerak.",
          "Matnlar qo'shtirnoq ichida yozilishi shart.",
          "Ekranga kamida 2 qator natija chiqishi kerak."
        ],
        validator: (code, output) => {
          const printCount = (code.match(/print\s*\(/g) || []).length;
          const outputLines = output.trim().split('\n').filter(l => l.trim().length > 0);
          return printCount >= 2 && outputLines.length >= 2;
        },
        errorHelp: [
          "Agar 'SyntaxError' chiqsa: qo'shtirnoq yoki qavslarni yopishni unutmadingizmi?",
          "Agar 'NameError' chiqsa: 'print' so'zini kichik harflar bilan yozganingizni tekshiring."
        ]
      }
    }
  },
  {
    id: 2,
    title: "2. O'zgaruvchilar va ma'lumot turlari",
    slug: "variables-and-data-types",
    icon: "📦",
    xp: 60,
    estimatedMinutes: 15,
    summary: "Ma'lumotlarni xotirada saqlash: int, float, str va bool turlari bilan ishlash.",
    content: {
      goal: "O'zgaruvchilarga nom berish, qiymat yuklash va ma'lumot turlarini tushunish.",
      explanation: `O'zgaruvchi — kompyuter xotirasidagi ma'lumot saqlanadigan qutichaga o'xshaydi.

Pythonda o'zgaruvchi e'lon qilish uchun nom yoziladi va = belgisi bilan qiymat beriladi:
  ism = "Ali"
  yosh = 20

Asosiy ma'lumot turlari:
- str (matn): "Salom", 'Python'
- int (butun son): 5, -100, 0
- float (o'nlik kasr): 3.14, -0.5
- bool (mantiqiy): True, False

type() funksiyasi bilan turini aniqlash mumkin: type(42) → int`,
      workingExample: `ism = "Ali"
yosh = 20
ortacha_baho = 4.8
talaba = True

print(ism, "yoshi:", yosh)
print("Bahosi:", ortacha_baho)
print("Talabami?", talaba)
print("Tur:", type(yosh))`,
      stepByStepExercise: {
        instruction: "'ism' va 'yosh' o'zgaruvchilarini yarating, ularga o'z ismingiz va yoshingizni bering hamda print() orqali ekranga chiqaring.",
        starterCode: `# Topshiriq:
# 1. 'ism' o'zgaruvchisiga o'z ismingizni bering (matn - str)
# 2. 'yosh' o'zgaruvchisiga yoshingizni bering (butun son - int)
# 3. print(ism, yosh) orqali ularni ekranga chiqaring:


`,
        validator: (output) => output.trim().length >= 3 && !output.includes("Error"),
        hint: "Matnlarni qo'shtirnoq ichida (masalan: ism = \"Ali\"), sonlarni esa qo'shtirnoqsiz (yosh = 20) yozing."
      },
      independentTask: {
        title: "Mustaqil topshiriq: Shaxsiy ID karta",
        instruction: `4 ta o'zgaruvchi yarating:
1. ism — o'z ismingiz (str)
2. yosh — yoshingiz (int)
3. shahar — yashayotgan shahringiz (str)
4. talaba — talabamisiz? (True yoki False)

Keyin ularning barchasini chiqaring va har birining turini type() bilan ko'rsating.`,
        starterCode: `# 4 ta o'zgaruvchi yarating
ism = ""
yosh = 0
shahar = ""
talaba = True

# Qiymatlarni chiqaring
`,
        criteria: [
          "Kamida 4 ta o'zgaruvchi e'lon qilinishi kerak.",
          "str, int va bool turlaridan foydalanilishi shart.",
          "type() funksiyasi kamida bir marta ishlatilishi kerak."
        ],
        validator: (code, output) => {
          const hasStr = code.includes("str") || code.match(/=\s*["']/) !== null;
          const hasInt = code.match(/=\s*\d+/) !== null;
          const hasBool = code.includes("True") || code.includes("False");
          const hasType = code.includes("type(");
          const outputLines = output.trim().split('\n').filter(l => l.trim().length > 0);
          return outputLines.length >= 3 && hasType && hasBool;
        },
        errorHelp: [
          "bool turi uchun True yoki False deb yozing (katta harf bilan!)",
          "f-string ishlatish uchun: print(f\"Ismim: {ism}\")"
        ]
      }
    }
  },
  {
    id: 3,
    title: "3. Foydalanuvchidan ma'lumot olish",
    slug: "input-function",
    icon: "⌨️",
    xp: 60,
    estimatedMinutes: 15,
    summary: "Dasturni interaktiv qilish: o'zgaruvchiga oldindan qiymat berib input() ni simulyatsiya qilish.",
    content: {
      goal: "Dasturni jonlantirish: foydalanuvchi ma'lumotini qabul qilish va qayta ishlash.",
      explanation: `input() funksiyasi foydalanuvchidan klaviatura orqali ma'lumot so'raydi va uni har doim str (matn) ko'rinishida qaytaradi.

Muhim eslatma (brauzer uchun):
Brauzerda input() to'g'ridan-to'g'ri ishlatilmaydi. Shuning uchun biz qiymatni o'zgaruvchiga oldindan beramiz — bu real dasturda input() qiladigan ishni simulyatsiya qiladi:

  # Real dastur:
  ism = input("Ismingiz: ")

  # Brauzer simulyatsiyasi:
  ism = "Anvar"  ← qiymatni o'zingiz belgilaysiz

Agar son kerak bo'lsa, int() bilan aylantirasiz:
  yosh_matn = "25"
  yosh = int(yosh_matn)`,
      workingExample: `# input() simulyatsiyasi:
foydalanuvchi_ismi = "Sardor"   # <- bu yerga o'z ismingizni yozing
shahar = "Samarqand"

print("Xush kelibsiz,", foydalanuvchi_ismi)
print("Siz", shahar, "shahridan ekansiz!")

# Songa aylantirish:
yosh_matn = "21"
yosh = int(yosh_matn)
print("Yoshingiz:", yosh, "— bu", type(yosh))`,
      stepByStepExercise: {
        instruction: "O'zgaruvchilarga qiymat bering, matn shaklidagi yoshni int() bilan butun songa aylantiring va natijani ekranga chiqaring.",
        starterCode: `# Topshiriq:
# 1. 'foydalanuvchi_ismi' o'zgaruvchisiga o'z ismingizni bering
# 2. 'yosh_matn' o'zgaruvchisiga yoshingizni matn ko'rinishida yozing (masalan: "20")
# 3. 'yosh' o'zgaruvchisida uni int(yosh_matn) yordamida butun songa aylantiring
# 4. print() orqali ism va yoshni ekranga chiqaring:


`,
        validator: (output) => output.trim().length >= 3 && !output.includes("Error"),
        hint: "int() funksiyasi matnni butun songa aylantiradi: yosh = int(yosh_matn)"
      },
      independentTask: {
        title: "Mustaqil topshiriq: Kichik anket",
        instruction: `Uchta o'zgaruvchiga qiymat bering va natijani chizilgan gapda chiqaring:
1. ism — o'z ismingiz
2. yosh — yoshingiz (int ga aylantirib)  
3. kasb — orzuingizda bo'lgan kasb

Chiqish: "Mening ismim [ism], men [yosh] yoshdaman va [kasb] bo'lishni rejalashtirmoqdaman."`,
        starterCode: `ism = "Ali"
yosh_matn = "20"
kasb = "dasturchi"

# Matnni songa aylantiring
yosh = int(yosh_matn)

# Quyidagi print ni to'ldiring:
print(f"Mening ismim ...")
`,
        criteria: [
          "3 ta o'zgaruvchi ishlatilishi kerak.",
          "int() orqali songa aylantirish bo'lishi kerak.",
          "Chiqish bitta matnli gapdan iborat bo'lsin."
        ],
        validator: (code, output) => {
          return code.includes("int(") && output.includes("ismim") && output.trim().length > 20;
        },
        errorHelp: [
          "f-string: print(f\"...{ism}...{yosh}...\")",
          "int('20') → 20 (butun son)"
        ]
      }
    }
  },
  {
    id: 4,
    title: "4. Sonlar va hisob-kitoblar",
    slug: "numbers-and-math",
    icon: "🔢",
    xp: 70,
    estimatedMinutes: 20,
    summary: "Arifmetik amallar: qo'shish, ayirish, ko'paytirish, bo'lish va qoldiq.",
    content: {
      goal: "Matematik amallarni bajarish va kalkulyator mantiqini yaratish.",
      explanation: `Pythonda asosiy matematik amallar:
  +   qo'shish       5 + 3 = 8
  -   ayirish        10 - 4 = 6
  *   ko'paytirish   3 * 7 = 21
  /   bo'lish        9 / 2 = 4.5  (har doim float)
  //  butun bo'lish  9 // 2 = 4   (qoldiqsiz)
  %   qoldiq         9 % 2 = 1
  **  daraja         2 ** 8 = 256

Amallar tartibi: () > ** > * / // % > + -
round(son, kasrlar) — yaxlitlash`,
      workingExample: `a = 15
b = 4
print("Yig'indi:", a + b)
print("Bo'linma:", a / b)
print("Butun bo'linma:", a // b)
print("Qoldiq:", a % b)
print("Daraja:", a ** 2)
print("Yaxlitlangan:", round(a / b, 2))`,
      stepByStepExercise: {
        instruction: "narx va miqdor berilgan. Ularning ko'paytmasini (*) jami o'zgaruvchisiga hisoblang va ekranga chiqaring.",
        starterCode: `narx = 30000
miqdor = 4

# Topshiriq:
# 1. 'jami' o'zgaruvchisida narxni miqdorga ko'paytiring (*)
# 2. print("Jami to'lov:", jami, "so'm") deb ekranga chiqaring:


`,
        validator: (output) => (output.includes("120000") || (output.length > 0 && /\d{4,}/.test(output))) && !output.includes("Error"),
        hint: "Ko'paytirish uchun yulduzcha (*) belgisidan foydalaning: jami = narx * miqdor"
      },
      independentTask: {
        title: "Mustaqil topshiriq: BMI kalkulyator",
        instruction: `BMI (tana massasi indeksi) = vazn / (bo'y * bo'y)

1. vazn = siz tanlagan og'irlik (kg, masalan 70)
2. boy = siz tanlagan bo'y (metr, masalan 1.75)
3. BMI ni hisoblang va chiqaring
4. BMI ni round() bilan 2 kasrgacha yaxlitlang`,
        starterCode: `vazn = 70    # kg
boy = 1.75   # metr

# BMI ni hisoblang
bmi = 0  # <-- formulani yozing

print(f"Vazn: {vazn} kg, Bo'y: {boy} m")
print(f"BMI: {round(bmi, 2)}")`,
        criteria: [
          "** yoki ko'paytirish operatoridan foydalanilishi kerak.",
          "round() bilan yaxlitlash bo'lishi kerak.",
          "Natija 10 dan katta, 100 dan kichik bo'lishi kerak."
        ],
        validator: (code, output) => {
          return (code.includes("**") || code.includes("* boy")) && code.includes("round(") && output.includes("BMI:");
        },
        errorHelp: [
          "BMI formulasi: vazn / (boy ** 2)",
          "round(son, 2) — 2 ta kasr raqam bilan yaxlitlash"
        ]
      }
    }
  },
  {
    id: 5,
    title: "5. Shartlar: if, elif, else",
    slug: "conditionals-if-else",
    icon: "🔀",
    xp: 80,
    estimatedMinutes: 20,
    summary: "Dasturga qaror qabul qilishni o'rgatish: if, elif, else va taqqoslash operatorlari.",
    content: {
      goal: "Mantiqiy shartlar yordamida dastur yo'nalishini boshqarish.",
      explanation: `if-elif-else bloklari dasturga qaror qabul qildiradi:

  if shart:       ← agar shart True bo'lsa
      kod1
  elif boshqa_shart:  ← yoki bu shart True bo'lsa
      kod2
  else:           ← aks holda
      kod3

Taqqoslash operatorlari:
  ==  teng       !=  teng emas
  >   katta      <   kichik
  >=  katta yoki teng   <=  kichik yoki teng

Muhim: blok ichidagi kod 4 bo'shliq bilan surilishi shart!`,
      workingExample: `ball = 85

if ball >= 90:
    print("A'lo baho! 🏆")
elif ball >= 75:
    print("Yaxshi baho! ✅")
elif ball >= 55:
    print("O'rtacha baho 📚")
else:
    print("Ko'proq o'qish kerak 📖")

print("Ball:", ball)`,
      stepByStepExercise: {
        instruction: "yosh o'zgaruvchisi berilgan. if va else yordamida: agar yosh >= 18 bo'lsa 'Xush kelibsiz!', aks holda 'Ruxsat yo'q' deb chiqaruvchi shart yozing.",
        starterCode: `yosh = 20

# Topshiriq: if va else yordamida tekshiring:
# Agar yosh >= 18 bo'lsa: "Xush kelibsiz!" deb chiqarsin
# Aks holda: "Ruxsat yo'q" deb chiqarsin


`,
        validator: (output) => (output.includes("Xush") || output.includes("Ruxsat") || output.includes("ruxsat")) && !output.includes("Error"),
        hint: "if shart: keyin surilgan qatorda print(...) yozing, so'ng else: blokini qo'shing."
      },
      independentTask: {
        title: "Mustaqil topshiriq: Harorat tavsiflovchi",
        instruction: `harorat o'zgaruvchisiga qiymat bering va quyidagi shartlarga qarab tavsif bering:
- 35 dan ortiq → "Juda issiq! 🥵"
- 25–35 → "Iliq havo 🌤️"  
- 15–24 → "Salqin 🌥️"
- 0–14 → "Sovuq! 🧥"
- 0 dan past → "Qattiq sovuq! ❄️"`,
        starterCode: `harorat = 28  # bu yerga turli qiymatlar bering

# if-elif-else zanjirini yozing
`,
        criteria: [
          "Kamida 4 ta shart (if/elif/else) bo'lishi kerak.",
          "Barcha harorat oraliqlarini qamrab olish kerak.",
          "Chiqish matni mavjud bo'lishi kerak."
        ],
        validator: (code, output) => {
          const elifCount = (code.match(/elif/g) || []).length;
          return elifCount >= 2 && output.trim().length > 5;
        },
        errorHelp: [
          "elif dan keyin ikki nuqta (:) qo'yishni unutmang",
          "Bloklar ichida bir xil miqdorda bo'shliq bo'lishi kerak"
        ]
      }
    }
  },
  {
    id: 6,
    title: "6. Mantiqiy qiymatlar va taqqoslash",
    slug: "booleans-and-operators",
    icon: "⚖️",
    xp: 70,
    estimatedMinutes: 15,
    summary: "True/False qiymatlar, and/or/not operatorlari va murakkab shartlar.",
    content: {
      goal: "Murakkab shartli ifodalarni tuzish va mantiqiy operatorlarni qo'llash.",
      explanation: `Mantiqiy (bool) qiymatlar: True (rost) yoki False (yolg'on).

Mantiqiy operatorlar:
  and  — ikkalasi ham True bo'lsa True:  True and True → True
  or   — bittasi True bo'lsa True:       True or False → True
  not  — teskarisi:                      not True → False

Amaliy jadval (and):
  True  and True  → True
  True  and False → False
  False and True  → False

not operatori:
  not True → False
  not False → True

Shartlarni birlashtirish:
  18 <= yosh <= 65   ← Python uchun bu to'g'ri yozuv!`,
      workingExample: `harorat = 25
yomgir = False
dam_olish_kuni = True

if harorat > 20 and not yomgir:
    print("Sayrga chiqish uchun ajoyib ob-havo! ☀️")

if dam_olish_kuni or harorat > 30:
    print("Dam olish uchun yaxshi kun!")

# Taqqoslashlar:
son = 42
print("Juftmi?", son % 2 == 0)
print("20 va 50 orasida?", 20 <= son <= 50)`,
      stepByStepExercise: {
        instruction: "login va parol_togri berilgan. if va 'and' operatori yordamida ikkalasi ham to'g'ri bo'lsa 'Tizimga kirdingiz!' deb chiqaruvchi kod yozing.",
        starterCode: `login = True
parol_togri = True

# Topshiriq: if va 'and' operatoridan foydalaning:
# Agar login va parol_togri ikkalasi ham True bo'lsa:
# "Tizimga kirdingiz!" deb ekranga chiqarsin:


`,
        validator: (output) => (output.includes("Tizimga") || output.includes("kirdingiz")) && !output.includes("Error"),
        hint: "and operatori: if login and parol_togri: deb yoziladi."
      },
      independentTask: {
        title: "Mustaqil topshiriq: Kredit tekshiruvi",
        instruction: `Bankdan kredit olish uchun quyidagi shartlar bajarilishi kerak:
- yosh kamida 21 bo'lsin
- ish_tajribasi kamida 1 yil bo'lsin
- oylik_daromad kamida 3,000,000 so'm bo'lsin

Uchta o'zgaruvchiga qiymat bering va AND operatori bilan shartlarni birlashtirib, "Kredit tasdiqlandi" yoki "Kredit rad etildi" deb chiqaring.`,
        starterCode: `yosh = 25
ish_tajribasi = 2   # yil
oylik_daromad = 5000000  # so'm

# Shartni tekshiring
`,
        criteria: [
          "and operatori ishlatilishi kerak.",
          "Uchta taqqoslash operatori bo'lishi kerak.",
          "'Kredit tasdiqlandi' yoki 'rad etildi' chiqishi kerak."
        ],
        validator: (code, output) => {
          return code.includes("and") && (output.includes("tasdiqlandi") || output.includes("rad"));
        },
        errorHelp: [
          "Uch shartni and bilan: if yosh >= 21 and tajriba >= 1 and daromad >= 3000000:"
        ]
      }
    }
  },
  {
    id: 7,
    title: "7. for va while sikllari",
    slug: "loops-for-and-while",
    icon: "🔄",
    xp: 90,
    estimatedMinutes: 25,
    summary: "Takrorlanuvchi amallarni avtomatlashtirish: for, range() va while sikllari.",
    content: {
      goal: "Bir xil kodni bir necha marta avtomatik takrorlash.",
      explanation: `Sikllar yordamida kodni qayta-qayta yozmasdan takrorlash mumkin.

for sikli — ma'lum miqdorda takrorlash:
  for i in range(5):   → 0,1,2,3,4
  for i in range(1,6): → 1,2,3,4,5
  for i in range(0,10,2): → 0,2,4,6,8 (qadam=2)

while sikli — shart bajarilguncha takrorlash:
  while son > 0:
      print(son)
      son -= 1

break — sikldan chiqish
continue — keyingi takrorlashga o'tish`,
      workingExample: `# for sikli:
print("--- for sikli ---")
for i in range(1, 6):
    print(f"{i}-qadam")

# while sikli:
print("--- while sikli ---")
hisob = 5
while hisob > 0:
    print(f"Orqaga hisob: {hisob}")
    hisob -= 1
print("Boshlandi! 🚀")`,
      stepByStepExercise: {
        instruction: "for sikli va range(1, 6) yordamida 1 dan 5 gacha sonlarni bittalab ekranga chiqaring.",
        starterCode: `# Topshiriq: for sikli va range(1, 6) yordamida 
# 1 dan 5 gacha sonlarni bittalab ekranga chiqaring:


`,
        validator: (output) => output.includes("1") && output.includes("5") && !output.includes("Error"),
        hint: "for i in range(1, 6): deb yozing va ichida print(i) qiling."
      },
      independentTask: {
        title: "Mustaqil topshiriq: Juft sonlar",
        instruction: `1 dan 20 gacha bo'lgan barcha JUFT sonlarni chiqaruvchi dastur yozing.
- for sikli va range() dan foydalaning
- Oxirida jami nechta juft son borligini chiqaring
- Faqat juft sonlarni chiqarish uchun % (modulo) dan foydalaning`,
        starterCode: `# 1 dan 20 gacha juft sonlar
hisob = 0

for i in range(1, 21):
    # agar i juft bo'lsa...
    pass  # bu qatorni o'zgartiring

print(f"Jami juft sonlar: {hisob} ta")`,
        criteria: [
          "range() ishlatilishi kerak.",
          "% (modulo) operatori yordamida juft tekshiruv bo'lishi kerak.",
          "10 ta juft son chiqishi kerak (2,4,6...20)."
        ],
        validator: (code, output) => {
          return code.includes("range(") && code.includes("%") && output.includes("2") && output.includes("20");
        },
        errorHelp: [
          "Juft son tekshiruvi: if i % 2 == 0: → qoldiq 0 bo'lsa juft",
          "Hisoblagich: hisob += 1  yoki hisob = hisob + 1"
        ]
      }
    }
  },
  {
    id: 8,
    title: "8. Ro'yxatlar va lug'atlar",
    slug: "lists-and-dicts",
    icon: "📚",
    xp: 90,
    estimatedMinutes: 25,
    summary: "Ko'p ma'lumotlar bilan ishlash: list (ro'yxatlar) va dict (kalit-qiymat lug'atlari).",
    content: {
      goal: "Ma'lumotlar to'plamini tartiblash va xotirada saqlash.",
      explanation: `Ro'yxat (list) — tartiblangan elementlar to'plami:
  mevalar = ["olma", "anor", "behi"]
  mevalar[0]    → "olma"   (indeks 0 dan boshlanadi!)
  mevalar[-1]   → "behi"   (oxirgi element)
  len(mevalar)  → 3

Muhim metodlar: .append(), .remove(), .pop(), sorted()

Lug'at (dict) — kalit:qiymat juftliklari:
  talaba = {"ism": "Ali", "yosh": 20, "ball": 95}
  talaba["ism"]  → "Ali"
  talaba.get("shahar", "Noma'lum")  → "Noma'lum"

Muhim metodlar: .keys(), .values(), .items()`,
      workingExample: `# Ro'yxat:
dasturlar = ['Python', 'JavaScript', 'SQL']
for til in dasturlar:
    print(f"O'rganilmoqda: {til}")
dasturlar.append("Rust")
print("Yangi ro'yxat:", dasturlar)

# Lug'at:
talaba = {"ism": "Malika", "kurs": 2, "ball": 95}
print(talaba["ism"], "— bahosi:", talaba["ball"])
for kalit, qiymat in talaba.items():
    print(f"  {kalit}: {qiymat}")`,
      stepByStepExercise: {
        instruction: "mevalar ro'yxatiga .append() yordamida 'anor' mevasini qo'shing va yangilangan ro'yxatni print(mevalar) deb chiqaring.",
        starterCode: `mevalar = ["olma", "banan"]

# Topshiriq:
# 1. mevalar ro'yxatiga .append() yordamida "anor" mevasini qo'shing
# 2. print(mevalar) deb ekranga chiqaring:


`,
        validator: (output) => output.includes("olma") && (output.includes("anor") || output.split(",").length >= 3) && !output.includes("Error"),
        hint: "mevalar.append(\"anor\") deb yoziladi."
      },
      independentTask: {
        title: "Mustaqil topshiriq: Talabalar registri",
        instruction: `Lug'atlar ro'yxatini yarating: kamida 3 ta talabaning ismi, yoshi va bahosini saqlang.
- Barcha talabalarni for sikli bilan chiqaring
- Eng yuqori baholi talabani aniqlang (max() yoki shart bilan)
- O'rtacha bahoni hisoblang`,
        starterCode: `talabalar = [
    {"ism": "Ali", "yosh": 20, "ball": 85},
    {"ism": "Vali", "yosh": 21, "ball": 92},
    {"ism": "Zulfiya", "yosh": 19, "ball": 78}
]

# Barchasini chiqaring
for talaba in talabalar:
    pass  # print qo'shing

# O'rtacha bahoni hisoblang
`,
        criteria: [
          "Kamida 3 ta lug'at bo'lishi kerak.",
          "for sikli bilan iteratsiya bo'lishi kerak.",
          "O'rtacha baho hisoblanishi kerak."
        ],
        validator: (code, output) => {
          return code.includes("for") && output.includes("Ali") && code.match(/\[.*\{/s) !== null;
        },
        errorHelp: [
          "Lug'at qiymatiga: talaba['ball'] yoki talaba[\"ball\"]",
          "O'rtacha: sum(t['ball'] for t in talabalar) / len(talabalar)"
        ]
      }
    }
  },
  {
    id: 9,
    title: "9. Funksiyalar, argumentlar va return",
    slug: "functions-and-return",
    icon: "⚙️",
    xp: 100,
    estimatedMinutes: 30,
    summary: "Kodni toza va qayta ishlatiladigan qilish: def, argumentlar, parametrlar va return qiymat.",
    content: {
      goal: "O'z funksiyangizni yaratish, parametrlarga qiymat uzatish va natijani qaytarish.",
      explanation: `Funksiya — ma'lum vazifani bajaradigan, qayta ishlatiladigan kod bloki.

def kalit so'zi bilan e'lon qilinadi:
  def funksiya_nomi(parametr1, parametr2):
      # kod
      return natija

return — funksiyadan natija qaytaradi.
Agar return yo'q bo'lsa, None qaytaradi.

Standart qiymatlar:
  def salom(ism="do'st"):   ← ism berilmasa "do'st" ishlatiladi

*args — istalgan miqdorda argument:
  def yigindi(*sonlar):
      return sum(sonlar)`,
      workingExample: `def kvadrat(son):
    return son * son

def bmi_hisoblash(vazn, boy):
    bmi = vazn / (boy ** 2)
    return round(bmi, 2)

def salomlash(ism="dunyo"):
    return f"Salom, {ism}!"

# Chaqirish:
print(kvadrat(6))
print(bmi_hisoblash(70, 1.75))
print(salomlash("Sardor"))
print(salomlash())  # standart qiymat`,
      stepByStepExercise: {
        instruction: "def yordamida kvadrat(son) funksiyasini yozing. U sonning kvadratini (son * son) return qilishi kerak.",
        starterCode: `# Topshiriq: 'kvadrat' funksiyasini yozing:
# Funksiya 'son' qabul qilib, uning kvadratini qaytarsin (return)

def kvadrat(son):
    # Bu yerga kodingizni yozing:
    pass

# Sinov:
print("4 ning kvadrati:", kvadrat(4))
`,
        validator: (output) => output.includes("16") && !output.includes("None") && !output.includes("Error"),
        hint: "def kvadrat(son): keyin surilgan qatorda return son * son deb yoziladi."
      },
      independentTask: {
        title: "Mustaqil topshiriq: Konvertatsiya kutubxonasi",
        instruction: `Quyidagi 3 ta funksiyani yozing:
1. km_dan_milga(km) — km ni milga aylantirsin (1 km = 0.621371 mil)
2. gradus_dan_fahrenheitga(c) — Selsiyni Farengeytga (F = C × 9/5 + 32)
3. kg_dan_funtga(kg) — kg ni funtga (1 kg = 2.20462 funt)

Har birini 3 xil qiymat bilan sinang.`,
        starterCode: `def km_dan_milga(km):
    # 1 km = 0.621371 mil
    pass

def gradus_dan_fahrenheitga(c):
    # F = C * 9/5 + 32
    pass

def kg_dan_funtga(kg):
    # 1 kg = 2.20462 funt
    pass

# Testlar:
print(km_dan_milga(10))
print(gradus_dan_fahrenheitga(100))
print(kg_dan_funtga(70))`,
        criteria: [
          "3 ta funksiya def bilan e'lon qilinishi kerak.",
          "Har birida return bo'lishi kerak.",
          "3 ta print() bilan natija chiqarilishi kerak."
        ],
        validator: (code, output) => {
          const defCount = (code.match(/^def\s+/gm) || []).length;
          const hasReturn = (code.match(/return/g) || []).length;
          const outputLines = output.trim().split('\n').filter(l => l.trim());
          return defCount >= 3 && hasReturn >= 3 && outputLines.length >= 3;
        },
        errorHelp: [
          "def funksiya_nomi(parametr): → keyingi qatorda return ...",
          "pass ni o'chirib, hisoblash kodini yozing"
        ]
      }
    }
  },
  {
    id: 10,
    title: "10. Xatolarni topish va tuzatish",
    slug: "debugging-and-exceptions",
    icon: "🐞",
    xp: 90,
    estimatedMinutes: 25,
    summary: "try-except bilan xatolarni xavfsiz boshqarish va debugging ko'nikmalari.",
    content: {
      goal: "Xatolardan qo'rqmasdan, ularni tahlil qilish va dastur qulab tushishining oldini olish.",
      explanation: `Python xatolari ikki turga bo'linadi:
1. SyntaxError — kod yozilayotganda (dastur umuman ishlamaydi)
2. Runtime Error — bajarilayotganda (masalan: nolga bo'lish)

try-except bloki:
  try:
      xavfli_kod()     ← bu xato berishi mumkin
  except ValueError:
      print("Noto'g'ri qiymat!")
  except ZeroDivisionError:
      print("Nolga bo'lish!")
  except Exception as e:  ← har qanday xatoni ushlash
      print(f"Xato: {e}")
  else:
      print("Xatosiz ishladi!")
  finally:
      print("Har doim bajariladi")`,
      workingExample: `def xavfsiz_bolish(a, b):
    try:
        natija = a / b
        return natija
    except ZeroDivisionError:
        return "Xato: nolga bo'lish mumkin emas!"

def son_kiriting(matn_son):
    try:
        return int(matn_son)
    except ValueError:
        return f"'{matn_son}' son emas!"

print(xavfsiz_bolish(10, 2))
print(xavfsiz_bolish(10, 0))
print(son_kiriting("42"))
print(son_kiriting("salom"))`,
      stepByStepExercise: {
        instruction: "xavfsiz_bolish(a, b) funksiyasiga try-except qo'shing: agar b nol bo'lsa ZeroDivisionError ni ushlab 'Nolga bo'lish mumkin emas!' deb qaytarsin.",
        starterCode: `def xavfsiz_bolish(a, b):
    # Topshiriq: try va except ZeroDivisionError blokini to'ldiring:
    try:
        return a / b
    except ZeroDivisionError:
        # xatolik matnini return qiling:
        pass

# Sinov:
print("10 / 2 =", xavfsiz_bolish(10, 2))
print("8 / 0 =", xavfsiz_bolish(8, 0))
`,
        validator: (output) => output.includes("5") && (output.includes("Nolga") || output.includes("mumkin emas")) && !output.includes("Error"),
        hint: "except ZeroDivisionError: bloki ichida return \"Nolga bo'lish mumkin emas!\" deb yozing."
      },
      independentTask: {
        title: "Mustaqil topshiriq: Xavfsiz kalkulyator",
        instruction: `4 ta amal bajaruvchi xavfsiz kalkulyator funksiyasini yozing:
- kalkulyator(a, amal, b) — "+" "-" "*" "/" amallarini bajarsin
- Nolga bo'linsa xato xabarini chiqarsin
- Noto'g'ri amal kiritilsa ham xato emas, tushuntirsin
- Barcha amallarni sinang`,
        starterCode: `def kalkulyator(a, amal, b):
    try:
        if amal == "+":
            return a + b
        # qolgan amallarni qo'shing
        else:
            return f"Noma'lum amal: {amal}"
    except ZeroDivisionError:
        return "Nolga bo'lish mumkin emas!"

print(kalkulyator(10, "+", 5))
print(kalkulyator(10, "/", 0))`,
        criteria: [
          "try-except ZeroDivisionError bo'lishi kerak.",
          "4 ta amal (+, -, *, /) bajarilishi kerak.",
          "Nolga bo'lish holatida xato xabari chiqishi kerak."
        ],
        validator: (code, output) => {
          return code.includes("try:") && code.includes("ZeroDivisionError") &&
                 output.includes("15") && (output.includes("Nolga") || output.includes("mumkin emas"));
        },
        errorHelp: [
          "elif amal == '-': return a - b",
          "ZeroDivisionError faqat '/' uchun chiqadi"
        ]
      }
    }
  },
  {
    id: 11,
    title: "11. Fayllar va kutubxonalar",
    slug: "files-and-libraries",
    icon: "📁",
    xp: 100,
    estimatedMinutes: 30,
    summary: "import bilan tayyor modullar: math, random, datetime; JSON bilan ishlash asoslari.",
    content: {
      goal: "Python ekotizimidagi tayyor qurollardan foydalanish va JSON formatida ma'lumot saqlash.",
      explanation: `import buyrug'i bilan tayyor modullarni yuklash:
  import math
  import random
  import json
  from datetime import datetime

math moduli:
  math.sqrt(16)    → 4.0
  math.pi          → 3.14159...
  math.floor(3.7)  → 3

random moduli:
  random.randint(1, 10)   → 1 va 10 orasida tasodifiy son
  random.choice(["a","b"])→ ro'yxatdan tasodifiy tanlov
  random.shuffle(ro'yxat) → aralashtirish

json moduli (faylsiz):
  import json
  data = {"ism": "Ali", "yosh": 20}
  matn = json.dumps(data)    → '{"ism": "Ali", "yosh": 20}'
  qayta = json.loads(matn)   → {'ism': 'Ali', 'yosh': 20}`,
      workingExample: `import math
import random
import json

# math:
print("Pi:", round(math.pi, 4))
print("Ildiz:", math.sqrt(144))

# random:
lucky = random.randint(1, 49)
print("Omadli son:", lucky)

# json:
foydalanuvchi = {"ism": "Dono", "xp": 250, "daraja": 3}
json_matn = json.dumps(foydalanuvchi, ensure_ascii=False)
print("JSON:", json_matn)
qayta = json.loads(json_matn)
print("Ism:", qayta["ism"])`,
      stepByStepExercise: {
        instruction: "math kutubxonasini import qiling va math.sqrt() yordamida 64 sonining kvadrat ildizini hisoblab ekranga chiqaring.",
        starterCode: `import math

# Topshiriq:
# math.sqrt() funksiyasidan foydalanib 64 ning kvadrat ildizini print() orqali chiqaring:


`,
        validator: (output) => output.includes("8") && !output.includes("Error"),
        hint: "print(math.sqrt(64)) deb yoziladi."
      },
      independentTask: {
        title: "Mustaqil topshiriq: JSON saqlash simulyatsiyasi",
        instruction: `O'quv progressini JSON formatida saqlovchi simulyatsiya:
1. progress lug'atini yarating (ism, xp, tugatilgan_darslar ro'yxati, daraja)
2. json.dumps() bilan JSON matnga aylantiring
3. json.loads() bilan qayta o'qing
4. XP ga 50 qo'shing va yangilangan ma'lumotni chiqaring`,
        starterCode: `import json

# Progress ma'lumotlari
progress = {
    "ism": "Kamola",
    "xp": 200,
    "tugatilgan_darslar": [1, 2, 3],
    "daraja": 2
}

# JSON ga aylantirish
json_matn = json.dumps(progress, ensure_ascii=False)
print("Saqlangan JSON:")
print(json_matn)

# Qayta o'qish
qayta_progress = json.loads(json_matn)
# XP ga 50 qo'shing va chiqaring
`,
        criteria: [
          "json.dumps() va json.loads() ishlatilishi kerak.",
          "ensure_ascii=False parametri bo'lishi kerak.",
          "XP yangilanib chiqarilishi kerak."
        ],
        validator: (code, output) => {
          return code.includes("json.dumps") && code.includes("json.loads") && output.includes("Kamola");
        },
        errorHelp: [
          "ensure_ascii=False o'zbek harflarini to'g'ri saqlaydi",
          "qayta_progress['xp'] += 50  ← XP yangilash"
        ]
      }
    }
  },
  {
    id: 12,
    title: "12. Yakuniy kichik loyiha",
    slug: "final-mini-project",
    icon: "🏆",
    xp: 150,
    estimatedMinutes: 40,
    summary: "Barcha o'rganilgan mavzularni birlashtiruvchi interaktiv terminal o'yini.",
    content: {
      goal: "12 ta darsda o'rganilgan bilimlarni bitta ishlaydigan dasturga birlashtirish.",
      explanation: `Bu kursning yakuniy sinovli loyihasi!

Dasturda quyidagilar bo'lishi kerak:
- Funksiyalar (def)
- Ro'yxat va lug'at
- for yoki while sikli
- Shartli ifodalar (if/elif/else)
- try-except xatolar boshqaruvi
- json yoki math/random kutubxonasi

Tavsiya: Oddiy viktorina o'yini yozing. Foydalanuvchi (simulyatsiyada o'zgaruvchi) javoblarini tekshirib, natijada ball hisoblang.`,
      workingExample: `import random
import json

def viktorina_o_yin():
    savollar = [
        {"savol": "Python o'zgaruvchisi uchun to'g'ri yozuv qaysi?",
         "variantlar": ["int x = 5", "x = 5", "var x = 5"],
         "javob": 1},
        {"savol": "Ro'yxat nima bilan belgilanadi?",
         "variantlar": ["()", "{}", "[]"],
         "javob": 2},
    ]
    
    ball = 0
    print("=== Python Viktorina ===")
    
    for i, savol_blok in enumerate(savollar, 1):
        print(f"\\n{i}-savol: {savol_blok['savol']}")
        for j, var in enumerate(savol_blok['variantlar']):
            print(f"  {j}) {var}")
        
        try:
            javob = int("1")  # simulyatsiya
            if javob == savol_blok['javob']:
                print("To'g'ri! +10 ball")
                ball += 10
            else:
                print(f"Noto'g'ri. To'g'ri javob: {savol_blok['variantlar'][savol_blok['javob']]}")
        except ValueError:
            print("Noto'g'ri kiritish!")
    
    print(f"\\n=== Natija: {ball}/{len(savollar)*10} ===")

viktorina_o_yin()`,
      stepByStepExercise: {
        instruction: "Yakuniy hisobot funksiyasini to'ldiring: jami_xp va o_rtacha ni hisoblab, ekranga chiqaring.",
        starterCode: `# === YAKUNIY LOYIHA: SHAXSIY STATISTIKA ===

darslar = [
    {"nomi": "print() va matn", "xp": 50},
    {"nomi": "O'zgaruvchilar", "xp": 60},
    {"nomi": "Shartlar", "xp": 80},
    {"nomi": "Sikllar", "xp": 90},
    {"nomi": "Funksiyalar", "xp": 100},
]

# Topshiriq:
# 1. sum() yordamida barcha darslarning XP yig'indisini 'jami_xp' ga hisoblang:
#    Maslahat: jami_xp = sum(d["xp"] for d in darslar)
# 2. 'o_rtacha' ga jami_xp / len(darslar) ni hisoblang
# 3. print(f"Jami XP: {jami_xp}, O'rtacha: {o_rtacha}") deb chiqaring:


`,
        validator: (output) => output.includes("380") && (output.includes("Jami") || output.includes("XP")),
        hint: "sum(d['xp'] for d in darslar) yordamida ro'yxat ichidagi barcha xp lar yig'indisi topiladi."
      },
      independentTask: {
        title: "Mustaqil topshiriq: O'zingizning mini-loyihangiz",
        instruction: `Quyidagilardan birini tanlang va yozing:
1. Son topish o'yini: random.randint bilan, while sikli va try-except bilan
2. Oddiy bank: deposit/withdraw funksiyalari, balans tekshiruv, hisobot

Talablar:
- Kamida 3 ta funksiya
- try-except 
- Ro'yxat yoki lug'at
- Tsikl
- Chiroyli chiqish (=== bilan chegara)`,
        starterCode: `import random

# === MINI-LOYIHA ===
# O'z loyihangizni bu yerga yozing

def boshlash():
    print("Loyiha boshlandi!")

boshlash()
`,
        criteria: [
          "Kamida 3 ta def funksiya bo'lishi kerak.",
          "try-except bloki bo'lishi kerak.",
          "Ro'yxat yoki lug'at ishlatilishi kerak.",
          "Tsikl (for yoki while) bo'lishi kerak."
        ],
        validator: (code, output) => {
          const defCount = (code.match(/^def\s+/gm) || []).length;
          const hasTry = code.includes("try:");
          const hasLoop = code.includes("for ") || code.includes("while ");
          const hasData = code.includes("[") || code.includes("{");
          return defCount >= 3 && hasTry && hasLoop && hasData && output.trim().length > 10;
        },
        errorHelp: [
          "Kamida 3 ta 'def' bilan boshlanadigan funksiya yozing",
          "try: / except: bloki qo'shing",
          "for yoki while sikl qo'shing"
        ]
      }
    }
  }
];
