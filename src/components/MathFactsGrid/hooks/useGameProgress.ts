import { useCallback, useEffect } from "react";
import { useRecoilCallback, useRecoilValue, useRecoilState } from "recoil";
import {
  activeCardAtom,
  activeFilterAtom,
  sizeAtom,
  gameStatusAtom,
  getCardStateAtom,
  opAtom,
} from "../atoms";
import { getRowsCols } from "../utilties";

import type { Coords } from "../types";

export const useGameProgress = () => {
  const size = useRecoilValue(sizeAtom);
  const op = useRecoilValue(opAtom);
  const [status, setStatus] = useRecoilState(gameStatusAtom);
  const rowsCols = getRowsCols(size);
  const [activeCard, setActiveCard] = useRecoilState(activeCardAtom);
  const [activeFilter, setActiveFilter] = useRecoilState(activeFilterAtom);
  const { x: xFilter, y: yFilter } = activeFilter;

  const cardValue = useCallback(
    ([x, y]: [x: number, y: number]) => {
      if (op === "mult") {
        return x * y;
      } else if (op === "add") {
        return x + y;
      } else {
        throw new Error(`Invalid operator: ${op}`);
      }
    },
    [op]
  );

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

        // Sort by card value
        possibles.sort((a, b) => (cardValue(a) < cardValue(b) ? -1 : 1));

        // Weight cards into 4 bins so the lower numbers will be selected more often
        // Use multiple copies of more likely cards to increase their weight
        const numBins = 4;
        const weightedPossibles = possibles.flatMap((coords, index, all) => {
          const weight = numBins - Math.floor(numBins * (index / all.length));
          return Array(weight).fill(coords);
        });

        const random = Math.floor(Math.random() * weightedPossibles.length);
        return weightedPossibles[random];
      },
    [rowsCols, xFilter, yFilter]
  );

  useEffect(() => {
    if (status === "in" && !activeCard) {
      const nextActive = getNextActive();

      if (nextActive) {
        setActiveCard(nextActive);
      } else if (xFilter !== null || yFilter !== null) {
        setActiveFilter({ x: null, y: null });
      } else {
        setStatus("post");
      }
    }
  }, [
    status,
    activeCard,
    getNextActive,
    setActiveCard,
    setStatus,
    xFilter,
    yFilter,
    setActiveFilter,
  ]);

  return {
    activeCard,
  };
};
