import {
  ActionTree,
  MutationTree,
} from 'vuex';

interface RootState { }

interface TableSizeState {
  headWidth: number,
  cellWidth: number,
  headHeight: number,
}

export const name = 'tableSize';

export const state = (): TableSizeState => ({
  headWidth: 90,
  cellWidth: 120,
  headHeight: 60,
});

export const mutations: MutationTree<TableSizeState> = {
};

export const actions: ActionTree<TableSizeState, RootState> = {
};
