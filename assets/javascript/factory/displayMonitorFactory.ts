import { CompareTableClass } from '../types/tableTypes';
import { oneRowFactory } from './oneRowFactory';
export const displayMonitorFactory = function (): CompareTableClass {
  const table = {
    header: [
      {
        name: 'test',
        comparingItemKey: '1'
      },
      {
        name: 'test2',
        comparingItemKey: '2'
      }
    ],
    rows: [
    ]
  };

  const instance = new CompareTableClass();
  instance.data = table;
  instance.data.rows.push(oneRowFactory(instance));

  return instance;
};

