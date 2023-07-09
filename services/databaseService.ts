import { Databases, Query, ID, Permission, Role } from "appwrite";
import appwriteClient from "./appwriteClient";
import constants from "@/constants";
import { IAddPost } from "../hooks/post/useAddPost";

const database = new Databases(appwriteClient);
const { databaseId, postCollectionId, profileCollectionId } =
  constants.appwrite;

const databaseService = {
  getPosts: () =>
    database.listDocuments(databaseId as string, postCollectionId as string, [
      Query.orderDesc("$createdAt"),
    ]),

  createPost: (newPost: IAddPost) => {
    const role = Role.user(newPost.userId);
    return database.createDocument(
      databaseId as string,
      postCollectionId as string,
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
      postCollectionId as string,
      postId
    ),

  getPostById: (postId: string) =>
    database.getDocument(
      databaseId as string,
      postCollectionId as string,
      postId
    ),

  updatePost: (postId: string, data: any) =>
    database.updateDocument(
      databaseId as string,
      postCollectionId as string,
      postId,
      data
    ),

  getUserProfile: (userId: string) =>
    database.listDocuments(
      databaseId as string,
      profileCollectionId as string,
      [Query.equal("userId", userId)]
    ),
};

export { databaseService };
