import { CompareTableClass, CellType } from '../types/tableTypes';
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
      {
        head: {
          name: '比較ポイント１',
          type: CellType.TEXT
        },
        cells: [
          {
            type: CellType.TEXT,
            comparingItemKey: '2'
          },
          {
            type: CellType.TEXT,
            comparingItemKey: '1'
          }
        ]
      }
    ]
  };

  const instance = new CompareTableClass();
  instance.data = table;

  return instance;
};
