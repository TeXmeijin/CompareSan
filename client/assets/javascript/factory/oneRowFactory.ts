import { Row, Cell, CellType, CompareTable } from '../types/tableTypes'
import { generateRandom } from '../utils/GenerateRandom'
import { oneCellFactory } from './oneCellFactory'

export const oneRowFactory = (
  instance: CompareTable,
  type: CellType = CellType.TEXT_WITH_EVALUATION,
  name: string = '...'
): Row => {
  const cells: Cell[] = []

  const row = {
    head: {
      name,
      type,
    },
    cells,
    rowKey: generateRandom(),
  }

  instance.header.forEach((oneHeader) => {
    row.cells.push(oneCellFactory(row, oneHeader.comparingItemKey))
  })

  return row
}
