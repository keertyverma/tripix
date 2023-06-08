import { Client } from "appwrite";
import constants from "@/constants";

const { endpoint, projectId } = constants.appwrite;

if (!endpoint) {
  throw new Error("No Endpoint url provided for appwrite sdk");
}

if (!projectId) {
  throw new Error("No Project id provided for appwrite sdk");
}

const client = new Client().setEndpoint(endpoint).setProject(projectId);

export default client;
