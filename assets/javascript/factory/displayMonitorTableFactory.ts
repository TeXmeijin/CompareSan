import { CompareTableClass, CellType } from '../types/tableTypes'
import { generateRandom } from '../utils/GenerateRandom'
import { oneRowFactory } from './oneRowFactory'
export const displayMonitorTableFactory = function (): CompareTableClass {
  const table = {
    header: [
      {
        name: 'モニターA',
        comparingItemKey: generateRandom(),
      },
      {
        name: 'モニターB',
        comparingItemKey: generateRandom(),
      },
    ],
    rows: [],
  }

  const instance = new CompareTableClass()
  instance.data = table
  instance.data.rows.push(oneRowFactory(instance, CellType.URL, '商品URL'))
  instance.data.rows.push(
    oneRowFactory(instance, CellType.TEXT_WITH_EVALUATION, '価格')
  )
  instance.data.rows.push(
    oneRowFactory(instance, CellType.TEXT_WITH_EVALUATION, '画面サイズ(型)')
  )
  instance.data.rows.push(
    oneRowFactory(instance, CellType.TEXT_WITH_EVALUATION, '高さ調節機能')
  )
  instance.data.rows.push(
    oneRowFactory(instance, CellType.TEXT_WITH_EVALUATION, 'HDR対応')
  )
  instance.data.rows.push(
    oneRowFactory(instance, CellType.TEXT_WITH_EVALUATION, '4K対応')
  )

  return instance
}
