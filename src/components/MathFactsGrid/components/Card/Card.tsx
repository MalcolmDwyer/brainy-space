import { useRecoilState, useRecoilValue } from "recoil";
import { getCardStateAtom, getCardValueAtom } from "../../atoms";

import "./Card.scss";

export function Card({ x, y }: { x: number; y: number }) {
  const [status, setStatus] = useRecoilState(getCardStateAtom([x, y]));
  const value = useRecoilValue(getCardValueAtom([x, y]));

  const back = status === "done" ? value : "?";

  const className = `grid-cell card ${status}`;

  return (
    <div className={className}>
      <figure className="front">{value}</figure>
      <figure className="back">{back}</figure>
    </div>
  );
}
