import { CompareTableClass, CellType } from '../../types/tableTypes'
import { generateRandom } from '../../utils/GenerateRandom'
import { oneRowFactory } from '../oneRowFactory'
import { baseFactory, factoryParameter } from './baseFactory'

export class DisplayMonitorTableFactory implements baseFactory {
  factory (params: factoryParameter = {}) {
    const table = (() => {
      if (params.productInfoList) {
        return {
          header: params.productInfoList.map((productInfo) => {
            return {
              name: productInfo.name,
              price: productInfo.price,
              comparingItemKey: generateRandom(),
            }
          }),
          rows: [],
        }
      }
      return {
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
    })()

    const instance = new CompareTableClass()
    instance.data = table

    const comparePoints = (() => {
      if (params.comparePointKeys) {
        return this.comparePoints.filter((el) => {
          if (params.comparePointKeys) {
            return params.comparePointKeys.findIndex(key => key === el.key) >= 0
          }
        })
      }
      return this.comparePoints
    })()

    for (let index = 0; index < comparePoints.length; index++) {
      const element = comparePoints[index]
      instance.data.rows.push(
        oneRowFactory(
          instance.data,
          CellType.TEXT_WITH_EVALUATION,
          element.name
        )
      )
    }

    return instance
  }

  public comparePoints = [
    {
      name: '画面サイズ(型)',
      key: 'size-window',
    },
    {
      name: '画素数',
      key: 'pixel',
    },
    {
      name: '高さ調節機能',
      key: 'adjust-high',
    },
    {
      name: 'HDR対応',
      key: 'hdr',
    },
    {
      name: '4K対応',
      key: '4k',
    },
    {
      name: '端子',
      key: 'adjuster',
    },
    {
      name: 'スピーカー',
      key: 'speaker',
    },
  ]
}
