import * as firebase from 'firebase/app'
import 'firebase/firestore'
import { CompareTable } from '../types/tableTypes'
import ICompareTableRepository from './ICompareTableRepository'
import init from '~/plugins/firebase/firebase'

export class FirestoreCompareTableRepository
implements ICompareTableRepository {
  constructor () {
    init()
  }
  create (
    uid: string,
    table: CompareTable
  ): Promise<firebase.firestore.DocumentReference> {
    return firebase
      .firestore()
      .collection('compare-data-v0_1_0')
      .add({
        uid,
        table,
      })
  }
  update (postId: string, uid: string, table: CompareTable): Promise<void> {
    return firebase
      .firestore()
      .collection('compare-data-v0_1_0')
      .doc(postId)
      .set({
        uid,
        table,
      })
  }
  async findById (
    postId: string
  ): Promise<(firebase.firestore.DocumentData) | undefined> {
    const savedData = await firebase
      .firestore()
      .collection('compare-data-v0_1_0')
      .doc(postId)
      .get()

    return savedData.data()
  }
}
