import { Row, CompareTableClass, Cell, CellType } from '../types/tableTypes';
import { generateRandom } from '../utils/GenerateRandom';

export const oneRowFactory = (instance: CompareTableClass): Row => {
  const cells: Cell[] = [];

  for (let index = 0; index < instance.data.header.length; index++) {
    cells.push({
      type: CellType.TEXT,
      comparingItemKey: generateRandom()
    });
  }

  return {
    head: {
      name: '比較ポイント',
      type: CellType.TEXT
    },
    cells
  };
};
