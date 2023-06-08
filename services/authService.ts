import { Account } from "appwrite";
import appwriteClient from "./appwriteClient";
import constants from "@/constants";

const account = new Account(appwriteClient);

const authService = {
  createAccount: (email: string, password: string, name: string) =>
    account.create("unique()", email, password, name),

  login: (email: string, password: string) =>
    account.createEmailSession(email, password),

  loginWithGoogle: () =>
    account.createOAuth2Session(
      "google",
      `${constants.app.url}/`,
      `${constants.app.url}/login`,
      ["profile"]
    ),
};

export { authService };
