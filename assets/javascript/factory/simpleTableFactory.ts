import { CompareTableClass, CellType } from '../types/tableTypes'
import { generateRandom } from '../utils/GenerateRandom'
import { oneRowFactory } from './oneRowFactory'
export const simpleTableFactory = function (): CompareTableClass {
  const table = {
    header: [
      {
        name: '製品A',
        comparingItemKey: generateRandom(),
      },
      {
        name: '製品B',
        comparingItemKey: generateRandom(),
      },
    ],
    rows: [],
  }

  const instance = new CompareTableClass()
  instance.data = table
  instance.data.rows.push(oneRowFactory(instance))
  instance.data.rows.push(
    oneRowFactory(instance, CellType.TEXT_WITH_EVALUATION)
  )

  return instance
}
