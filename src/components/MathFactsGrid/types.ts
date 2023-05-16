export type operator = "mult" | "add";

export type Coords = [number, number];

export type CardState = "active" | "done" | "wrong" | "showValue" | "flipped";

export interface Card {
  state: CardState;
  value: number;
}
