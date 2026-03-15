import { ScreenLayout } from '../components/ScreenLayout';
import { useGame } from '../context/GameContext';
import { planets } from '../data/planets';

export function BadgesScreen() {
  const { hasBadge, isMissionComplete, isQuizComplete } = useGame();

  const allComplete = planets.every(
    (p) => isMissionComplete(p.id) && isQuizComplete(p.id)
  );

  return (
    <ScreenLayout>
      <div className="flex-1 flex flex-col items-center px-6 py-6 gap-5 overflow-y-auto">
        <h2 className="text-2xl font-bold text-star-yellow">バッジ</h2>
        <p className="text-white/60 text-sm">あつめた バッジを みよう！</p>

        <div className="flex flex-col gap-4 w-full max-w-sm">
          {planets.map((planet) => {
            const earned = hasBadge(planet.badge.id);
            return (
              <div
                key={planet.id}
                className={`
                  flex items-center gap-4 p-5 rounded-2xl
                  ${earned ? 'bg-star-yellow/15' : 'bg-white/5 opacity-50'}
                `}
              >
                <span className="text-5xl">{earned ? planet.badge.emoji : '❓'}</span>
                <div className="flex-1">
                  <p className="font-bold text-lg">
                    {earned ? planet.badge.name : '？？？'}
                  </p>
                  <p className="text-sm text-white/60">
                    {earned ? planet.badge.description : 'ミッションとクイズをクリアしよう'}
                  </p>
                </div>
                {earned && <span className="text-3xl">⭐</span>}
              </div>
            );
          })}

          {/* Master badge */}
          <div
            className={`
              flex items-center gap-4 p-5 rounded-2xl border-2
              ${allComplete
                ? 'bg-amber-500/20 border-star-yellow'
                : 'bg-white/5 border-white/10 opacity-50'
              }
            `}
          >
            <span className="text-5xl">{allComplete ? '🏆' : '❓'}</span>
            <div className="flex-1">
              <p className="font-bold text-lg text-star-yellow">
                {allComplete ? 'たいようけい はかせ' : '？？？'}
              </p>
              <p className="text-sm text-white/60">
                {allComplete
                  ? 'すべての ほしを たんけんした！'
                  : 'すべての ほしを クリアしよう'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </ScreenLayout>
  );
}
