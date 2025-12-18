import conf from "../conf/conf.js";
import { Client, Account, ID, Database, Storage, Query, Databases } from "appwrite";

export class Service {
    client = new Client()
    databases;
    bucket;

    constructor () {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost ({title, slug, content, featuredImage, status, userId}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite Service :: Create Post ::", error)
        }
    }


    async updatePost (slug, {title, content, featuredImage, status}) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite Service :: Update Post ::", error)
        }
    }

    async deletePost (slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite Service :: Delete Post ::", error)
            return false
        }
    }

    async getPost (slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite Services :: Get Post ::", error)
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            ) 
        } catch (error) {
            console.log("Appwrite Services :: Get Post's ::", error)
            return false
        }
    }

    // file upload services

    async uploadFile(file) {
        try {
            return await this.bucket.createFile( // this retrun returns file ID and we can use it to frlryr file update and delete file in next functions
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("Appwrite Services :: File Upload Error ::", error)
            return false;
        }
    }

    async deleteFile(fileId) {
        // while uploading the file we got a value as ID in return statrement we are going to use it here to delete the file 
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true            
        } catch (error) {
            console.log("Appwrite Services :: File Delete Error ::", error)
            return false
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

export const service = new Service()
export default service







