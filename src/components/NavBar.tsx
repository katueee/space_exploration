interface Props {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

const tabs = [
  { id: 'encyclopedia', label: 'ずかん', icon: '📖' },
  { id: 'quiz-select', label: 'クイズ', icon: '❓' },
  { id: 'map', label: 'ホーム', icon: '🚀' },
  { id: 'badges', label: 'バッジ', icon: '🏅' },
];

export function NavBar({ currentScreen, onNavigate }: Props) {
  return (
    <nav className="flex-shrink-0 bg-space-navy/90 backdrop-blur border-t border-white/10">
      <div className="flex justify-around py-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className={`
              flex flex-col items-center gap-0.5 px-4 py-1 rounded-lg transition-colors
              ${currentScreen === tab.id ? 'text-star-yellow' : 'text-white/60'}
            `}
          >
            <span className="text-2xl">{tab.icon}</span>
            <span className="text-xs font-bold">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
