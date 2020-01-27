import { CompareTableClass } from '../../types/tableTypes'
export interface baseFactory {
  factory: () => CompareTableClass
  comparePoints: ComparePoint[]
}

type ComparePoint = {
  name: string
  key: string
}
