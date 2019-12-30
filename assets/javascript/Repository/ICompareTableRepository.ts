import { CompareTable } from '../types/tableTypes'

interface Result {
  id: string
}
export default interface ICompareTableRepository {
  create: (uid: string, table: CompareTable) => Promise<Result>
  update: (postId: string, uid: string, table: CompareTable) => Promise<any>
  findById: (postId: string) => Promise<any>
}
