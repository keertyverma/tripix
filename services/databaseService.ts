import { Databases, Query, ID, Permission, Role } from "appwrite";
import appwriteClient from "./appwriteClient";
import constants from "@/constants";
import { IAddPost } from "../hooks/post/useAddPost";

const database = new Databases(appwriteClient);
const { databaseId, collectionId } = constants.appwrite;

const databaseService = {
  getPosts: () =>
    database.listDocuments(databaseId as string, collectionId as string, [
      Query.orderDesc("$createdAt"),
    ]),

  createPost: (newPost: IAddPost) => {
    const role = Role.user(newPost.userId);
    return database.createDocument(
      databaseId as string,
      collectionId as string,
      ID.unique(),
      newPost,
      [
        Permission.read(role),
        Permission.delete(role),
        Permission.update(role),
        Permission.write(role),
      ]
    );
  },

  deletePostById: (postId: string) =>
    database.deleteDocument(
      databaseId as string,
      collectionId as string,
      postId
    ),
};

export { databaseService };
