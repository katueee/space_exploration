import { useState } from 'react';
import { ScreenLayout } from '../components/ScreenLayout';
import { BigButton } from '../components/BigButton';
import { getPlanet } from '../data/planets';
import { useGame } from '../context/GameContext';

interface Props {
  planetId: string;
  onComplete: (score: number, total: number) => void;
  onBack: () => void;
}

export function QuizScreen({ planetId, onComplete, onBack }: Props) {
  const planet = getPlanet(planetId);
  const { completeQuiz } = useGame();
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  if (!planet) return null;

  const quiz = planet.quiz;
  const question = quiz[currentQ];
  const isCorrect = selected === question.correctIndex;

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    if (index === question.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < quiz.length - 1) {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      const finalScore = score;
      completeQuiz(planetId, finalScore);
      onComplete(finalScore, quiz.length);
    }
  };

  return (
    <ScreenLayout>
      <div className="flex-1 flex flex-col items-center px-6 py-6 gap-5">
        <button
          onClick={onBack}
          className="self-start text-white/70 active:text-white text-lg flex items-center gap-1"
        >
          ← もどる
        </button>

        {/* Progress */}
        <div className="flex items-center gap-2">
          <span className="text-star-yellow font-bold text-lg">
            {currentQ + 1} / {quiz.length}
          </span>
          <div className="flex gap-1">
            {quiz.map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i < currentQ ? 'bg-star-yellow' :
                  i === currentQ ? 'bg-star-cyan' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Question */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-5 max-w-sm w-full">
          <p className="text-xl leading-relaxed text-center font-bold">{question.question}</p>
        </div>

        {/* Choices */}
        <div className="flex flex-col gap-3 w-full max-w-sm">
          {question.choices.map((choice, i) => {
            let bg = 'bg-white/10';
            if (answered) {
              if (i === question.correctIndex) {
                bg = 'bg-green-500/30 ring-2 ring-green-400';
              } else if (i === selected) {
                bg = 'bg-red-500/30 ring-2 ring-red-400';
              }
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={answered}
                className={`
                  ${bg} rounded-2xl p-4 text-lg font-bold text-center
                  transition-all active:scale-98
                  disabled:active:scale-100
                `}
              >
                {choice}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {answered && (
          <div className="animate-slide-up text-center max-w-sm">
            {isCorrect ? (
              <>
                <span className="text-5xl block mb-2">🎉</span>
                <p className="text-xl text-green-400 font-bold mb-2">すごい！ せいかい！</p>
              </>
            ) : (
              <>
                <span className="text-5xl block mb-2">💡</span>
                <p className="text-xl text-amber-300 font-bold mb-2">おしい！</p>
              </>
            )}
            <p className="text-base text-white/80 mb-4">{question.explanation}</p>
            <BigButton
              onClick={handleNext}
              variant={currentQ < quiz.length - 1 ? 'secondary' : 'primary'}
            >
              {currentQ < quiz.length - 1 ? 'つぎの もんだい' : 'けっかを みる'}
            </BigButton>
          </div>
        )}
      </div>
    </ScreenLayout>
  );
}
