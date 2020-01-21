import * as firebase from 'firebase/app'
import 'firebase/firestore'
import { CompareArticle } from '../types/articleTypes'
import { CompareTableClass } from '../types/tableTypes'
import ICompareTableRepository from './ICompareTableRepository'

const convertFirestoreDocumentDataToCompareArticle = (
  snapshot: firebase.firestore.DocumentData | undefined,
  id?: string
): CompareArticle | undefined => {
  if (!snapshot) {
    return undefined
  }
  const table = new CompareTableClass()
  table.data = snapshot.table
  snapshot.table = table
  if (id) {
    snapshot.id = id
  }
  return snapshot as CompareArticle
}

export class FirestoreCompareTableRepository
implements ICompareTableRepository {
  getOrm () {
    return firebase.firestore().collection('compares')
  }
  getVersion () {
    return 'v0.1.3'
  }
  create (
    article: CompareArticle
  ): Promise<firebase.firestore.DocumentReference> {
    return this.getOrm().add({
      uid: article.uid,
      table: article.table.data,
      title: article.title,
      categoryId: article.categoryId,
      content: article.content,
      is_public: article.is_public,
      created_at: new Date(),
      deleted_at: null,
      version: this.getVersion(),
    })
  }
  update (postId: string, article: CompareArticle): Promise<void> {
    return this.getOrm()
      .doc(postId)
      .set({
        uid: article.uid,
        table: article.table.data,
        title: article.title,
        categoryId: article.categoryId || null,
        content: article.content,
        is_public: article.is_public,
        created_at: article.created_at,
        deleted_at: null,
        version: this.getVersion(),
      })
  }
  async findById (
    compareId: string,
    categoryId?: number,
    uid?: string
  ): Promise<(CompareArticle) | undefined> {
    const savedData = await this.getOrm()
      .doc(compareId)
      .get()

    const data = savedData.data()

    if (categoryId !== undefined && categoryId >= 0 && data) {
      if (data.categoryId !== categoryId) {
        return
      }
    }

    if (uid !== undefined && data) {
      if (data.uid !== uid) {
        return
      }
    }

    return convertFirestoreDocumentDataToCompareArticle(data)
  }
  async listByUid (uid: string): Promise<CompareArticle[]> {
    const snapshotList = await this.getOrm()
      .where('uid', '==', uid)
      .where('deleted_at', '==', null)
      .get()

    const data = snapshotList.docs

    return data.map((snapshot) => {
      return convertFirestoreDocumentDataToCompareArticle(
        snapshot.data(),
        snapshot.id
      )!
    })
  }
  async deleteArticle (article: CompareArticle): Promise<void> {
    return this.getOrm()
      .doc(article.id!)
      .update({
        deleted_at: Date.now(),
      })
  }
}
