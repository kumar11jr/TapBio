import { Account, Client, ID } from "appwrite";
import config from "./config";

const client = new Client();

interface ICreateAccount {
  username: string;
  email: string;
  password: string;
}

client.setEndpoint(config.appwriteURL).setProject(config.appwriteProjectID);

const account = new Account(client);

export class AppwriteService {
  async createAccount({ username, email, password }: ICreateAccount) {
    try {
      const userAcc = await account.create(
        ID.unique(),
        username,
        email,
        password
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
    } catch (error) {
      throw error;
    }
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      const data = await this.getUser();
      return Boolean(data);
    } catch (error) {
      throw error;
    }
  }

  async getUser() {
    try {
      return await account.get();
    } catch (error) {
      throw error;
    }
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
