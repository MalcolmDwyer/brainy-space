import { useCallback, useEffect, useRef } from "react";
import { useRecoilCallback } from "recoil";

import {
  activeCardAtom,
  getCardStateAtom,
  getCardValueAtom,
  wrongCardAtom,
} from "../atoms";
import type { Coords } from "../types";

interface useInputFieldProps {
  activeCard: Coords | null;
}

export const useInputField = ({ activeCard }: useInputFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (activeCard) {
      inputRef.current?.focus();
    }
  }, [activeCard]);

  const onAnswer = useRecoilCallback(
    ({ snapshot, set }) =>
      (value: string) => {
        const activeCard = snapshot.getLoadable(activeCardAtom).getValue();

        set(wrongCardAtom, null);

        if (activeCard) {
          if (
            parseInt(value, 10) ===
            snapshot.getLoadable(getCardValueAtom(activeCard)).getValue()
          ) {
            set(getCardStateAtom(activeCard), "done");
          } else {
            set(wrongCardAtom, activeCard);
          }
          set(activeCardAtom, null);
        }
        console.log("onAnswer", value);
      },
    []
  );

  const onKeyUp = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      // console.log("onKeyUp", event.target.value, event.key);
      if (inputRef.current?.value && event.key === "Enter") {
        onAnswer(inputRef.current.value);
        inputRef.current.value = "";
      }
    },
    [onAnswer]
  );

  const placeholder = activeCard
    ? `${activeCard[0]} × ${activeCard[1]}`
    : "Click a card to start";

  return {
    placeholder,
    onKeyUp,
    inputRef,
  };
};
