export interface CompareCategory {
  [key: string]: {
    id: number
    name: string
    description: string
  }
}

export function GetMasterCategories (): CompareCategory {
  return {
    'display-monitor': {
      id: 1,
      name: 'ディスプレイモニター',
      description: '',
    },
  }
}
