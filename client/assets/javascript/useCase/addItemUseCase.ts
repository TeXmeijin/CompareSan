import { CompareTable } from '../types/tableTypes'
import { generateRandom } from '../utils/GenerateRandom'
import { oneItemFactory } from '../factory/oneItemFactory'
import { oneCellFactory } from '../factory/oneCellFactory'

export const addItemUseCase = (instance: CompareTable): CompareTable => {
  const comparingItemKey = generateRandom()

  instance.header.push(oneItemFactory(comparingItemKey))

  instance.rows.forEach((row) => {
    row.cells.push(oneCellFactory(row, comparingItemKey))
  })

  return instance
}
