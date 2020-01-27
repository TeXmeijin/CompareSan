import { CompareTableClass, CellType } from '../../types/tableTypes'
import { generateRandom } from '../../utils/GenerateRandom'
import { oneRowFactory } from '../oneRowFactory'
import { baseFactory } from './baseFactory'

export class DisplayMonitorTableFactory implements baseFactory {
  factory () {
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
    for (let index = 0; index < this.comparePoints.length; index++) {
      const element = this.comparePoints[index]
      instance.data.rows.push(
        oneRowFactory(instance, CellType.TEXT_WITH_EVALUATION, element.name)
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
