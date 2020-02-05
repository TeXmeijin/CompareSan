import * as firebase from 'firebase/app'
import 'firebase/firestore'
import { CompareArticle } from '../types/articleTypes'
import ICompareTableRepository from './ICompareTableRepository'

const convertFirestoreDocumentDataToCompareArticle = (
  snapshot: firebase.firestore.DocumentData | undefined,
  id?: string
): CompareArticle | undefined => {
  if (!snapshot) {
    return undefined
  }
  if (id) {
    snapshot.id = id
  }
  return {
    id: snapshot.id,
    uid: snapshot.uid,
    table: snapshot.table,
    title: snapshot.title,
    categoryId: snapshot.categoryId,
    content: snapshot.content,
    is_public: snapshot.is_public,
    created_at: snapshot.created_at,
    deleted_at: snapshot.deleted_at,
  }
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
      table: article.table,
      title: article.title,
      categoryId: article.categoryId,
      content: article.content,
      is_public: article.is_public,
      created_at: article.created_at,
      deleted_at: null,
      version: this.getVersion(),
    })
  }
  update (postId: string, article: CompareArticle): Promise<void> {
    return this.getOrm()
      .doc(postId)
      .set({
        uid: article.uid,
        table: article.table,
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
  ): Promise<CompareArticle | undefined> {
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
  async listByPublic (): Promise<CompareArticle[]> {
    const snapshotList = await this.getOrm()
      .where('is_public', '==', true)
      .where('deleted_at', '==', null)
      .orderBy('created_at', 'desc')
      .get()

    const data = snapshotList.docs

    return data.map((snapshot) => {
      return convertFirestoreDocumentDataToCompareArticle(
        snapshot.data(),
        snapshot.id
      )!
    })
  }
  async listByCategoryId (categoryId: number): Promise<CompareArticle[]> {
    const snapshotList = await this.getOrm()
      .where('is_public', '==', true)
      .where('categoryId', '==', categoryId)
      .where('deleted_at', '==', null)
      .orderBy('created_at', 'desc')
      .get()

    const data = snapshotList.docs

    return data.map((snapshot) => {
      return convertFirestoreDocumentDataToCompareArticle(
        snapshot.data(),
        snapshot.id
      )!
    })
  }
  deleteArticle (article: CompareArticle): Promise<void> {
    return this.getOrm()
      .doc(article.id!)
      .update({
        deleted_at: Date.now(),
      })
  }
}
