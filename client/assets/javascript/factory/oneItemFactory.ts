import { ComparingItem } from '../types/tableTypes';
export const oneItemFactory = (comparingItemKey: string): ComparingItem => {
  return {
    name: 'アイテム',
    comparingItemKey
  };
};
