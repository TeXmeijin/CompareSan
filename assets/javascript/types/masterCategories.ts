import { displayMonitorTableFactory } from '../factory/displayMonitorTableFactory'
import { CompareTableClass } from './tableTypes'
export interface CompareCategory {
  id: number
  name: string
  description: string
  factory: () => CompareTableClass
}

function GetMasterCategories (): {
  [key: string]: CompareCategory
  } {
  return {
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
