import { Client, Databases, ID } from "appwrite";
import config from "./config";

const appwriteClient = new Client();

const database = new Databases(appwriteClient);

appwriteClient
  .setEndpoint(config.appwriteUrl)
  .setProject(config.appwriteProjectId);

//   Skeleton
// async create() {
//     try {
//       database.createDocument("testdb", "testcollection", ID.unique(), {
//         uid: "aditya_OOOOPS",
//         platform: "git",
//         url: "https://fakehub.com",
//       });
//     } catch (error) {
//       throw error;
//     }
//   }

class AppwriteDatabase {
  async create({
    uid,
    platform,
    url,
    name,
  }: {
    uid: string;
    platform: string[];
    url: string[];
    name: string;
  }) {
    try {
      database
        .createDocument("testdb", "testcollection", uid, {
          uid,
          platform,
          url,
          name,
        })
        .then((res) => {
          if (res.$id) return res;
        })
        .catch((err) => {
          return err;
        });
    } catch (error) {
      throw error;
    }
  }

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
