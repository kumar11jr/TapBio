import { Account, Client } from "appwrite";
import config from "./config";

interface ICreateAccount {
  username: string;
  email: string;
  password: string;
}

const appwriteClient = new Client();

appwriteClient
  .setEndpoint(config.appwriteUrl)
  .setProject(config.appwriteProjectId);

const account = new Account(appwriteClient);

export class AppwriteService {
  async createAccount({ username, email, password }: ICreateAccount) {
    try {
      const userAcc = await account.create(
        username,
        email,
        password,
        username  // Here we have two usernames, one is for the name and the other is for UID
      );

      if (userAcc) {
        return this.login({ email, password });
      } else {
        return userAcc;
      }
    } catch (error) {
      throw new Error("User Id or Email already exists");
    }
  }

  async login({ email, password }: { email: string; password: string }) {
    return await account.createEmailSession(email, password);
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      const data = await this.getUser();
      return Boolean(data);
    } catch (error) {
      console.error(error);
    }
    return false;
  }

  async getUser() {
    try {
      return await account.get();
    } catch (error) {
      console.error(error);
    }
    return null;
  }

  async logout() {
    return await account.deleteSession("current");
  }
}

const appwriteService = new AppwriteService();

export default appwriteService;
