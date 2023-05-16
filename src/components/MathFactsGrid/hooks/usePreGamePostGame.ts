import { useEffect, useState } from "react";
import { useRecoilCallback, useRecoilState, useRecoilValue } from "recoil";
import { useInterval, useTimeout } from "usehooks-ts";

import { sizeAtom, gameStatusAtom, getCardStateAtom } from "../atoms";
import { getRowsCols } from "../utilties";

const preFlipDelay = 1250;
const postFlipDelay = 1000;
const flipInterval = 50;
// const postGameDelay = 1000;

export const usePreGamePostGame = () => {
  const size = useRecoilValue(sizeAtom);
  const [gameStatus, setGameStatus] = useRecoilState(gameStatusAtom);
  const [boardFlipIndex, setBoardFlipIndex] = useState(0);
  const rowsCols = getRowsCols(size);

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
    setGameStatus("pre");
  }, preFlipDelay);

  useInterval(
    () => {
      setBoardFlipIndex((boardFlipIndex + 1) % (size * size));
    },
    gameStatus === "pre" && boardFlipIndex < size * 2 ? flipInterval : null
  );

  useEffect(() => {
    let timeout: number | null = null;
    if (boardFlipIndex) {
      flipCards(boardFlipIndex);
    }
    if (boardFlipIndex === size * 2) {
      timeout = setTimeout(() => {
        console.log("setting game to in");
        setGameStatus("in");
      }, postFlipDelay);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [boardFlipIndex, flipCards, setGameStatus, size]);

  const onReplay = useRecoilCallback(
    ({ set }) =>
      () => {
        set(gameStatusAtom, "init");
      },
    [setGameStatus]
  );

  return { onReplay };
};
