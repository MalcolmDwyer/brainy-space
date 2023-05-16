import { useEffect } from "react";
import { useRecoilCallback, useRecoilValue, useRecoilState } from "recoil";
import {
  activeCardAtom,
  activeFilter,
  sizeAtom,
  gameStatusAtom,
  getCardStateAtom,
} from "../atoms";
import { getRowsCols } from "../utilties";

import type { Coords } from "../types";

export const useGameProgress = () => {
  const size = useRecoilValue(sizeAtom);
  const [status, setStatus] = useRecoilState(gameStatusAtom);
  const rowsCols = getRowsCols(size);
  const [activeCard, setActiveCard] = useRecoilState(activeCardAtom);
  const { x: xFilter, y: yFilter } = useRecoilValue(activeFilter);

  const getNextActive = useRecoilCallback(
    ({ snapshot }) =>
      () => {
        const possibles: Coords[] = [];
        rowsCols.forEach((x) => {
          rowsCols.forEach((y) => {
            if (
              snapshot.getLoadable(getCardStateAtom([x, y])).getValue() ===
                "flipped" &&
              (xFilter === null || xFilter === x) &&
              (yFilter === null || yFilter === y)
            ) {
              possibles.push([x, y]);
            }
          });
        });
        return possibles[Math.floor(Math.random() * possibles.length)];
      },
    [rowsCols]
  );

  useEffect(() => {
    if (status === "in" && !activeCard) {
      const nextActive = getNextActive();

      if (nextActive) {
        setActiveCard(nextActive);
      } else {
        setStatus("post");
      }
    }
  }, [status, activeCard, getNextActive, setActiveCard, setStatus]);

  return {
    activeCard,
  };
};
