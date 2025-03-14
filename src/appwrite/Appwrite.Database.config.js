import { Client, Databases, Storage, Query, ID } from "appwrite";
import config from "../config/config";

export class Satvises {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDataBaseId,
        config.appwriteCalectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDataBaseId,
        config.appwriteCalectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDataBaseId,
        config.appwriteCalectionId,
        slug
      );

      return true;
    } catch (error) {
      console.log("sumthing went worng while delete the podt", error);

      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteDataBaseId,
        config.appwriteCalectionId,
        slug
      );
    } catch (error) {
      console.log("sumthing went wrong while get one post");

      return false;
    }
  }

  async getPosts(querys = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        config.appwriteDataBaseId,
        config.appwriteCalectionId,
        querys
      );
    } catch (error) {
      console.log("sumthing went wrong on query");

      return false;
    }
  }

  //flie upload servises

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        config.appwriteBakedID,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("sumthing went wrong wtile uploading the file", error);

      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(config.appwriteBakedID, fileId);
      return true;
    } catch (error) {
      console.log("sumthing went wrong while deleting the file");
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.storage.getFilePreview(config.appwriteBakedID, fileId);
  }
}

const service = new Satvises();

export default service;
