export interface CollectionsDirector {
  saveData(collection: string, documentId: string | null, data: object): Promise<void>;

  getData<T>(collection: string, documentId: string): Promise<T>;

  deleteData(collection: string, documentId: string): Promise<void>;

  getCollection<T extends FirebaseFirestore.DocumentData>(collection: string, limits: { fromDate: Date }): Promise<T[]>;

  updateData(information: string, welcome: string, object: object): Promise<void>;
}
