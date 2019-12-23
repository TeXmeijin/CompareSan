import { CompareTableClass } from '../types/tableTypes';
import { generateRandom } from '../utils/GenerateRandom';
import { oneItemFactory } from '../factory/oneItemFactory';
import { oneCellFactory } from '../factory/oneCellFactory';

export const addItemUseCase = (instance: CompareTableClass): CompareTableClass => {
  const comparingItemKey = generateRandom();

  instance.data.header.push(oneItemFactory(comparingItemKey));

  instance.data.rows.forEach(row => {
    row.cells.push(oneCellFactory(row, comparingItemKey));
  });

  return instance;
};
