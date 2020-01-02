import * as firebase from 'firebase/app'
import 'firebase/firestore'
import { CompareTable } from '../types/tableTypes'
import { CompareArticle } from '../types/articleTypes'
import ICompareTableRepository from './ICompareTableRepository'
import init from '~/plugins/firebase/firebase'

export class FirestoreCompareTableRepository
implements ICompareTableRepository {
  constructor () {
    init()
  }
  create (
    article: CompareArticle
  ): Promise<firebase.firestore.DocumentReference> {
    return firebase
      .firestore()
      .collection('compare-data-v0_1_1')
      .add({
        uid: article.uid,
        table: article.table,
        title: article.title,
        category: article.category || null,
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
        table: article.table,
        title: article.title,
        category: article.category || null,
        content: article.content,
        is_public: article.is_public,
        created_at: article.created_at,
      })
  }
  async findById (
    postId: string
  ): Promise<(firebase.firestore.DocumentData) | undefined> {
    const savedData = await firebase
      .firestore()
      .collection('compare-data-v0_1_1')
      .doc(postId)
      .get()

    return savedData.data()
  }
}
