import { Account } from "appwrite";
import appwriteClient from "./appwriteClient";

const account = new Account(appwriteClient);

const authService = {
  createAccount: (email: string, password: string, name: string) =>
    account.create("unique()", email, password, name),
};

export { authService };
