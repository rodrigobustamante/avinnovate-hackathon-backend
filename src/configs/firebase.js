import admin from 'firebase-admin';

class firebase {
  constructor() {
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID || '',
          privateKey: process.env.FIREBASE_PRIVATE_KEY || '',
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL || '',
        }),
      });

      this.database = admin.firestore();
      this.database.settings({ ignoreUndefinedProperties: true });
    } catch (error) {
      console.log(error);
    }
  }

  async closeConnection() {
    await this.database?.terminate();
  }

  async getCollection(collection) {
    const snapshot = await this.database?.collection(collection).get();
    const data = snapshot?.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return data;
  }

  async getDocument(collection, document) {
    const snapshot = await this.database
      ?.collection(collection)
      .doc(document)
      .get();
    const data = snapshot?.data();

    return data;
  }

  async addDocument(collection, data) {
    const snapshot = await this.database?.collection(collection).add(data);

    return snapshot;
  }

  async setDocument(collection, document, data) {
    const snapshot = await this.database
      ?.collection(collection)
      .doc(document)
      .set(data);

    return snapshot;
  }

  async updateDocument(collection, document, data) {
    const snapshot = await this.database
      ?.collection(collection)
      .doc(document)
      .update(data);

    return snapshot;
  }

  async deleteDocument(collection, document) {
    const snapshot = await this.database
      ?.collection(collection)
      .doc(document)
      .delete();

    return snapshot;
  }

  async getSubCollection(collection, document, subCollection) {
    const snapshot = await this.database
      ?.collection(collection)
      .doc(document)
      .collection(subCollection)
      .get();
    const data = snapshot?.docs.map((doc) => doc.data());

    return data;
  }

  async getSubDocument(collection, document, subCollection, subDocument) {
    const snapshot = await this.database
      ?.collection(collection)
      .doc(document)
      .collection(subCollection)
      .doc(subDocument)
      .get();
    const data = snapshot?.data();

    return data;
  }

  async setSubDocument(collection, document, subCollection, subDocument, data) {
    const snapshot = await this.database
      ?.collection(collection)
      .doc(document)
      .collection(subCollection)
      .doc(subDocument)
      .set(data);

    return snapshot;
  }

  async updateSubDocument(
    collection,
    document,
    subCollection,
    subDocument,
    data
  ) {
    const snapshot = await this.database
      ?.collection(collection)
      .doc(document)
      .collection(subCollection)
      .doc(subDocument)
      .update(data);

    return snapshot;
  }

  async deleteSubDocument(collection, document, subCollection, subDocument) {
    const snapshot = await this.database
      ?.collection(collection)
      .doc(document)
      .collection(subCollection)
      .doc(subDocument)
      .delete();

    return snapshot;
  }
}

export { firebase };
