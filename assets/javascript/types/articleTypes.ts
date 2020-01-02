import { CompareTable } from './tableTypes'
import { CompareCategory } from './masterCategories'
export type CompareArticle = {
  uid: string
  table: CompareTable
  category?: CompareCategory
  title: string
  content: string
  is_public: boolean
  created_at: number
  deleted_at?: number
}
