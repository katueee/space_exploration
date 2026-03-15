import { useState } from 'react';
import { ScreenLayout } from '../components/ScreenLayout';
import { BigButton } from '../components/BigButton';
import { getPlanet } from '../data/planets';
import { useGame } from '../context/GameContext';

interface Props {
  planetId: string;
  onComplete: () => void;
  onBack: () => void;
}

export function MissionScreen({ planetId, onComplete, onBack }: Props) {
  const planet = getPlanet(planetId);
  const { completeMission } = useGame();
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);

  if (!planet) return null;

  const mission = planet.mission;

  const handleSelect = (index: number) => {
    if (result === 'correct') return;
    setSelected(index);
    const choice = mission.choices![index];
    if (choice.isCorrect) {
      setResult('correct');
      completeMission(planetId);
    } else {
      setResult('wrong');
    }
  };

  const handleRetry = () => {
    setSelected(null);
    setResult(null);
  };

  return (
    <ScreenLayout>
      <div className="flex-1 flex flex-col items-center px-6 py-6 gap-6">
        <button
          onClick={onBack}
          className="self-start text-white/70 active:text-white text-lg flex items-center gap-1"
        >
          ← もどる
        </button>

        <div className="text-center">
          <span className="text-5xl mb-3 block">🎯</span>
          <h2 className="text-2xl font-bold text-star-yellow">ミッション</h2>
        </div>

        <div className="bg-white/10 backdrop-blur rounded-2xl p-5 max-w-sm w-full">
          <p className="text-xl leading-relaxed text-center">{mission.instruction}</p>
        </div>

        {/* Choices */}
        <div className="flex flex-col gap-4 w-full max-w-sm">
          {mission.choices!.map((choice, i) => {
            let bg = 'bg-white/10 active:bg-white/20';
            if (selected === i) {
              bg = choice.isCorrect
                ? 'bg-green-500/30 ring-2 ring-green-400'
                : 'bg-red-500/30 ring-2 ring-red-400';
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={result === 'correct'}
                className={`
                  ${bg} rounded-2xl p-5 text-xl font-bold
                  flex items-center gap-4 transition-all
                  disabled:active:scale-100
                `}
              >
                <span className="text-4xl">{choice.emoji}</span>
                <span>{choice.label}</span>
              </button>
            );
          })}
        </div>

        {/* Result feedback */}
        {result === 'correct' && (
          <div className="animate-pop-in text-center">
            <span className="text-6xl block mb-3">🎉</span>
            <p className="text-xl text-green-400 font-bold mb-2">はっけん！</p>
            <p className="text-base text-white/80 max-w-sm">{mission.successMessage}</p>
            <div className="mt-5">
              <BigButton onClick={onComplete} variant="primary">
                つぎへ すすむ
              </BigButton>
            </div>
          </div>
        )}

        {result === 'wrong' && (
          <div className="animate-slide-up text-center">
            <p className="text-lg text-amber-300 mb-2">おしい！ もういちど やってみよう</p>
            <p className="text-base text-white/70 mb-4 max-w-sm">{mission.failMessage}</p>
            <BigButton onClick={handleRetry} variant="secondary">
              もういちど
            </BigButton>
          </div>
        )}
      </div>
    </ScreenLayout>
  );
}
