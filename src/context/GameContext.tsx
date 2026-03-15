import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { SaveData } from '../data/types';

const STORAGE_KEY = 'taiyoukei-save';

const defaultSave: SaveData = {
  unlockedPlanets: ['earth'],
  completedMissions: [],
  completedQuizzes: [],
  earnedBadges: [],
  quizScores: {},
  soundEnabled: true,
  hasSeenIntro: false,
};

function loadSave(): SaveData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...defaultSave, ...parsed };
    }
  } catch { /* ignore */ }
  return { ...defaultSave };
}

function saveToDisk(data: SaveData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch { /* ignore */ }
}

interface GameContextType {
  save: SaveData;
  isPlanetUnlocked: (id: string) => boolean;
  isMissionComplete: (id: string) => boolean;
  isQuizComplete: (id: string) => boolean;
  hasBadge: (id: string) => boolean;
  completeMission: (planetId: string) => void;
  completeQuiz: (planetId: string, score: number) => void;
  unlockPlanet: (id: string) => void;
  earnBadge: (id: string) => void;
  toggleSound: () => void;
  markIntroSeen: () => void;
  resetGame: () => void;
  hasSaveData: boolean;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [save, setSave] = useState<SaveData>(loadSave);

  useEffect(() => {
    saveToDisk(save);
  }, [save]);

  const update = useCallback((fn: (prev: SaveData) => SaveData) => {
    setSave((prev) => fn(prev));
  }, []);

  const isPlanetUnlocked = useCallback((id: string) => save.unlockedPlanets.includes(id), [save]);
  const isMissionComplete = useCallback((id: string) => save.completedMissions.includes(id), [save]);
  const isQuizComplete = useCallback((id: string) => save.completedQuizzes.includes(id), [save]);
  const hasBadge = useCallback((id: string) => save.earnedBadges.includes(id), [save]);

  const completeMission = useCallback((planetId: string) => {
    update((s) =>
      s.completedMissions.includes(planetId)
        ? s
        : { ...s, completedMissions: [...s.completedMissions, planetId] }
    );
  }, [update]);

  const completeQuiz = useCallback((planetId: string, score: number) => {
    update((s) => ({
      ...s,
      completedQuizzes: s.completedQuizzes.includes(planetId)
        ? s.completedQuizzes
        : [...s.completedQuizzes, planetId],
      quizScores: { ...s.quizScores, [planetId]: Math.max(s.quizScores[planetId] ?? 0, score) },
    }));
  }, [update]);

  const unlockPlanet = useCallback((id: string) => {
    update((s) =>
      s.unlockedPlanets.includes(id)
        ? s
        : { ...s, unlockedPlanets: [...s.unlockedPlanets, id] }
    );
  }, [update]);

  const earnBadge = useCallback((id: string) => {
    update((s) =>
      s.earnedBadges.includes(id)
        ? s
        : { ...s, earnedBadges: [...s.earnedBadges, id] }
    );
  }, [update]);

  const toggleSound = useCallback(() => {
    update((s) => ({ ...s, soundEnabled: !s.soundEnabled }));
  }, [update]);

  const markIntroSeen = useCallback(() => {
    update((s) => ({ ...s, hasSeenIntro: true }));
  }, [update]);

  const resetGame = useCallback(() => {
    setSave({ ...defaultSave });
  }, []);

  const hasSaveData = save.hasSeenIntro;

  return (
    <GameContext.Provider
      value={{
        save,
        isPlanetUnlocked,
        isMissionComplete,
        isQuizComplete,
        hasBadge,
        completeMission,
        completeQuiz,
        unlockPlanet,
        earnBadge,
        toggleSound,
        markIntroSeen,
        resetGame,
        hasSaveData,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame(): GameContextType {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
