import { atom, atomFamily, selectorFamily } from "recoil";

import type { operator, CardState, Coords } from "./types";

export const opAtom = atom<operator>({
  key: "opAtom",
  default: "mult",
});

export const sizeAtom = atom<number>({
  key: "sizeAtom",
  default: 12,
});

export const gameStatusAtom = atom<"init" | "pre" | "in" | "post">({
  key: "gameStatusAtom",
  default: "init",
});

// Atom family is a function that returns an atom.
export const getCardStateAtom = atomFamily<CardState, Coords>({
  key: "getCardAtom",
  default: "showValue",
});

export const getCardValueAtom = selectorFamily<number, Coords>({
  key: "getCardValueAtom",
  get:
    ([x, y]) =>
    ({ get }) => {
      const op = get(opAtom);
      return op === "mult" ? x * y : x + y;
    },
});

export const activeCardAtom = atom<Coords | null>({
  key: "activeCardAtom",
  default: null,
});

export const wrongCardAtom = atom<Coords | null>({
  key: "wrongCardAtom",
  default: null,
});
