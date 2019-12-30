export type CompareTable = {
  header: TableHeader
  rows: Array<Row>
}

export class CompareTableClass {
  data: CompareTable

  isEmpty (): boolean {
    return (
      !this.data || this.data.rows.length === 0 || this.data.header.length === 0
    )
  }
}

export type ComparingItem = {
  name: string
  comparingItemKey: string
  deleted_at?: number
}

export type TableHeader = Array<ComparingItem>

export type ComparingPoint = {
  name: string
  type: CellType
}

export enum CellType {
  URL = 'URL',
  TEXT = 'Text',
  TEXT_WITH_EVALUATION = 'Text with Evaluation',
  IMAGE = 'Image',
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
  WORST = '✕',
  BAD = '△',
  BETTER = '◯',
  BEST = '◎',
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
}
