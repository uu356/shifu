// Converts Python tracebacks into friendly Uzbek explanations
export function cleanPythonError(rawError) {
  if (rawError.includes("SyntaxError: unterminated string literal") || rawError.includes("EOL while scanning string literal")) {
    return "SyntaxError: Matn (string) qo'shtirnoqlari yopilmagan.\nMasl.: print(\"Salom\")  ← oxiridagi \" yopiq bo'lishi shart.";
  }
  if (rawError.includes("SyntaxError: unmatched ')'") || rawError.includes("SyntaxError: was never closed")) {
    return "SyntaxError: Qavslar to'g'ri yopilmagan.\nHar bir '(' uchun mos ')' bo'lishi kerak.";
  }
  if (rawError.includes("SyntaxError: invalid syntax")) {
    return "SyntaxError: Sintaktik xato bor. Ikki nuqta (:), qavslar yoki qo'shtirnoqlarni tekshiring.";
  }
  if (rawError.includes("NameError: name 'print' is not defined") || rawError.includes("NameError: name 'Print' is not defined")) {
    return "NameError: Python katta-kichik harflarni farqlaydi! 'Print' emas — kichik harflar bilan 'print' yozing.";
  }
  if (rawError.includes("NameError:")) {
    const match = rawError.match(/name '(\w+)' is not defined/);
    const v = match ? match[1] : "nom";
    return `NameError: '${v}' nomli o'zgaruvchi yoki funksiya topilmadi.\nAgar bu matn bo'lsa, qo'shtirnoq ichiga oling: "${v}"\nAgar o'zgaruvchi bo'lsa, avval unga qiymat bering.`;
  }
  if (rawError.includes("IndentationError:")) {
    return "IndentationError: Satr boshidagi bo'shliq (indent) xato.\nPythonda if/for/def bloklari 4 bo'shliq bilan surilishi kerak.";
  }
  if (rawError.includes("TypeError: can only concatenate str")) {
    return "TypeError: Matn va sonni '+' bilan to'g'ridan-to'g'ri qo'shib bo'lmaydi.\nYechim: str(son) bilan matnga aylantiring yoki f-string ishlating:\n  print(f\"Natija: {son}\")";
  }
  if (rawError.includes("TypeError:")) {
    return "TypeError: Noto'g'ri ma'lumot turlari bilan amal bajarildi.\nMasalan, matn bilan sonni to'g'ridan-to'g'ri qo'shib bo'lmaydi.";
  }
  if (rawError.includes("ZeroDivisionError:")) {
    return "ZeroDivisionError: Nolga bo'lish mumkin emas!\nBo'lishdan oldin maxrajni tekshiring: if b != 0: ...";
  }
  if (rawError.includes("IndexError:")) {
    return "IndexError: Ro'yxat chegarasidan chiqib ketdingiz.\nRo'yxat uzunligini len() bilan tekshiring.";
  }
  if (rawError.includes("KeyError:")) {
    const m = rawError.match(/KeyError: (.+)/);
    const key = m ? m[1] : "kalit";
    return `KeyError: Lug'atda ${key} kaliti mavjud emas.\n.get() metodidan foydalaning: lug'at.get(${key}, "standart")`;
  }
  if (rawError.includes("ValueError:")) {
    return "ValueError: Noto'g'ri qiymat berildi.\nMasalan, int('salom') xato — faqat raqamli matnni songa aylantirish mumkin.";
  }
  if (rawError.includes("AttributeError:")) {
    return "AttributeError: Bu ma'lumot turi uchun bunday metod mavjud emas.\nTurni type() bilan tekshiring.";
  }
  return rawError;
}
