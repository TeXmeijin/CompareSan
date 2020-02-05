export type CompareTable = {
  header: TableHeader
  rows: Array<Row>
}

export class CompareTableClass {
  data: CompareTable
}

export type ComparingItem = {
  name: string
  comparingItemKey: string
  price?: number
  url?: string
  deleted_at?: number
}

export type TableHeader = Array<ComparingItem>

export type ComparingPoint = {
  name: string
  type: CellType
  description?: string
}

export enum CellType {
  URL = 'URL',
  TEXT = '仕様',
  TEXT_WITH_EVALUATION = '仕様と自己評価',
}

export interface Cell {
  type: CellType
  comparingItemKey: string
}

export interface TextCell extends Cell {
  value: string
}

export interface UrlCell extends Cell {
  value: string
}

export interface TextWithEvaluationCell extends Cell {
  value: string
  evaluate: number
}

export type Evaluate = {
  level: number
  levelString: EvaluateString
}

export enum EvaluateString {
  WORST = '×悪い',
  BAD = '△微妙',
  BETTER = '○良い',
  BEST = '◎最高',
}

export type Row = {
  head: ComparingPoint
  cells: Array<Cell>
  rowKey: string
  deleted_at?: number
}

export type Summary = {
  comparingItemKey: string
  value: number
  price?: number
}

export const MasterEvaluateItemList = [
  {
    level: -2,
    levelString: EvaluateString.WORST,
  },
  {
    level: -1,
    levelString: EvaluateString.BAD,
  },
  {
    level: 1,
    levelString: EvaluateString.BETTER,
  },
  {
    level: 2,
    levelString: EvaluateString.BEST,
  },
]
