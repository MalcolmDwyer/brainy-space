import { useEffect, useState } from "react";
import { useRecoilCallback, useRecoilState, useRecoilValue } from "recoil";
import { useInterval, useTimeout } from "usehooks-ts";

import { sizeAtom, gameStateAtom, getCardStateAtom } from "../atoms";
import { getRowCols } from "../utilties";

const preFlipDelay = 2500;
const postFlipDelay = 1000;
const flipInterval = 100;
const postGameDelay = 1000;

export const usePreGamePostGame = () => {
  const size = useRecoilValue(sizeAtom);
  const [gameState, setGameState] = useRecoilState(gameStateAtom);
  const [boardFlipIndex, setBoardFlipIndex] = useState(0);
  const rowsCols = getRowCols(size);

  const flipCards = useRecoilCallback(
    ({ set }) =>
      (ix) => {
        rowsCols.forEach((x) => {
          rowsCols.forEach((y) => {
            if (x + y === ix) {
              set(getCardStateAtom([x, y]), "flipped");
            }
          });
        });
      },
    []
  );

  useTimeout(() => {
    setGameState("pre");
  }, preFlipDelay);

  useInterval(
    () => {
      setBoardFlipIndex((boardFlipIndex + 1) % (size * size));
    },
    gameState === "pre" && boardFlipIndex < size * 2 ? flipInterval : null
  );

  useEffect(() => {
    if (boardFlipIndex) {
      flipCards(boardFlipIndex);
    }
    if (boardFlipIndex === size * 2) {
      setTimeout(() => {
        setGameState("in");
      }, postFlipDelay);
    }
  }, [boardFlipIndex, flipCards, setGameState, size]);
};
