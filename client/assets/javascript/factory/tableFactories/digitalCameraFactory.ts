import { CompareTableClass, CellType } from '../../types/tableTypes'
import { generateRandom } from '../../utils/GenerateRandom'
import { oneRowFactory } from '../oneRowFactory'
import { baseFactory, factoryParameter } from './baseFactory'

export class DigitalCameraFactory implements baseFactory {
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
            name: 'デジタル一眼レフA',
            comparingItemKey: generateRandom(),
          },
          {
            name: 'デジタル一眼レフB',
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

  public comparePoints: { name: string; key: string }[] = [
    {
      name: '画素数',
      key: '',
    },
    {
      name: 'ズーム倍率',
      key: '',
    },
    {
      name: 'ISO感度',
      key: '',
    },
    {
      name: '連写性能',
      key: '',
    },
    {
      name: '重さ',
      key: '',
    },
    {
      name: 'センサーサイズ',
      key: '',
    },
    {
      name: '液晶モニター',
      key: '',
    },
    {
      name: '電池の持ち',
      key: '',
    },
    {
      name: 'シャッタースピード',
      key: '',
    },
  ].map((el) => {
    el.key = generateRandom(8)
    return el
  })
}
