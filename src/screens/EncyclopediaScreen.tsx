import { useState } from 'react';
import { ScreenLayout } from '../components/ScreenLayout';
import { PlanetImage } from '../components/PlanetImage';
import { useGame } from '../context/GameContext';
import { planets } from '../data/planets';

interface Props {
  onBack?: () => void;
}

export function EncyclopediaScreen({ onBack }: Props) {
  const { isPlanetUnlocked, hasBadge, save } = useGame();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedPlanet = selectedId ? planets.find((p) => p.id === selectedId) : null;

  if (selectedPlanet && isPlanetUnlocked(selectedPlanet.id)) {
    return (
      <ScreenLayout>
        <div className="flex-1 flex flex-col items-center px-6 py-6 gap-5 overflow-y-auto">
          <button
            onClick={() => setSelectedId(null)}
            className="self-start text-white/70 active:text-white text-lg"
          >
            ← もどる
          </button>

          <PlanetImage planetId={selectedPlanet.id} size="large" className="animate-pop-in" />

          <h2 className="text-3xl font-bold" style={{ color: selectedPlanet.color }}>
            {selectedPlanet.name}
          </h2>
          <p className="text-white/60 text-sm">{selectedPlanet.nameKana}</p>

          <div className="bg-white/10 rounded-2xl p-5 max-w-sm w-full">
            <p className="text-lg leading-relaxed text-center">{selectedPlanet.description}</p>
          </div>

          <div className="flex flex-col gap-3 w-full max-w-sm">
            {selectedPlanet.facts.map((fact, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                <span className="text-3xl">{fact.icon}</span>
                <span className="text-base">{fact.label}</span>
              </div>
            ))}
          </div>

          {hasBadge(selectedPlanet.badge.id) && (
            <div className="bg-star-yellow/20 rounded-2xl p-4 flex items-center gap-3">
              <span className="text-3xl">{selectedPlanet.badge.emoji}</span>
              <div>
                <p className="font-bold text-star-yellow">{selectedPlanet.badge.name}</p>
                <p className="text-sm text-white/70">{selectedPlanet.badge.description}</p>
              </div>
            </div>
          )}

          {save.quizScores[selectedPlanet.id] !== undefined && (
            <div className="bg-white/10 rounded-xl p-3 flex items-center gap-2">
              <span className="text-2xl">📝</span>
              <span>
                クイズ ベストスコア: {save.quizScores[selectedPlanet.id]} / {selectedPlanet.quiz.length}
              </span>
            </div>
          )}
        </div>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <div className="flex-1 flex flex-col items-center px-6 py-6 gap-5 overflow-y-auto">
        {onBack && (
          <button
            onClick={onBack}
            className="self-start text-white/70 active:text-white text-lg"
          >
            ← もどる
          </button>
        )}

        <h2 className="text-2xl font-bold text-star-yellow">ずかん</h2>
        <p className="text-white/60 text-sm">たんけんした ほしの じょうほうを みよう！</p>

        <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
          {planets.map((planet) => {
            const unlocked = isPlanetUnlocked(planet.id);
            const badge = hasBadge(planet.badge.id);

            return (
              <button
                key={planet.id}
                onClick={() => unlocked && setSelectedId(planet.id)}
                disabled={!unlocked}
                className={`
                  flex items-center gap-4 p-4 rounded-2xl transition-all
                  ${unlocked
                    ? 'bg-white/10 active:bg-white/20'
                    : 'bg-white/5 opacity-40'
                  }
                `}
              >
                <div className="relative">
                  <PlanetImage planetId={planet.id} size="small" />
                  {!unlocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full">
                      <span className="text-xl">🔒</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-bold text-lg">{unlocked ? planet.name : '？？？'}</p>
                  {unlocked && <p className="text-sm text-white/60">{planet.nameKana}</p>}
                </div>
                {badge && <span className="text-2xl">⭐</span>}
              </button>
            );
          })}
        </div>
      </div>
    </ScreenLayout>
  );
}
