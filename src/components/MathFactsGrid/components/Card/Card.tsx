import { useRecoilValue } from "recoil";
import {
  getCardStateAtom,
  getCardValueAtom,
  activeCardAtom,
  wrongCardAtom,
} from "../../atoms";

import "./Card.scss";

export function Card({ x, y }: { x: number; y: number }) {
  const status = useRecoilValue(getCardStateAtom([x, y]));
  const value = useRecoilValue(getCardValueAtom([x, y]));
  const activeCard = useRecoilValue(activeCardAtom);
  const wrongCard = useRecoilValue(wrongCardAtom);

  const active = activeCard?.[0] === x && activeCard?.[1] === y;
  const wrong = wrongCard?.[0] === x && wrongCard?.[1] === y;

  const back = status === "done" ? value : "?";

  // console.log(`Card(${x},${y})`, { status, value, back, active });

  const className = `grid-cell card ${active ? "active" : ""} ${
    wrong ? "wrong" : ""
  } ${!active && !wrong ? status : ""}`;

  return (
    <div className={className}>
      <figure className="front">{value}</figure>
      <figure className="back">{back}</figure>
    </div>
  );
}
