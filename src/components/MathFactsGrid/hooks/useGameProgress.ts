import { useEffect } from "react";
import { useRecoilCallback, useRecoilValue, useRecoilState } from "recoil";
import {
  activeCardAtom,
  sizeAtom,
  gameStatusAtom,
  getCardStateAtom,
} from "../atoms";
import { getRowsCols } from "../utilties";

import type { Coords } from "../types";

export const useGameProgress = () => {
  const size = useRecoilValue(sizeAtom);
  const status = useRecoilValue(gameStatusAtom);
  const rowsCols = getRowsCols(size);
  const [activeCard, setActiveCard] = useRecoilState(activeCardAtom);

  const getNextActive = useRecoilCallback(
    ({ snapshot }) =>
      () => {
        const possibles: Coords[] = [];
        rowsCols.forEach((x) => {
          rowsCols.forEach((y) => {
            if (
              snapshot.getLoadable(getCardStateAtom([x, y])).getValue() ===
              "flipped"
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

      setActiveCard(nextActive);
      // if (activeCard) {
      //   setCardStatus(activeCard, "flipped");
      // }
      // setCardStatus(nextActive, "active");
      // setActiveCard(getNextActive());
    }
  }, [status, activeCard, getNextActive, setActiveCard]);

  // useEffect(() => {
  //   if (activeCard) {
  //     setCardStatus(activeCard, "active");
  //   }
  // }, [activeCard, wrongCard]);

  return {
    activeCard,
  };
};
