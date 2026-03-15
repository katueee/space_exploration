import { useState, useCallback } from 'react';
import { useGame } from './context/GameContext';
import { TitleScreen } from './screens/TitleScreen';
import { IntroScreen } from './screens/IntroScreen';
import { MapScreen } from './screens/MapScreen';
import { PlanetDetailScreen } from './screens/PlanetDetailScreen';
import { MissionScreen } from './screens/MissionScreen';
import { QuizScreen } from './screens/QuizScreen';
import { ResultScreen } from './screens/ResultScreen';
import { EncyclopediaScreen } from './screens/EncyclopediaScreen';
import { BadgesScreen } from './screens/BadgesScreen';
import { NavBar } from './components/NavBar';
import { getPlanet, planets } from './data/planets';
import { PlanetImage } from './components/PlanetImage';

type Screen =
  | { type: 'title' }
  | { type: 'intro' }
  | { type: 'map' }
  | { type: 'planet-detail'; planetId: string }
  | { type: 'mission'; planetId: string }
  | { type: 'quiz'; planetId: string }
  | { type: 'result'; planetId: string; resultType: 'mission' | 'quiz' | 'planet-complete'; quizScore?: number; quizTotal?: number }
  | { type: 'encyclopedia' }
  | { type: 'badges' }
  | { type: 'quiz-select' };

function QuizSelectScreen({ onSelectPlanet }: { onSelectPlanet: (id: string) => void }) {
  const { isPlanetUnlocked, isQuizComplete } = useGame();

  return (
    <div className="star-bg flex-1 flex flex-col items-center px-6 py-6 gap-5 overflow-y-auto h-full">
      <h2 className="text-2xl font-bold text-star-yellow">クイズ</h2>
      <p className="text-white/60 text-sm">ほしを えらんで クイズに ちょうせんしよう！</p>
      <div className="flex flex-col gap-3 w-full max-w-sm">
        {planets.map((planet) => {
          const unlocked = isPlanetUnlocked(planet.id);
          const quizDone = isQuizComplete(planet.id);
          return (
            <button
              key={planet.id}
              onClick={() => unlocked && onSelectPlanet(planet.id)}
              disabled={!unlocked}
              className={`flex items-center gap-4 p-4 rounded-2xl ${unlocked ? 'bg-white/10 active:bg-white/20' : 'bg-white/5 opacity-40'}`}
            >
              <PlanetImage planetId={planet.id} size="small" />
              <span className="flex-1 text-left font-bold text-lg">{unlocked ? planet.name : '？？？'}</span>
              {quizDone && <span className="text-xl">✅</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  const { markIntroSeen, isMissionComplete, isQuizComplete } = useGame();
  const [screen, setScreen] = useState<Screen>({ type: 'title' });

  const navigate = useCallback((s: Screen) => setScreen(s), []);

  const handleNavTab = useCallback((tabId: string) => {
    switch (tabId) {
      case 'map':
        navigate({ type: 'map' });
        break;
      case 'encyclopedia':
        navigate({ type: 'encyclopedia' });
        break;
      case 'badges':
        navigate({ type: 'badges' });
        break;
      case 'quiz-select':
        navigate({ type: 'quiz-select' });
        break;
    }
  }, [navigate]);

  const showNav = !['title', 'intro'].includes(screen.type);
  const currentNavTab = screen.type === 'map' || screen.type === 'planet-detail' || screen.type === 'mission' || screen.type === 'result'
    ? 'map'
    : screen.type === 'encyclopedia' ? 'encyclopedia'
    : screen.type === 'badges' ? 'badges'
    : screen.type === 'quiz-select' || screen.type === 'quiz' ? 'quiz-select'
    : 'map';

  const renderScreen = () => {
    switch (screen.type) {
      case 'title':
        return (
          <TitleScreen
            onStart={() => navigate({ type: 'intro' })}
            onContinue={() => navigate({ type: 'map' })}
            onEncyclopedia={() => navigate({ type: 'encyclopedia' })}
          />
        );

      case 'intro':
        return (
          <IntroScreen
            onComplete={() => {
              markIntroSeen();
              navigate({ type: 'map' });
            }}
          />
        );

      case 'map':
        return (
          <MapScreen
            onSelectPlanet={(id) => navigate({ type: 'planet-detail', planetId: id })}
          />
        );

      case 'planet-detail':
        return (
          <PlanetDetailScreen
            planetId={screen.planetId}
            onMission={() => navigate({ type: 'mission', planetId: screen.planetId })}
            onQuiz={() => navigate({ type: 'quiz', planetId: screen.planetId })}
            onBack={() => navigate({ type: 'map' })}
          />
        );

      case 'mission':
        return (
          <MissionScreen
            planetId={screen.planetId}
            onComplete={() => {
              const qDone = isQuizComplete(screen.planetId);
              navigate({
                type: 'result',
                planetId: screen.planetId,
                resultType: qDone ? 'planet-complete' : 'mission',
              });
            }}
            onBack={() => navigate({ type: 'planet-detail', planetId: screen.planetId })}
          />
        );

      case 'quiz':
        return (
          <QuizScreen
            planetId={screen.planetId}
            onComplete={(score, total) => {
              const mDone = isMissionComplete(screen.planetId);
              navigate({
                type: 'result',
                planetId: screen.planetId,
                resultType: mDone ? 'planet-complete' : 'quiz',
                quizScore: score,
                quizTotal: total,
              });
            }}
            onBack={() => navigate({ type: 'planet-detail', planetId: screen.planetId })}
          />
        );

      case 'result': {
        const planet = getPlanet(screen.planetId);
        return (
          <ResultScreen
            planetId={screen.planetId}
            type={screen.resultType}
            quizScore={screen.quizScore}
            quizTotal={screen.quizTotal}
            onContinue={() => {
              if (screen.resultType === 'planet-complete' && planet?.nextPlanetId) {
                navigate({ type: 'planet-detail', planetId: planet.nextPlanetId });
              } else {
                navigate({ type: 'planet-detail', planetId: screen.planetId });
              }
            }}
          />
        );
      }

      case 'encyclopedia':
        return <EncyclopediaScreen onBack={() => navigate({ type: 'map' })} />;

      case 'badges':
        return <BadgesScreen />;

      case 'quiz-select':
        return (
          <QuizSelectScreen
            onSelectPlanet={(id) => navigate({ type: 'quiz', planetId: id })}
          />
        );
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 overflow-hidden">
        {renderScreen()}
      </div>
      {showNav && (
        <NavBar currentScreen={currentNavTab} onNavigate={handleNavTab} />
      )}
    </div>
  );
}
