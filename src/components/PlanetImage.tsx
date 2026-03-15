interface Props {
  planetId: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const sizeMap = {
  small: 'w-16 h-16',
  medium: 'w-32 h-32',
  large: 'w-48 h-48',
};

const planetEmojis: Record<string, string> = {
  earth: '🌍',
  mars: '🔴',
  saturn: '🪐',
  sun: '☀️',
};

const planetColors: Record<string, string> = {
  earth: 'from-blue-400 to-green-500',
  mars: 'from-red-500 to-orange-700',
  saturn: 'from-yellow-400 to-amber-600',
  sun: 'from-yellow-300 to-orange-500',
};

export function PlanetImage({ planetId, size = 'medium', className = '' }: Props) {
  return (
    <div
      className={`
        ${sizeMap[size]}
        rounded-full
        bg-gradient-to-br ${planetColors[planetId] ?? 'from-gray-400 to-gray-600'}
        flex items-center justify-center
        shadow-xl
        ${className}
      `}
    >
      <span className={size === 'large' ? 'text-7xl' : size === 'medium' ? 'text-5xl' : 'text-3xl'}>
        {planetEmojis[planetId] ?? '⭐'}
      </span>
    </div>
  );
}
