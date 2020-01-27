import { CompareTableClass } from '../../types/tableTypes'
export function emptyTableFactory (): CompareTableClass {
  const table = {
    header: [],
    rows: [],
  }

  const instance = new CompareTableClass()
  instance.data = table
  return instance
}
