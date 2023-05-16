import { useEffect } from "react";
import { useRecoilCallback, useRecoilValue, useRecoilState } from "recoil";
import {
  activeCardAtom,
  activeFilterAtom,
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
  const [activeFilter, setActiveFilter] = useRecoilState(activeFilterAtom);
  const { x: xFilter, y: yFilter } = activeFilter;

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
