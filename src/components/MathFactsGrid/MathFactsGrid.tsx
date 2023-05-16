import { useRecoilValue } from "recoil";

import { sizeAtom } from "./atoms";
import { usePreGamePostGame } from "./hooks";
import { getGridStyle, getRowCols } from "./utilties";

import { Card } from "./components/Card";

import "./MathFactsGrid.scss";

export function MathFactsGrid() {
  const size = useRecoilValue(sizeAtom);
  usePreGamePostGame();

  const gridStyle = getGridStyle(size);
  const rowsCols = getRowCols(size);

  return (
    <div className="facts-grid">
      <div className="grid" style={gridStyle}>
        <div />
        {rowsCols.map((y) => (
          <div className="grid-header" key={`col_${y}`}>
            {y}
          </div>
        ))}
        {rowsCols.map((x) => (
          <>
            <div className="grid-header" key={`row_${x}`}>
              {x}
            </div>
            {rowsCols.map((y) => (
              <Card key={`cell_${x},${y}`} x={x} y={y} />
            ))}
          </>
        ))}
      </div>
      <div className="grid-footer">Footer</div>
    </div>
  );
}
