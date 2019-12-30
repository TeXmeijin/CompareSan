import { CompareTableClass, CellType } from '../types/tableTypes'
import { oneRowFactory } from './oneRowFactory'
import { generateRandom } from '../utils/GenerateRandom'
export const displayMonitorFactory = function(): CompareTableClass {
  const table = {
    header: [
      {
        name: 'test',
        comparingItemKey: generateRandom(),
      },
      {
        name: 'test2',
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
