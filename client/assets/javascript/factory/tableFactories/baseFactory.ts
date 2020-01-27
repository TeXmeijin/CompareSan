import { CompareTableClass } from '../../types/tableTypes'
export interface baseFactory {
  factory: (params: factoryParameter) => CompareTableClass
  comparePoints: ComparePoint[]
}

export type factoryParameter = {
  productInfoList?: Array<{
    name: string
    price: number
  }>
  comparePointKeys?: string[]
}

export type ComparePoint = {
  name: string
  key: string
}
