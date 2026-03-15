import { ScreenLayout } from '../components/ScreenLayout';
import { BigButton } from '../components/BigButton';
import { getPlanet, planets } from '../data/planets';
import { useGame } from '../context/GameContext';

interface Props {
  planetId: string;
  quizScore?: number;
  quizTotal?: number;
  type: 'mission' | 'quiz' | 'planet-complete';
  onContinue: () => void;
}

export function ResultScreen({ planetId, quizScore, quizTotal, type, onContinue }: Props) {
  const planet = getPlanet(planetId);
  const { isMissionComplete, isQuizComplete, earnBadge, unlockPlanet, hasBadge } = useGame();

  if (!planet) return null;

  const missionDone = isMissionComplete(planetId);
  const quizDone = isQuizComplete(planetId);
  const planetComplete = missionDone && quizDone;
  const badgeEarned = hasBadge(planet.badge.id);

  // Award badge and unlock next if planet is complete
  if (planetComplete && !badgeEarned) {
    earnBadge(planet.badge.id);
    if (planet.nextPlanetId) {
      unlockPlanet(planet.nextPlanetId);
    }
  }

  const allComplete = planets.every(
    (p) => isMissionComplete(p.id) && isQuizComplete(p.id)
  );

  return (
    <ScreenLayout>
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
        {type === 'mission' && (
          <div className="animate-pop-in text-center">
            <span className="text-8xl block mb-4">🎯</span>
            <h2 className="text-3xl font-bold text-green-400 mb-2">ミッション クリア！</h2>
            <p className="text-lg text-white/80">{planet.name} の ミッションを クリアしたよ！</p>
          </div>
        )}

        {type === 'quiz' && (
          <div className="animate-pop-in text-center">
            <span className="text-8xl block mb-4">📝</span>
            <h2 className="text-3xl font-bold text-star-cyan mb-2">クイズ けっか</h2>
            <div className="bg-white/10 rounded-2xl p-6 mb-3">
              <p className="text-5xl font-bold text-star-yellow">
                {quizScore} / {quizTotal}
              </p>
              <p className="text-white/70 mt-2">もん せいかい！</p>
            </div>
            {quizScore === quizTotal && (
              <p className="text-xl text-star-yellow font-bold">パーフェクト！ すごい！</p>
            )}
          </div>
        )}

        {planetComplete && (
          <div className="animate-pop-in text-center mt-4">
            <div className="bg-star-yellow/20 rounded-3xl p-6 max-w-sm">
              <span className="text-6xl block mb-3">{planet.badge.emoji}</span>
              <h3 className="text-2xl font-bold text-star-yellow mb-1">バッジ かくとく！</h3>
              <p className="text-lg font-bold">{planet.badge.name}</p>
              <p className="text-white/70 text-sm mt-1">{planet.badge.description}</p>
            </div>

            {planet.nextPlanetId && (
              <div className="mt-5 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <span className="text-5xl block mb-2">🔓</span>
                <p className="text-xl text-star-cyan font-bold">
                  {getPlanet(planet.nextPlanetId)?.name} が かいほう されたよ！
                </p>
              </div>
            )}

            {allComplete && (
              <div className="mt-5 animate-slide-up" style={{ animationDelay: '0.5s' }}>
                <span className="text-6xl block mb-2">🏆</span>
                <p className="text-2xl text-star-yellow font-bold">
                  たいようけい はかせ に なったよ！
                </p>
                <p className="text-white/70 mt-1">すべての ほしを たんけん した！ おめでとう！</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-4">
          <BigButton onClick={onContinue} variant="primary" size="large">
            {planetComplete && planet.nextPlanetId
              ? 'つぎの ほしへ！'
              : 'マップに もどる'}
          </BigButton>
        </div>
      </div>
    </ScreenLayout>
  );
}
