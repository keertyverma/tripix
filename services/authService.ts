import { Account } from "appwrite";
import appwriteClient from "./appwriteClient";

const account = new Account(appwriteClient);

const authService = {
  createAccount: (email: string, password: string, name: string) =>
    account.create("unique()", email, password, name),

  login: (email: string, password: string) =>
    account.createEmailSession(email, password),
};

export { authService };
