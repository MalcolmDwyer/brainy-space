import { useCallback } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { activeCardAtom, activeFilterAtom } from "../atoms";

export const useRowColFilter = () => {
  const [activeFilter, setActiveFilter] = useRecoilState(activeFilterAtom);
  const setActiveCard = useSetRecoilState(activeCardAtom);

  const onFilterRowColumn = useCallback(
    (args: { x?: number | null; y?: number | null }) => {
      const filter = { x: null, y: null, ...args };

      if (filter.x === activeFilter.x && filter.y === activeFilter.y) {
        setActiveFilter({ x: null, y: null });
      } else {
        setActiveFilter(filter);
      }

      setActiveCard(null);
    },
    [activeFilter, setActiveCard, setActiveFilter]
  );

  return onFilterRowColumn;
};
