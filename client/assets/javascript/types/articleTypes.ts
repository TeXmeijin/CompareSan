import { CompareTable } from './tableTypes'

export type CompareArticle = {
  id?: string
  uid: string
  table: CompareTable
  categoryId?: number
  title: string
  content: string
  is_public: boolean
  created_at: number
  deleted_at?: number
}
