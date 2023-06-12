const constants = {
  appwrite: {
    endpoint: "https://cloud.appwrite.io/v1",
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    collectionId: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
  },
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL,
  },
};

export default constants;
