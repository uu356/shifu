import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { cleanPythonError } from '../utils/pythonRunner';

const PyodideContext = createContext(null);

export function PyodideProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Python 3.12 muhiti yuklanmoqda...");
  const [isRunning, setIsRunning] = useState(false);
  const pyodideRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    async function boot() {
      if (window.loadPyodide) {
        await init();
        return;
      }
      setLoadingMessage("Pyodide yuklanmoqda (~20MB, bir marta)...");
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";
      script.async = true;
      script.onload = () => { if (isMounted) init(); };
      script.onerror = () => {
        if (isMounted) {
          setIsLoading(false);
          setLoadingMessage("Pyodide yuklanmadi — zaxira simulyator ishlamoqda.");
        }
      };
      document.body.appendChild(script);
    }

    async function init() {
      try {
        setLoadingMessage("Python dvigateli ishga tushirilmoqda...");
        const py = await window.loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/"
        });
        if (isMounted) {
          pyodideRef.current = py;
          setIsReady(true);
          setIsLoading(false);
          setLoadingMessage("🟢 Python 3.12 tayyor!");
        }
      } catch (err) {
        console.error("Pyodide boot error:", err);
        if (isMounted) {
          setIsLoading(false);
          setLoadingMessage("Python yuklanmadi — simulyator rejimida davom etilmoqda.");
        }
      }
    }

    boot();
    return () => { isMounted = false; };
  }, []);

  // Fallback simulator for basic print() when Pyodide unavailable
  function runFallback(code) {
    const lines = code.split('\n');
    const outputLines = [];
    for (const line of lines) {
      const t = line.trim();
      if (!t || t.startsWith('#')) continue;
      const m = t.match(/^print\s*\(([\s\S]*)\)$/);
      if (m) {
        const arg = m[1].trim();
        if ((arg.startsWith('"') && arg.endsWith('"')) || (arg.startsWith("'") && arg.endsWith("'"))) {
          outputLines.push(arg.slice(1, -1));
        } else if (!isNaN(Number(arg))) {
          outputLines.push(arg);
        } else {
          outputLines.push(`[simul]: ${arg}`);
        }
      }
    }
    return { output: outputLines.join('\n') || "(chiqish yo'q)", error: null, success: true, simulated: true };
  }

  const runCode = async (code) => {
    if (isRunning) return { output: "", error: "Avvalgi kod hali bajarilmoqda...", success: false };
    setIsRunning(true);

    // Warn about input() — it freezes Pyodide browser runner
    if (code.includes('input(')) {
      setIsRunning(false);
      return {
        output: "",
        error: "⚠️ Eslatma: Brauzerda input() funksiyasi to'xtab qolishi mumkin.\n\nYechim: input() o'rniga o'zgaruvchiga to'g'ridan-to'g'ri qiymat bering:\n  ism = \"Anvar\"   # input(\"Ism: \") o'rniga\n  print(\"Salom,\", ism)",
        success: false
      };
    }

    if (!pyodideRef.current) {
      const res = runFallback(code);
      setIsRunning(false);
      return res;
    }

    let stdoutLines = [];
    let stderrLines = [];
    try {
      const py = pyodideRef.current;
      py.setStdout({
        batched: (line) => {
          stdoutLines.push(line);
        }
      });
      py.setStderr({
        batched: (line) => {
          stderrLines.push(line);
        }
      });
      await py.runPythonAsync(code);
      const output = stdoutLines.join('\n');
      const errText = stderrLines.join('\n');
      setIsRunning(false);
      return {
        output: output || (errText ? "" : "✓ Dastur bajarildi (chiqish yo'q)"),
        error: errText || null,
        success: !errText
      };
    } catch (err) {
      const raw = err.message || String(err);
      setIsRunning(false);
      return {
        output: stdoutLines.join('\n'),
        error: cleanPythonError(raw),
        rawError: raw,
        success: false
      };
    }
  };

  return (
    <PyodideContext.Provider value={{ runCode, isLoading, isReady, isRunning, loadingMessage }}>
      {children}
    </PyodideContext.Provider>
  );
}

export function usePyodide() {
  const ctx = useContext(PyodideContext);
  if (!ctx) throw new Error("usePyodide must be used inside <PyodideProvider>");
  return ctx;
}
