import { Row, CellType } from '../types/tableTypes'

export const changeRowType = (row: Row, newType: CellType): Row => {
  row.head.type = newType

  row.cells = row.cells.map(cell => {
    cell.type = newType
    return cell
  })
  return row
}
