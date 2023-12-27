import { Account, Client, ID } from "appwrite";
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
        ID.unique(),
        email,
        password,
        username
      );

      if (userAcc) {
        return this.login({ email, password });
      } else {
        return userAcc;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }: { email: string; password: string }) {
    try {
      return await account.createEmailSession(email, password);
    } catch (error: any) {
      throw error;
    }
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      const data = await this.getUser();
      return Boolean(data);
    } catch (error) {}
    return false;
  }

  async getUser() {
    try {
      return await account.get();
    } catch (error) {}
    return null;
  }

  async logout() {
    try {
      return await account.deleteSession("current");
    } catch (error) {
      throw error;
    }
  }
}

const appwriteService = new AppwriteService();

export default appwriteService;
