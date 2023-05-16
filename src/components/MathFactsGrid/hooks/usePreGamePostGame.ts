import { useEffect, useState } from "react";
import { useRecoilCallback, useRecoilState, useRecoilValue } from "recoil";
import { useInterval, useTimeout } from "usehooks-ts";

import {
  emojiPartyIndexAtom,
  sizeAtom,
  gameStatusAtom,
  getCardStateAtom,
} from "../atoms";
import { getRowsCols } from "../utilties";

const preFlipDelay = 1250;
const postFlipDelay = 1000;
const flipInterval = 50;
const postGameDelay = 750;

export const usePreGamePostGame = () => {
  const size = useRecoilValue(sizeAtom);
  const [gameStatus, setGameStatus] = useRecoilState(gameStatusAtom);
  const [boardFlipIndex, setBoardFlipIndex] = useState(0);
  const [emojiPartyIndex, setEmojiPartyIndex] =
    useRecoilState(emojiPartyIndexAtom);
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

  useTimeout(
    () => {
      setGameStatus("pre");
    },
    gameStatus === "init" ? preFlipDelay : null
  );

  useInterval(
    () => {
      setBoardFlipIndex(boardFlipIndex + 1);
    },
    gameStatus === "pre" && boardFlipIndex < size * 2 ? flipInterval : null
  );

  useInterval(
    () => {
      setEmojiPartyIndex(emojiPartyIndex + 1);
    },
    gameStatus === "post" ? postGameDelay : null
  );

  useEffect(() => {
    let timeout: number | null = null;
    if (boardFlipIndex) {
      flipCards(boardFlipIndex);
    }
    if (boardFlipIndex === size * 2) {
      timeout = setTimeout(() => {
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
        setBoardFlipIndex(0);
        rowsCols.forEach((x) => {
          rowsCols.forEach((y) => {
            set(getCardStateAtom([x, y]), "flipped");
          });
        });
        set(gameStatusAtom, "pre");
      },
    [setGameStatus]
  );

  return { onReplay };
};
