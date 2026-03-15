import type { Planet } from './types';

export const planets: Planet[] = [
  {
    id: 'earth',
    name: '地球',
    nameKana: 'ちきゅう',
    description: 'わたしたちが くらしている ほし。みずと いきものが いっぱい！',
    color: '#3b82f6',
    emoji: '🌍',
    facts: [
      { icon: '💧', label: 'うみが たくさん ある' },
      { icon: '🌱', label: 'いきものが いっぱい' },
      { icon: '☁️', label: 'くうきが ある' },
    ],
    mission: {
      type: 'choice',
      instruction: 'いきものが くらしている ほしは どれかな？',
      choices: [
        { label: '地球', isCorrect: true, emoji: '🌍' },
        { label: '火星', isCorrect: false, emoji: '🔴' },
        { label: '土星', isCorrect: false, emoji: '🪐' },
      ],
      successMessage: 'せいかい！ ちきゅうには いきものが たくさん いるよ！',
      failMessage: 'おしい！ いきものが くらしているのは ちきゅう だよ',
    },
    quiz: [
      {
        question: 'ちきゅうの ひょうめんに いちばん おおいのは？',
        choices: ['みず（うみ）', 'すな（さばく）'],
        correctIndex: 0,
        explanation: 'ちきゅうの ひょうめんの やく 70% は うみ だよ！',
      },
      {
        question: 'ちきゅうに あって つきに ないものは？',
        choices: ['くうき', 'いわ'],
        correctIndex: 0,
        explanation: 'ちきゅうには くうきが あるけど、つきには ほとんど ないよ',
      },
      {
        question: 'ちきゅうは たいようから なんばんめの ほし？',
        choices: ['2ばんめ', '3ばんめ', '4ばんめ'],
        correctIndex: 1,
        explanation: 'ちきゅうは たいようから 3ばんめの ほし だよ！',
      },
    ],
    badge: {
      id: 'earth-explorer',
      name: 'ちきゅう はっけん',
      description: 'ちきゅうの ひみつを しらべた！',
      emoji: '🌍',
    },
    unlockOrder: 0,
    nextPlanetId: 'mars',
  },
  {
    id: 'mars',
    name: '火星',
    nameKana: 'かせい',
    description: 'あかっぽい いろを した ほし。「あかい ほし」とも よばれるよ！',
    color: '#ef4444',
    emoji: '🔴',
    facts: [
      { icon: '🔴', label: 'あかっぽい いろ を している' },
      { icon: '🏔️', label: 'たいようけいで いちばん たかい やまが ある' },
      { icon: '🥶', label: 'ちきゅうより とても さむい' },
    ],
    mission: {
      type: 'choice',
      instruction: '「あかい ほし」と よばれている ほしは どれかな？',
      choices: [
        { label: '地球', isCorrect: false, emoji: '🌍' },
        { label: '火星', isCorrect: true, emoji: '🔴' },
        { label: '土星', isCorrect: false, emoji: '🪐' },
      ],
      successMessage: 'せいかい！ かせいは あかっぽい いろの ほし だよ！',
      failMessage: 'おしい！ 「あかい ほし」は かせい のことだよ',
    },
    quiz: [
      {
        question: 'かせいが あかく みえる りゆうは？',
        choices: ['つちに さびた てつが おおいから', 'もえているから'],
        correctIndex: 0,
        explanation: 'かせいの つちには さびた てつが おおくて、それで あかく みえるよ！',
      },
      {
        question: 'かせいは ちきゅうより あたたかい？',
        choices: ['あたたかい', 'さむい'],
        correctIndex: 1,
        explanation: 'かせいは ちきゅうより たいようから とおいから、とても さむいよ！',
      },
      {
        question: 'かせいに ある たいようけいで いちばん おおきい やまは？',
        choices: ['オリンポスやま', 'ふじさん'],
        correctIndex: 0,
        explanation: 'オリンポスやまは たかさ 約 25km！ ふじさんの 7 ばい いじょうだよ！',
      },
    ],
    badge: {
      id: 'mars-explorer',
      name: 'かせい たんけん',
      description: 'かせいの ひみつを しらべた！',
      emoji: '🔴',
    },
    unlockOrder: 1,
    nextPlanetId: 'saturn',
  },
  {
    id: 'saturn',
    name: '土星',
    nameKana: 'どせい',
    description: 'おおきな わっかが とくちょうの きれいな ほし！',
    color: '#eab308',
    emoji: '🪐',
    facts: [
      { icon: '💍', label: 'おおきな わっかが ある' },
      { icon: '💨', label: 'ガスで できている' },
      { icon: '🌊', label: 'みずに うかぶほど かるい' },
    ],
    mission: {
      type: 'choice',
      instruction: 'おおきな「わっか」がある ほしは どれかな？',
      choices: [
        { label: '地球', isCorrect: false, emoji: '🌍' },
        { label: '火星', isCorrect: false, emoji: '🔴' },
        { label: '土星', isCorrect: true, emoji: '🪐' },
      ],
      successMessage: 'せいかい！ どせいには おおきな わっかが あるよ！',
      failMessage: 'おしい！ わっかが あるのは どせい だよ',
    },
    quiz: [
      {
        question: 'どせいの わっかは なにで できている？',
        choices: ['こおりや いわの つぶ', 'にじの ひかり'],
        correctIndex: 0,
        explanation: 'どせいの わっかは こおりや いわの ちいさな つぶが あつまって できているよ！',
      },
      {
        question: 'どせいを みずに いれたら どうなる？',
        choices: ['うかぶ', 'しずむ'],
        correctIndex: 0,
        explanation: 'どせいは ガスで できていて とても かるいので、おおきな プールが あったら うかぶよ！',
      },
      {
        question: 'どせいは たいようから なんばんめの ほし？',
        choices: ['4ばんめ', '6ばんめ', '8ばんめ'],
        correctIndex: 1,
        explanation: 'どせいは たいようから 6ばんめの ほし だよ！',
      },
    ],
    badge: {
      id: 'saturn-explorer',
      name: 'どせい マスター',
      description: 'どせいの ひみつを しらべた！',
      emoji: '🪐',
    },
    unlockOrder: 2,
    nextPlanetId: null,
  },
];

export const getPlanet = (id: string): Planet | undefined =>
  planets.find((p) => p.id === id);
