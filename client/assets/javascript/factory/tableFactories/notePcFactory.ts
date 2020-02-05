import { CompareTableClass, CellType } from '../../types/tableTypes'
import { generateRandom } from '../../utils/GenerateRandom'
import { oneRowFactory } from '../oneRowFactory'
import { baseFactory, factoryParameter } from './baseFactory'

export class NotePcFactory implements baseFactory {
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
            name: 'ノートパソコンA',
            comparingItemKey: generateRandom(),
          },
          {
            name: 'ノートパソコンB',
            comparingItemKey: generateRandom(),
          },
        ],
        rows: [],
      }
    })()

    // TODO: 以降の処理の共通化

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
          element.name,
          element.description
        )
      )
    }

    return instance
  }

  public comparePoints: { name: string; key: string; description: string }[] = [
    {
      name: '画面サイズ(インチ)',
      key: '',
      description:
        '見やすさを重視する方は画面サイズを比較ポイントに加えましょう',
    },
    {
      name: 'カラー',
      key: '',
      description:
        '仕事で使う方や、デザインや愛着を持てるかにこだわりたい方はカラーで比較しましょう',
    },
    {
      name: '重さ',
      key: '',
      description:
        '用途に応じて検討します。持ち運びを重視する方は1.3〜1.5kgあたりが限度でしょう。',
    },
    {
      name: 'ストレージ(GB)',
      key: '',
      description:
        '大きいほど大量のファイルを保存できます。目安ですが200GB未満だとすぐ埋まるかも。',
    },
    {
      name: 'CPU',
      key: '',
      description:
        'Core i5やi7が有名ですが、クリエイター職等でなければこだわらずに、i5などで十分でしょう。',
    },
    {
      name: 'タッチパネル',
      key: '',
      description:
        'Windows10以降の機種に見られるタッチパネルは、好みは分かれますが欲しい方は比較ポイントに加えましょう',
    },
    {
      name: 'キーボード',
      key: '',
      description:
        'キーボードの押し心地を、実際に店頭で試して比較してみましょう。また、英字キーボードなど配列の違いもあります。',
    },
    {
      name: '画面取り外し可否',
      key: '',
      description:
        'Surfaceなど、画面を取り外せる機種はタブレットとしても使えます。そのような使いみちに憧れる方はぜひ。',
    },
  ].map((el) => {
    el.key = generateRandom(8)
    return el
  })
}
