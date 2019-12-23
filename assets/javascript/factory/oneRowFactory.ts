import { Row, CompareTableClass, Cell, CellType } from '../types/tableTypes';
import { generateRandom } from '../utils/GenerateRandom';

export const oneRowFactory = (instance: CompareTableClass): Row => {
  const cells: Cell[] = [];

  instance.data.header.forEach(oneHeader => {
    cells.push({
      type: CellType.TEXT,
      comparingItemKey: oneHeader.comparingItemKey
    });
  });

  return {
    head: {
      name: '比較ポイント',
      type: CellType.TEXT
    },
    cells,
    rowKey: generateRandom()
  };
};
