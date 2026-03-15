import { useState } from 'react';
import { ScreenLayout } from '../components/ScreenLayout';
import { BigButton } from '../components/BigButton';

interface Props {
  onComplete: () => void;
}

const steps = [
  {
    emoji: '🤖',
    text: 'やあ！ ぼくは ナビロボ。\nうちゅう たんけんたいの あんないロボットだよ！',
  },
  {
    emoji: '🚀',
    text: 'きみは きょうから\nうちゅう たんけんたいの なかまだ！',
  },
  {
    emoji: '🌍',
    text: 'たいようけいの ほしを めぐって\nひみつを しらべよう！',
  },
  {
    emoji: '📖',
    text: 'ぜんぶの ほしを しらべたら\n「たいようけい はかせ」に なれるよ！',
  },
];

export function IntroScreen({ onComplete }: Props) {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const current = steps[step];

  return (
    <ScreenLayout>
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-8">
        <div className="animate-pop-in" key={step}>
          <span className="text-8xl block mb-6">{current.emoji}</span>
        </div>

        <div
          className="bg-white/10 backdrop-blur rounded-3xl p-6 max-w-sm w-full animate-slide-up"
          key={`text-${step}`}
        >
          <p className="text-xl leading-relaxed whitespace-pre-line text-center">
            {current.text}
          </p>
        </div>

        <div className="flex items-center gap-3 mt-4">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-colors ${
                i === step ? 'bg-star-yellow' : 'bg-white/30'
              }`}
            />
          ))}
        </div>

        <BigButton onClick={handleNext} variant={step === steps.length - 1 ? 'primary' : 'secondary'}>
          {step === steps.length - 1 ? 'たんけん スタート！' : 'つぎへ'}
        </BigButton>
      </div>
    </ScreenLayout>
  );
}
