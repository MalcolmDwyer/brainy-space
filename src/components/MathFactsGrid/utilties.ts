export const getGridStyle = (size: number) => ({
  gridTemplateColumns: `${Array(size + 1)
    .fill("1fr")
    .join(" ")} [end]`,
  gridTemplateRows: `${Array(size + 1)
    .fill("1fr")
    .join(" ")} 2fr`,
});

export const getRowCols = (size: number) => {
  return Array(size)
    .fill(0)
    .map((_, ix) => ix + 1);
};
