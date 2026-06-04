import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { allCoachIds, allPlayerIds } from "@/lib/data";

type Theme = "light" | "dark";
type FavType = "player" | "team" | "match";
type FavKey = `${FavType}:${string}`;
type UnlockType = "player" | "coach";
type UnlockKey = `${UnlockType}:${string}`;

export type UnlockedItem = { type: UnlockType; id: string };

type Ctx = {
  theme: Theme;
  toggleTheme: () => void;
  favorites: Set<FavKey>;
  toggleFavorite: (type: FavType, id: string) => void;
  isFavorite: (type: FavType, id: string) => boolean;
  quizBest: number;
  setQuizBest: (n: number) => void;
  unlocked: Set<UnlockKey>;
  isUnlocked: (type: UnlockType, id: string) => boolean;
  unlockRandom: () => UnlockedItem | null;
  resetUnlocks: () => void;
};

const AppCtx = createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [favorites, setFavorites] = useState<Set<FavKey>>(new Set());
  const [quizBest, setQuizBestState] = useState(0);
  const [unlocked, setUnlocked] = useState<Set<UnlockKey>>(new Set());

  useEffect(() => {
    if (typeof window === "undefined") return;
    const t = (localStorage.getItem("theme") as Theme) || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(t);
    const f = localStorage.getItem("favorites");
    if (f) try { setFavorites(new Set(JSON.parse(f))); } catch {}
    const b = localStorage.getItem("quizBest");
    if (b) setQuizBestState(Number(b) || 0);
    const u = localStorage.getItem("unlocked");
    if (u) try { setUnlocked(new Set(JSON.parse(u))); } catch {}
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => setTheme(t => (t === "light" ? "dark" : "light")), []);

  const toggleFavorite = useCallback((type: FavType, id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      const key: FavKey = `${type}:${id}`;
      if (next.has(key)) next.delete(key); else next.add(key);
      localStorage.setItem("favorites", JSON.stringify([...next]));
      return next;
    });
  }, []);

  const isFavorite = useCallback((type: FavType, id: string) => favorites.has(`${type}:${id}`), [favorites]);

  const setQuizBest = useCallback((n: number) => {
    setQuizBestState(prev => {
      const v = Math.max(prev, n);
      localStorage.setItem("quizBest", String(v));
      return v;
    });
  }, []);

  const isUnlocked = useCallback(
    (type: UnlockType, id: string) => unlocked.has(`${type}:${id}`),
    [unlocked],
  );

  const unlockRandom = useCallback((): UnlockedItem | null => {
    const pool: UnlockKey[] = [
      ...allPlayerIds().map(id => `player:${id}` as UnlockKey),
      ...allCoachIds().map(id => `coach:${id}` as UnlockKey),
    ];
    const locked = pool.filter(k => !unlocked.has(k));
    if (locked.length === 0) return null;
    const pick = locked[Math.floor(Math.random() * locked.length)];
    const next = new Set(unlocked);
    next.add(pick);
    setUnlocked(next);
    localStorage.setItem("unlocked", JSON.stringify([...next]));
    const [type, id] = pick.split(":");
    return { type: type as UnlockType, id };
  }, [unlocked]);

  const resetUnlocks = useCallback(() => {
    setUnlocked(new Set());
    localStorage.removeItem("unlocked");
  }, []);

  return (
    <AppCtx.Provider value={{ theme, toggleTheme, favorites, toggleFavorite, isFavorite, quizBest, setQuizBest, unlocked, isUnlocked, unlockRandom, resetUnlocks }}>
      {children}
    </AppCtx.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
