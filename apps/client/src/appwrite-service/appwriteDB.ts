import { Client, Databases, Permission } from "appwrite";
import config from "./config";

const appwriteClient = new Client();

const database = new Databases(appwriteClient);

appwriteClient
  .setEndpoint(config.appwriteUrl)
  .setProject(config.appwriteProjectId);

class AppwriteDatabase {
  async get() {
    try {
      return await database.listDocuments("testdb", "testcollection");
    } catch (error) {
      throw error;
    }
  }
}

const appwriteDB = new AppwriteDatabase();

export default appwriteDB;
