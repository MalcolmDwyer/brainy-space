import memoizeOne from "memoize-one";

const _getRowsCols = (size: number) => {
  return Array(size)
    .fill(0)
    .map((_, ix) => ix + 1);
};

export const getRowsCols = memoizeOne(_getRowsCols);

export const emojis = [
  "😎",
  "🤩",
  "🤓",
  "🤖",
  "👽",
  "👾",
  "😺",
  "👍",
  "🐶",
  "🐱",
  "🐨",
  "🐸",
  "🐷",
  "🐵",
  "🐧",
  "🍀",
  "🥇",
  "🏆",
  "🏅",
  "🎨",
  "🎧",
  "🎉",
  "🎈",
  "🕶",
  "🐞",
  "🦄",
  "🦋",
  "🐛",
  "🦕",
  "🦖",
  "🐬",
  "🐳",
  "🐉",
  "🦒",
  "💐",
  "🌸",
  "🌻",
  "🌈",
  "🌛",
  "🍎",
  "🥑",
  "🍌",
  "🍕",
  "🍭",
  "🍰",
  "🍪",
  "🍩",
  "🍫",
  "⚽️",
  "🏀",
  "🏈",
  "⚾️",
  "🎾",
  "🏐",
  "🏉",
  "🏒",
  "🥁",
  "🎮",
  "🏵",
  "🎸",
  "🚀",
  "🏰",
  "🛸",
  "🌋",
];

export const getRandomEmoji = () =>
  emojis[Math.floor(Math.random() * emojis.length)];
