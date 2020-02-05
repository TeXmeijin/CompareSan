import { SimpleTableFactory } from '../factory/tableFactories/simpleTableFactory'
import { baseFactory } from '../factory/tableFactories/baseFactory'
import { DisplayMonitorTableFactory } from '../factory/tableFactories/displayMonitorTableFactory'
import { NotePcFactory } from '../factory/tableFactories/notePcFactory'
import { DigitalCameraFactory } from '../factory/tableFactories/digitalCameraFactory'
export interface CompareCategory {
  id: number
  name: string
  description: string
  factory: baseFactory
  image?: any
}

export function GetMasterCategories (): {
  [key: string]: CompareCategory
  } {
  return {
    default: {
      id: 0,
      name: 'カテゴリなし',
      description: '',
      factory: new SimpleTableFactory(),
    },
    'display-monitor': {
      id: 1,
      name: 'ディスプレイモニター',
      description: '',
      factory: new DisplayMonitorTableFactory(),
    },
    humidifier: {
      id: 2,
      name: 'デジタル一眼レフ',
      description: '',
      factory: new DigitalCameraFactory(),
    },
    'note-pc': {
      id: 3,
      name: 'ノートパソコン',
      description: '',
      factory: new NotePcFactory(),
    },
  }
}

export function GetMasterCategoryById (id: number): CompareCategory | null {
  const master = GetMasterCategories()
  let ret: CompareCategory | null = null
  Object.keys(master).forEach((categoryKey) => {
    if (master[categoryKey].id === id) {
      ret = master[categoryKey]
    }
  })
  return ret
}
