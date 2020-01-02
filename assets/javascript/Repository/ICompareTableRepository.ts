import { CompareArticle } from '../types/articleTypes'

interface Result {
  id: string
}
export default interface ICompareTableRepository {
  create: (article: CompareArticle) => Promise<Result>
  update: (postId: string, article: CompareArticle) => Promise<any>
  findById: (postId: string) => Promise<any>
}
