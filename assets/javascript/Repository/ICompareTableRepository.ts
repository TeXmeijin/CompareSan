import { CompareTable } from '../types/tableTypes'
export default interface ICompareTableRepository {
  create: (uid: string, table: CompareTable) => Promise<any>
  update: (postId: string, uid: string, table: CompareTable) => Promise<any>
  findById: (postId: string) => Promise<any>
}
