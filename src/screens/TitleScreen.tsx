import { ScreenLayout } from '../components/ScreenLayout';
import { BigButton } from '../components/BigButton';
import { useGame } from '../context/GameContext';

interface Props {
  onStart: () => void;
  onContinue: () => void;
  onEncyclopedia: () => void;
}

export function TitleScreen({ onStart, onContinue, onEncyclopedia }: Props) {
  const { save, toggleSound, hasSaveData } = useGame();

  return (
    <ScreenLayout>
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
        {/* Title */}
        <div className="animate-float mb-4">
          <h1 className="text-4xl font-bold text-star-yellow drop-shadow-lg leading-tight">
            たんけん！
            <br />
            たいようけい
          </h1>
          <div className="flex justify-center gap-2 mt-3">
            {['⭐', '🌍', '🔴', '🪐', '⭐'].map((e, i) => (
              <span key={i} className="text-2xl animate-sparkle" style={{ animationDelay: `${i * 0.3}s` }}>
                {e}
              </span>
            ))}
          </div>
        </div>

        {/* Robot mascot */}
        <div className="text-7xl mb-2">🤖</div>

        {/* Buttons */}
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <BigButton onClick={onStart} variant="primary" size="large">
            はじめる
          </BigButton>

          {hasSaveData && (
            <BigButton onClick={onContinue} variant="secondary">
              つづきから
            </BigButton>
          )}

          <BigButton onClick={onEncyclopedia} variant="accent">
            ずかん
          </BigButton>
        </div>

        {/* Sound toggle */}
        <button
          onClick={toggleSound}
          className="mt-4 text-3xl p-3 rounded-full bg-white/10 active:bg-white/20 transition"
        >
          {save.soundEnabled ? '🔊' : '🔇'}
        </button>
      </div>
    </ScreenLayout>
  );
}
