import { FirebaseService } from '@libs/firebase/services/firebase.service';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class CollectionService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async saveData(collection: string, documentId: string, data: object & { date: number }): Promise<void> {
    const db = this.firebaseService.app.firestore();
    const docRef = db.collection(collection).doc(documentId);
    const counterRef = db.collection('counters').doc(collection);
    const firestoreData = {
      ...data,
      date: admin.firestore.Timestamp.fromMillis(data.date * 1000),
    };

    await db.runTransaction(async (transaction) => {
      const counterDoc = await transaction.get(counterRef);

      if (!counterDoc.exists) {
        transaction.set(counterRef, { count: 1 });
      } else {
        transaction.update(counterRef, {
          count: admin.firestore.FieldValue.increment(1),
        });
      }

      transaction.set(docRef, firestoreData);
    });
  }

  async getData<T>(collection: string, documentId: string): Promise<T> {
    const db = admin.firestore();
    const docRef = db.collection(collection).doc(documentId);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new Error(`${collection}/${documentId} not found.`);
    }
    return doc.data() as T;
  }

  async deleteData(collection: string, documentId: string): Promise<void> {
    const db = this.firebaseService.app.firestore();
    const docRef = db.collection(collection).doc(documentId);
    const counterRef = db.collection('counters').doc(collection);

    await db.runTransaction(async (transaction) => {
      transaction.update(counterRef, {
        count: admin.firestore.FieldValue.increment(-1),
      });

      transaction.delete(docRef);
    });
  }

  async getCollection<T>(collection: string, limits: { fromDate: Date }): Promise<T[]> {
    const db = this.firebaseService.app.firestore();
    const collectionRef = db.collection(collection);
    const querySnapshot = await collectionRef
      .where('date', '>=', admin.firestore.Timestamp.fromDate(limits.fromDate))
      .orderBy('date', 'desc')
      .get();

    if (querySnapshot.empty) {
      return [];
    }

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        date: data.date.toMillis() / 1000,
      } as T;
    });
  }

  async updateData(collection: string, documentId: string, data: object): Promise<void> {
    const db = this.firebaseService.app.firestore();
    const docRef = db.collection(collection).doc(documentId);

    await docRef.update(data);
  }
}
