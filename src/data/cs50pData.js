// Harvard CS50P (CS50's Introduction to Programming with Python) mavzulari va o'rganish yo'riqnomasi
export const CS50P_OFFICIAL_URL = "https://pll.harvard.edu/course/cs50s-introduction-programming-python";

export const CS50P_DISCLAIMER = "Eslatma: Ushbu platforma mustaqil ta'limiy loyiha bo'lib, Harvard Universiteti bilan rasmiy hamkorlikda ishlamaydi va uning nomidan vakillik qilmaydi. Kurs materiallari uchun rasmiy Harvard CS50P portaliga murojaat qiling.";

export const CS50P_TOPICS = [
  {
    id: "functions-variables",
    title: "Funksiyalar va O'zgaruvchilar",
    cs50Week: "Week 0: Functions, Variables",
    concepts: ["print", "input", "str", "int", "float", "def", "return", "scope"],
    description: "CS50P 0-haftasi: Dasturlash asoslari, ma'lumotlarni qabul qilish, matn metodlari (strip, title) va o'z funksiyangizni yaratish.",
    aiStarterPrompt: "Men CS50P 0-hafta (Functions, Variables) mavzusini o'rganyapman. Menga funksiyalar va parametrlar qanday ishlashini sodda tushuntirib bera olasizmi?",
    similarPractice: {
      title: "Mashq: Salomlashish funksiyasi",
      task: "Foydalanuvchidan ismini so'rab, uning bosh harfini katta qiluvchi va 'Salom, [Ism]!' deb qaytaruvchi funksiya yozing.",
      starterCode: `def salomlash(ism="dunyo"):
    # TODO: ism ning bosh harfini katta qiling (.capitalize() yoki .title())
    # va "Salom, [Ism]!" deb qaytaring (return)
    pass

# Sinov:
print(salomlash("anvar"))`,
      expected: "Salom, Anvar!"
    }
  },
  {
    id: "conditionals",
    title: "Shartlar va Mantiqiy ifodalar",
    cs50Week: "Week 1: Conditionals",
    concepts: ["if", "elif", "else", "or", "and", "match", "modulo (%)", "Boolean"],
    description: "CS50P 1-haftasi: Mantiqiy qarorlar qabul qilish, taqqoslash operatorlari va Python 3.10+ ning zamonaviy match-case konstruksiyasi.",
    aiStarterPrompt: "CS50P 1-hafta bo'yicha shartlar va 'match-case' konstruksiyasi qanday ishlashini tushuntiring.",
    similarPractice: {
      title: "Mashq: Juft yoki toq sonni aniqlash",
      task: "Son berilganda, agar u juft bo'lsa True, toq bo'lsa False qaytaruvchi is_even() funksiyasini yozing.",
      starterCode: `def is_even(n):
    # TODO: modulo (%) operatoridan foydalanib, son juft bo'lsa True, toq bo'lsa False qaytaring
    pass

# Sinov:
print("4 juftmi?:", is_even(4))
print("7 juftmi?:", is_even(7))`,
      expected: "True\nFalse"
    }
  },
  {
    id: "loops",
    title: "Sikllar (Loops)",
    cs50Week: "Week 2: Loops",
    concepts: ["while", "for", "range", "list", "dict", "len", "continue", "break"],
    description: "CS50P 2-haftasi: Takrorlanish jarayonlari, ro'yxatlar va lug'atlar ustida iteratsiya qilish hamda sikldan chiqish.",
    aiStarterPrompt: "CS50P 2-haftasidagi for va while sikllari orasidagi asosiy farqni va ulardan qachon foydalanishni tushuntiring.",
    similarPractice: {
      title: "Mashq: Ro'yxatdagi so'zlarni sanash",
      task: "Ro'yxat berilgan. Har bir mevaning nomini va tartib raqamini chiqaring.",
      starterCode: `mevalar = ["olma", "anor", "behi"]

# TODO: for sikli va enumerate() yordamida mevalarni tartib raqami bilan chiqaring:
`,
      expected: "1. Olma\n2. Anor\n3. Behi"
    }
  },
  {
    id: "exceptions",
    title: "Istisnolar va Xatolar (Exceptions)",
    cs50Week: "Week 3: Exceptions",
    concepts: ["SyntaxError", "ValueError", "ZeroDivisionError", "try", "except", "else", "finally", "pass", "raise"],
    description: "CS50P 3-haftasi: Dastur qulashining oldini olish, kutilmagan kirish ma'lumotlarini tekshirish va xatolarni xavfsiz tutish.",
    aiStarterPrompt: "CS50P 3-haftasi: try-except va try-except-else-finally bloklari nima uchun kerakligini misollar bilan ko'rsating.",
    similarPractice: {
      title: "Mashq: Xavfsiz son kiritish",
      task: "Matnni songa xavfsiz aylantiruvchi, xato bo'lsa 'Bu son emas!' deb qaytaruvchi funksiya.",
      starterCode: `def xavfsiz_son(matn):
    # TODO: try-except yordamida matnni int() ga aylantiring
    # ValueError yuz bersa: "Bu son emas!" deb qaytaring
    pass

# Sinov:
print(xavfsiz_son("42"))
print(xavfsiz_son("salom"))`,
      expected: "42\nBu son emas!"
    }
  },
  {
    id: "libraries",
    title: "Kutubxonalar va Modullar",
    cs50Week: "Week 4: Libraries",
    concepts: ["import", "random", "statistics", "sys.argv", "sys.exit", "packages", "pip", "requests", "APIs"],
    description: "CS50P 4-haftasi: O'z kodini boshqa modullar bilan boyitish, buyruqlar satri argumentlari (sys.argv) va tashqi API paketlar.",
    aiStarterPrompt: "CS50P 4-hafta: sys.argv qanday ishlaydi va uning random kutubxonasidan farqi nimada?",
    similarPractice: {
      title: "Mashq: Random tanlov",
      task: "Tangani tashlash yoki ro'yxatdan tasodifiy tanlash dasturi.",
      starterCode: `import random

tangalar = ["Burgut", "Raqam"]

# TODO: random.choice() yordamida tangalar ro'yxatidan tasodifiy tanlab chiqaring:
`,
      expected: "Tanga tashlandi:"
    }
  },
  {
    id: "unit-tests",
    title: "Unit Testlar (pytest)",
    cs50Week: "Week 5: Unit Tests",
    concepts: ["assert", "pytest", "test_*.py", "testing functions", "edge cases"],
    description: "CS50P 5-haftasi: Yozgan kodingizni avtomatik tekshirish, assert ifodalari va pytest orqali sifatni ta'minlash.",
    aiStarterPrompt: "CS50P 5-hafta: Nega funksiyalarni testlash muhim va assert qanday ishlaydi?",
    similarPractice: {
      title: "Mashq: Oddiy assert testi",
      task: "Kvadrat hisoblovchi funksiyani test qiling.",
      starterCode: `def kvadrat(n):
    # TODO: n ning kvadratini qaytaring (return)
    pass

# Testlar (assert xato bermasligi kerak):
assert kvadrat(2) == 4
assert kvadrat(-3) == 9
assert kvadrat(0) == 0
print("Barcha testlar muvaffaqiyatli o'tdi!")`,
      expected: "Barcha testlar muvaffaqiyatli o'tdi!"
    }
  },
  {
    id: "file-io",
    title: "Fayllar bilan ishlash (File I/O)",
    cs50Week: "Week 6: File I/O",
    concepts: ["open", "with", "read", "write", "csv", "csv.reader", "csv.DictWriter", "Pillow"],
    description: "CS50P 6-haftasi: Ma'lumotlarni matnli va CSV fayllarga yozish hamda o'qish, resurslarni to'g'ri yopish.",
    aiStarterPrompt: "CS50P 6-hafta: Nega fayllar bilan ishlaganda 'with open()' ishlatish tavsiya etiladi?",
    similarPractice: {
      title: "Mashq: CSV ma'lumotlarini o'qish simulyatsiyasi",
      task: "CSV qatorlarini ajratib chop eting.",
      starterCode: `csv_matn = "ism,kasb\\nAli,Dasturchi\\nVali,Dizayner"

# TODO: qatorlarni .split("\\n") qilib, har bir qatordan ism va kasbni ajratib ekranga chiqaring:
`,
      expected: "Ali - Dasturchi\nVali - Dizayner"
    }
  },
  {
    id: "regex",
    title: "Muntazam ifodalar (Regular Expressions)",
    cs50Week: "Week 7: Regular Expressions",
    concepts: ["re", "re.search", "patterns", "validation", "groups", "re.sub"],
    description: "CS50P 7-haftasi: Matn andozalari, email va URL manzillarini tekshirish, murakkab qidiruvlar.",
    aiStarterPrompt: "CS50P 7-hafta: Regular expressions (re) yordamida email manzilini qanday tekshirish mumkin?",
    similarPractice: {
      title: "Mashq: Oddiy email andozasi",
      task: "re kutubxonasi yordamida email formatini tekshiring.",
      starterCode: `import re

email = "talaba@harvard.edu"

# TODO: re.search yordamida email manzilida @ va .edu/.uz/.com borligini tekshiruvchi shart yozing:
`,
      expected: "Email manzili to'g'ri!"
    }
  },
  {
    id: "oop",
    title: "Obyektga Yo'naltirilgan Dasturlash (OOP)",
    cs50Week: "Week 8: Object-Oriented Programming",
    concepts: ["class", "object", "__init__", "methods", "properties", "getters", "setters", "inheritance"],
    description: "CS50P 8-haftasi: O'z ma'lumot turlarini yaratish, klasslar, obyektlar, inkapsulyatsiya va metodlar.",
    aiStarterPrompt: "CS50P 8-hafta: Klass (class) va obyekt (object) orasidagi farqni real hayotiy misol bilan tushuntiring.",
    similarPractice: {
      title: "Mashq: Talaba klassi",
      task: "Student klassini yaratib, uning ma'lumotlarini chop eting.",
      starterCode: `class Student:
    def __init__(self, name, house):
        # TODO: self.name va self.house xususiyatlarini saqlang
        pass
        
    def __str__(self):
        return f"{self.name} {self.house} fakultetida o'qiydi"

talaba = Student("Harry", "Gryffindor")
print(talaba)`,
      expected: "Harry Gryffindor fakultetida o'qiydi"
    }
  }
];
