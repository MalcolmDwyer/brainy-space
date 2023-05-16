import { useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { activeFilter, gameStatusAtom, sizeAtom } from "./atoms";
import { useGameProgress, usePreGamePostGame } from "./hooks";
import { getRowsCols } from "./utilties";

import { Card, InputField } from "./components";

import "./MathFactsGrid.scss";

export function MathFactsGrid() {
  useGameProgress();
  const size = useRecoilValue(sizeAtom);
  const gameStatus = useRecoilValue(gameStatusAtom);
  const setActiveFilter = useSetRecoilState(activeFilter);
  const { onReplay } = usePreGamePostGame();

  const rowsCols = getRowsCols(size);

  let Footer;
  if (gameStatus === "init" || gameStatus === "pre") {
    Footer = "Get Ready...";
  } else if (gameStatus === "post") {
    Footer = (
      <button className="button" type="button" onClick={onReplay}>
        Play Again?
      </button>
    );
  } else {
    Footer = <InputField />;
  }

  const gridStyle = {
    gridTemplateColumns: `${Array(size + 1)
      .fill("1fr")
      .join(" ")} [end]`,
    gridTemplateRows: `${Array(size + 1)
      .fill("1fr")
      .join(" ")} 2fr`,
  };

  const onConstrainColumn = useCallback(
    (n: number, isX: boolean) => {
      if (isX) {
        setActiveFilter({ x: n, y: null });
      } else {
        setActiveFilter({ x: null, y: n });
      }
    },
    [setActiveFilter]
  );

  return (
    <div className="facts-grid">
      <div className="grid" style={gridStyle}>
        <div />
        {rowsCols.map((y) => (
          <div
            className="grid-header"
            key={`col_${y}`}
            onClick={() => onConstrainColumn(y, false)}
          >
            {y}
          </div>
        ))}
        {rowsCols.map((x) => (
          <div key={`row_${x}`} style={{ display: "contents" }}>
            <div
              className="grid-header"
              onClick={() => onConstrainColumn(x, true)}
            >
              {x}
            </div>
            {rowsCols.map((y) => (
              <Card key={`cell_${x},${y}`} x={x} y={y} />
            ))}
          </div>
        ))}
      </div>
      <div className="grid-footer">{Footer}</div>
    </div>
  );
}
