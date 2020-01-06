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
  create (
    article: CompareArticle
  ): Promise<firebase.firestore.DocumentReference> {
    return firebase
      .firestore()
      .collection('compare-data-v0_1_1')
      .add({
        uid: article.uid,
        table: article.table.data,
        title: article.title,
        categoryId: article.categoryId,
        content: article.content,
        is_public: article.is_public,
        created_at: new Date(),
      })
  }
  update (postId: string, article: CompareArticle): Promise<void> {
    return firebase
      .firestore()
      .collection('compare-data-v0_1_1')
      .doc(postId)
      .set({
        uid: article.uid,
        table: article.table.data,
        title: article.title,
        categoryId: article.categoryId || null,
        content: article.content,
        is_public: article.is_public,
        created_at: article.created_at,
      })
  }
  async findById (
    compareId: string,
    categoryId?: number,
    uid?: string
  ): Promise<(CompareArticle) | undefined> {
    const savedData = await firebase
      .firestore()
      .collection('compare-data-v0_1_1')
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
    const snapshotList = await firebase
      .firestore()
      .collection('compare-data-v0_1_1')
      .where('uid', '==', uid)
      .get()

    const data = snapshotList.docs

    return data.map((snapshot) => {
      return convertFirestoreDocumentDataToCompareArticle(
        snapshot.data(),
        snapshot.id
      )!
    })
  }
}
