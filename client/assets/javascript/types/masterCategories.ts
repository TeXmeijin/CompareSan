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
    default: {
      id: 0,
      name: 'カテゴリなし',
      description: '',
      factory: simpleTableFactory,
    },
    'display-monitor': {
      id: 1,
      name: 'テスト',
      description: '',
      factory: displayMonitorTableFactory,
    },
    humidifier: {
      id: 2,
      name: 'テスト',
      description: '',
      factory: simpleTableFactory,
    },
    'vacuum-cleaner': {
      id: 3,
      name: 'テスト',
      description: '',
      factory: simpleTableFactory,
    },
    toaster: {
      id: 4,
      name: 'テスト',
      description: '',
      factory: simpleTableFactory,
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
