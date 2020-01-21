import { Row, CompareTableClass, Cell, CellType } from '../types/tableTypes'
import { generateRandom } from '../utils/GenerateRandom'
import { oneCellFactory } from './oneCellFactory'

export const oneRowFactory = (
  instance: CompareTableClass,
  type: CellType = CellType.TEXT,
  name: string = '比較ポイント'
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

  instance.data.header.forEach((oneHeader) => {
    row.cells.push(oneCellFactory(row, oneHeader.comparingItemKey))
  })

  return row
}
