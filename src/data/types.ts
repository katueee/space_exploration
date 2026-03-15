export interface PlanetFact {
  icon: string;
  label: string;
}

export interface QuizQuestion {
  question: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
}

export interface Mission {
  type: 'choice' | 'image-tap';
  instruction: string;
  choices?: { label: string; isCorrect: boolean; emoji: string }[];
  successMessage: string;
  failMessage: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  emoji: string;
}

export interface Planet {
  id: string;
  name: string;
  nameKana: string;
  description: string;
  color: string;
  emoji: string;
  facts: PlanetFact[];
  mission: Mission;
  quiz: QuizQuestion[];
  badge: Badge;
  unlockOrder: number;
  nextPlanetId: string | null;
}

export interface SaveData {
  unlockedPlanets: string[];
  completedMissions: string[];
  completedQuizzes: string[];
  earnedBadges: string[];
  quizScores: Record<string, number>;
  soundEnabled: boolean;
  hasSeenIntro: boolean;
}
