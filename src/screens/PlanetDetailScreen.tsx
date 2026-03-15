import { ScreenLayout } from '../components/ScreenLayout';
import { BigButton } from '../components/BigButton';
import { PlanetImage } from '../components/PlanetImage';
import { useGame } from '../context/GameContext';
import { getPlanet } from '../data/planets';

interface Props {
  planetId: string;
  onMission: () => void;
  onQuiz: () => void;
  onBack: () => void;
}

export function PlanetDetailScreen({ planetId, onMission, onQuiz, onBack }: Props) {
  const planet = getPlanet(planetId);
  const { isMissionComplete, isQuizComplete, hasBadge } = useGame();

  if (!planet) return null;

  const missionDone = isMissionComplete(planetId);
  const quizDone = isQuizComplete(planetId);
  const badgeEarned = hasBadge(planet.badge.id);

  return (
    <ScreenLayout>
      <div className="flex-1 flex flex-col items-center px-6 py-6 gap-5 overflow-y-auto">
        {/* Back button */}
        <button
          onClick={onBack}
          className="self-start text-white/70 active:text-white text-lg flex items-center gap-1"
        >
          ← もどる
        </button>

        {/* Planet image */}
        <div className="animate-pop-in">
          <PlanetImage planetId={planetId} size="large" />
        </div>

        {/* Planet name */}
        <div className="text-center">
          <h2 className="text-3xl font-bold" style={{ color: planet.color }}>
            {planet.name}
          </h2>
          <p className="text-white/60 text-sm">{planet.nameKana}</p>
        </div>

        {/* Description */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-5 max-w-sm w-full">
          <p className="text-lg leading-relaxed text-center">{planet.description}</p>
        </div>

        {/* Facts */}
        <div className="flex flex-col gap-3 w-full max-w-sm">
          {planet.facts.map((fact, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-white/5 rounded-xl p-3 animate-slide-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <span className="text-3xl">{fact.icon}</span>
              <span className="text-base">{fact.label}</span>
            </div>
          ))}
        </div>

        {/* Badge status */}
        {badgeEarned && (
          <div className="bg-star-yellow/20 rounded-2xl p-3 flex items-center gap-2">
            <span className="text-2xl">{planet.badge.emoji}</span>
            <span className="text-star-yellow font-bold">{planet.badge.name} かくとく！</span>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col gap-3 w-full max-w-xs pb-6">
          <BigButton
            onClick={onMission}
            variant={missionDone ? 'success' : 'primary'}
          >
            {missionDone ? '✅ ミッション クリア' : '🎯 ミッションに いく'}
          </BigButton>

          <BigButton
            onClick={onQuiz}
            variant={quizDone ? 'success' : 'secondary'}
          >
            {quizDone ? '✅ クイズ クリア' : '❓ クイズに ちょうせん'}
          </BigButton>
        </div>
      </div>
    </ScreenLayout>
  );
}
