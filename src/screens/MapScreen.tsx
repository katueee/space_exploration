import { ScreenLayout } from '../components/ScreenLayout';
import { PlanetImage } from '../components/PlanetImage';
import { useGame } from '../context/GameContext';
import { planets } from '../data/planets';

interface Props {
  onSelectPlanet: (id: string) => void;
}

export function MapScreen({ onSelectPlanet }: Props) {
  const { isPlanetUnlocked, isMissionComplete, isQuizComplete } = useGame();

  return (
    <ScreenLayout>
      <div className="flex-1 flex flex-col items-center px-4 py-6">
        <h2 className="text-2xl font-bold text-star-yellow mb-2">うちゅう マップ</h2>
        <p className="text-white/70 text-sm mb-6">ほしを タップして たんけんしよう！</p>

        {/* Sun at top */}
        <div className="mb-6">
          <PlanetImage planetId="sun" size="medium" className="animate-float" />
          <p className="text-center text-sm mt-2 text-star-yellow font-bold">たいよう</p>
        </div>

        {/* Orbit lines with planets */}
        <div className="flex flex-col gap-6 w-full max-w-sm">
          {planets.map((planet) => {
            const unlocked = isPlanetUnlocked(planet.id);
            const missionDone = isMissionComplete(planet.id);
            const quizDone = isQuizComplete(planet.id);
            const allDone = missionDone && quizDone;

            return (
              <button
                key={planet.id}
                onClick={() => unlocked && onSelectPlanet(planet.id)}
                disabled={!unlocked}
                className={`
                  flex items-center gap-4 p-4 rounded-2xl transition-all
                  ${unlocked
                    ? 'bg-white/10 active:bg-white/20 active:scale-98'
                    : 'bg-white/5 opacity-50'
                  }
                `}
              >
                <div className="relative">
                  <PlanetImage planetId={planet.id} size="small" />
                  {!unlocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                      <span className="text-2xl">🔒</span>
                    </div>
                  )}
                  {allDone && (
                    <div className="absolute -top-1 -right-1 text-xl">⭐</div>
                  )}
                </div>

                <div className="flex-1 text-left">
                  <p className="font-bold text-lg">{planet.name}</p>
                  <p className="text-sm text-white/60">{planet.nameKana}</p>
                </div>

                {unlocked && (
                  <div className="flex gap-1">
                    <span className={`text-lg ${missionDone ? '' : 'opacity-30'}`}>🎯</span>
                    <span className={`text-lg ${quizDone ? '' : 'opacity-30'}`}>❓</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </ScreenLayout>
  );
}
