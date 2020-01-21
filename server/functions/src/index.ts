import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()

exports.getPublicComparesPathData = functions
  .region('asia-northeast1')
  .https.onRequest(async (_, res) => {
    const database = admin.firestore()

    const snapshot = await database
      .collection('/compares')
      .where('is_public', '==', true)
      .get()
    if (snapshot === null) {
      res.status(404).send(null)
      return
    }
    const data = snapshot.docs

    const ret: Array<Object> = data.map((snap) => {
      return {
        id: snap.id,
        categoryId: snap.data().categoryId,
      }
    })

    res.status(200).send(JSON.stringify(ret))
  })
