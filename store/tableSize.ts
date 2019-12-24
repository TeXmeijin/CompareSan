import { ActionTree, MutationTree, GetterTree } from 'vuex'

interface RootState {}

interface TableSizeState {
  headWidth: number
  cellWidth: number
  headHeight: number
}

export const name = 'tableSize'

export const state = (): TableSizeState => ({
  headWidth: 120,
  cellWidth: 165,
  headHeight: 40,
})

export const getters: GetterTree<TableSizeState, RootState> = {
  headWidth(): string {
    return `${state().headWidth}px`
  },
  cellWidth(): string {
    return `${state().cellWidth}px`
  },
  headHeight(): string {
    return `${state().headHeight}px`
  },
}

export const mutations: MutationTree<TableSizeState> = {}

export const actions: ActionTree<TableSizeState, RootState> = {}
