import { atom, atomFamily, selectorFamily } from "recoil";

import type { operator, Card, CardState, Coords } from "./types";

export const opAtom = atom<operator>({
  key: "opAtom",
  default: "mult",
});

export const sizeAtom = atom<number>({
  key: "sizeAtom",
  default: 12,
});

export const gameStateAtom = atom<"init" | "pre" | "in" | "post">({
  key: "gameStateAtom",
  default: "init",
});

export const getCardStateAtom = atomFamily<CardState, Coords>({
  key: "getCardAtom",
  default: "showValue",
});

export const getCardInputValueAtom = atomFamily<number, Coords>({
  key: "getCardValueAtom",
  default: 0,
});

export const getCardValueAtom = selectorFamily<number, Coords>({
  key: "getCardValueAtom",
  get:
    ([x, y]) =>
    ({ get }) => {
      const state = get(getCardStateAtom([x, y]));
      const inputValue = get(getCardInputValueAtom([x, y]));
      const op = get(opAtom);
      return state === "wrong" ? inputValue : op === "mult" ? x * y : x + y;
    },
});
