import { ActionTree, MutationTree, GetterTree } from 'vuex'

interface RootState {}

interface TableSizeState {
  headWidth: number
  cellWidth: number
  headHeight: number
  cellHeight: number
}

export const name = 'tableSize'

export const state = (): TableSizeState => ({
  headWidth: 140,
  cellWidth: 165,
  headHeight: 40,
  cellHeight: 80,
})

export const getters: GetterTree<TableSizeState, RootState> = {
  headWidth (): string {
    return `${state().headWidth}px`
  },
  cellWidth (): string {
    return `${state().cellWidth}px`
  },
  headHeight (): string {
    return `${state().headHeight}px`
  },
  cellHeight (): string {
    return `${state().cellHeight}px`
  },
  headWidthRaw (): number {
    return state().headWidth
  },
  cellWidthRaw (): number {
    return state().cellWidth
  },
  headHeightRaw (): number {
    return state().headHeight
  },
  cellHeightRaw (): number {
    return state().cellHeight
  },
}

export const mutations: MutationTree<TableSizeState> = {}

export const actions: ActionTree<TableSizeState, RootState> = {}
