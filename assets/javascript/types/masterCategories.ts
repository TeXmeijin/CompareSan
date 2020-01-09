import { displayMonitorTableFactory } from '../factory/displayMonitorTableFactory'
import { simpleTableFactory } from '../factory/simpleTableFactory'
import { CompareTableClass } from './tableTypes'
export interface CompareCategory {
  id: number
  name: string
  description: string
  factory: () => CompareTableClass
}

export function GetMasterCategories (): {
  [key: string]: CompareCategory
  } {
  return {
    'default': {
      id: 0,
      name: 'カテゴリなし',
      description: '',
      factory: simpleTableFactory,
    },
    'display-monitor': {
      id: 1,
      name: 'ディスプレイモニター',
      description: '',
      factory: displayMonitorTableFactory,
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
