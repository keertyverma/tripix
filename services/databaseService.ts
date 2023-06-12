import { Databases, Query } from "appwrite";
import appwriteClient from "./appwriteClient";
import constants from "@/constants";

const database = new Databases(appwriteClient);
const { databaseId, collectionId } = constants.appwrite;

const databaseService = {
  getPosts: () =>
    database.listDocuments(databaseId as string, collectionId as string, [
      Query.orderDesc("$createdAt"),
    ]),
};

export { databaseService };
