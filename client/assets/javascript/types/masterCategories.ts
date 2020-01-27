import { SimpleTableFactory } from '../factory/tableFactories/simpleTableFactory'
import { baseFactory } from '../factory/tableFactories/baseFactory'
import { DisplayMonitorTableFactory } from '../factory/tableFactories/displayMonitorTableFactory'
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
      image: require('~/assets/img/product_image/image_display_monitor.jpg'),
    },
    humidifier: {
      id: 2,
      name: 'デジタルカメラ',
      description: '',
      factory: new SimpleTableFactory(),
      image: require('~/assets/img/product_image/image_digital_camera.jpg'),
    },
    'vacuum-cleaner': {
      id: 3,
      name: '掃除機',
      description: '',
      factory: new SimpleTableFactory(),
      image: require('~/assets/img/product_image/image_vacuum.jpg'),
    },
    toaster: {
      id: 4,
      name: 'トースター',
      description: '',
      factory: new SimpleTableFactory(),
      image: require('~/assets/img/product_image/image_toaster.jpg'),
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
