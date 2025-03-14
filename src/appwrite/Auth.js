import { Client, Account, ID } from "appwrite";
import config from "../config/config";

export class AuthServises {
  client = new Client();

  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const createdAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (createdAccount) {
        return this.login(email, password);
      } else {
        return createdAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login(email, password) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCorentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}

const authServises = new AuthServises();

export default authServises;
