import { Row } from '../types/tableTypes';

export const oneCellFactory = (row: Row, comparingItemKey: string) => {
  return {
    type: row.head.type,
    comparingItemKey
  };
};
