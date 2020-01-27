import { CompareTableClass, CellType } from '../../types/tableTypes'
import { generateRandom } from '../../utils/GenerateRandom'
import { oneRowFactory } from '../oneRowFactory'
import { baseFactory } from './baseFactory'
export class SimpleTableFactory implements baseFactory {
  factory (): CompareTableClass {
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
      oneRowFactory(
        instance,
        CellType.TEXT_WITH_EVALUATION,
        this.comparePoints[0].name
      )
    )

    return instance
  }

  public comparePoints = [
    {
      name: 'デザイン',
      key: 'default',
    },
  ]
}
