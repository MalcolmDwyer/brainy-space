import { useRecoilValue, useRecoilState } from "recoil";
import {
  getCardStateAtom,
  getCardDisplayAtom,
  activeCardAtom,
  activeFilterAtom,
  wrongCardAtom,
} from "../../atoms";

import "./Card.scss";

interface CardProps {
  x: number;
  y: number;
}

export function Card({ x, y }: CardProps) {
  const status = useRecoilValue(getCardStateAtom([x, y]));
  const value = useRecoilValue(getCardDisplayAtom([x, y]));
  const [activeCard, setActiveCard] = useRecoilState(activeCardAtom);
  const wrongCard = useRecoilValue(wrongCardAtom);
  const { x: xFilter, y: yFilter } = useRecoilValue(activeFilterAtom);

  const active = activeCard?.[0] === x && activeCard?.[1] === y;
  const wrong = wrongCard?.[0] === x && wrongCard?.[1] === y;

  const back = status === "done" ? value : "?";

  const className = `grid-cell card ${active ? "active" : ""} ${
    wrong ? "wrong" : ""
  } ${!active && !wrong ? status : ""} ${
    xFilter === x || yFilter === y ? "constrained" : ""
  }`;

  const onClick = () => {
    setActiveCard([x, y]);
  };

  return (
    <div className={className} onClick={onClick}>
      <figure className="front">{value}</figure>
      <figure className="back">{back}</figure>
    </div>
  );
}
