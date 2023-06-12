import { Storage, ID } from "appwrite";
import appwriteClient from "./appwriteClient";
import constants from "@/constants";

const storage = new Storage(appwriteClient);
const { bucketId } = constants.appwrite;

const storageService = {
  uploadImage: (file: File) =>
    storage.createFile(bucketId as string, ID.unique(), file),

  getPreviewImage: (fileId: string) =>
    storage.getFilePreview(bucketId as string, fileId),

  deleteImage: (fileId: string) =>
    storage.deleteFile(bucketId as string, fileId),
};

export { storageService };
