import { Locale } from "appwrite";
import appwriteClient from "./appwriteClient";

const locale = new Locale(appwriteClient);

const localeService = {
  getCountries: () => locale.listCountries(),
};

export { localeService };
