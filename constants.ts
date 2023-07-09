const constants = {
  appwrite: {
    endpoint: "https://cloud.appwrite.io/v1",
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    postCollectionId: process.env.NEXT_PUBLIC_APPWRITE_POST_COLLECTION_ID,
    profileCollectionId: process.env.NEXT_PUBLIC_APPWRITE_PROFILE_COLLECTION_ID,
    bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
  },
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL,
  },
};

export default constants;
