import { databases, collection } from "./config";
import { ID } from "appwrite";

const db = {};

collection.forEach((collection) => {
  //Object of functions
  db[collection.name] = {
    //Create
    create: async (data, id = ID.unique()) => {
      return await databases.createDocument(
        collection.dbId,
        collection.collectionID,
        id,
        data
      );
    },
    update: async (id, data) => {
      return await databases.updateDocument(
        collection.dbId,
        collection.collectionID,
        id,
        data
      );
    },
    delete: async (id) => {
      return await databases.deleteDocument(
        collection.dbId,
        collection.collectionID,
        id
      );
    },
    get: async (id) => {
      return await databases.getDocument(
        collection.dbId,
        collection.collectionID,
        id
      );
    },
    list: async (queries) => {
      return await databases.listDocuments(
        collection.dbId,
        collection.collectionID,
        queries
      );
    },
  };
});

export { db };
