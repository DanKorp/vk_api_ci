const FormData = require("form-data");
const fs = require('fs');
const path = require('path');
const ApiUtils = require('../framework/apiUtils');
const user = require('../environment/credentials');
const testEnv = require('../environment/testEnvironment');

const API_START_URL = testEnv.apiStartUrl;
const WALL_API_METHOD = (method) => `wall.${method}`;
const PHOTOS_API_METHOD = (method) => `photos.${method}`;
const DOCS_API_METHOD = (method) => `docs.${method}`;
const userId = testEnv.user_id;
const OWNER_ID = `owner_id=${userId}`;
const POST_ID = (postId) => `post_id=${postId}`;
const MESSAGE = (text) => `message=${text}`;
const ATTACHMENTS = (fileType, userId, fileId) => `attachments=${fileType}${userId}_${fileId}`;
const accessToken = user.testUser.accessToken;
const ACCESS_TOKEN = (accessToken) => `access_token=${accessToken}`
const API_VERSION = "v=5.199";
const PHOTO_DATA = (photoData) => `photo=${photoData}`;
const FILE_DATA = (fileData) => `file=${fileData}`;
const SERVER_DATA = (serverData) => `server=${serverData}`;
const HASH_DATA = (hashData) => `hash=${hashData}`;
const formDataContentType = 'multipart/form-data';
const pathToUploadedImage = testEnv.pathToUploadedImage;
const pathToUploadedFile = testEnv.pathToUploadedFile;

module.exports = class VkApiUtils {
    static async createPost(randomMessage) {
        const method = "post";
        return ApiUtils.postData(`${API_START_URL}${WALL_API_METHOD(method)}?${OWNER_ID}&${MESSAGE(randomMessage)}&${ACCESS_TOKEN(accessToken)}&${API_VERSION}`);
    }

    static async createPostWithAttachment(message, fileType, userId, fileId) {
        const method = "post";
        return ApiUtils.postData(`${API_START_URL}${WALL_API_METHOD(method)}?${OWNER_ID}&${MESSAGE(message)}&${ATTACHMENTS(fileType, userId, fileId)}&${ACCESS_TOKEN(accessToken)}&${API_VERSION}`);
    }

    static async editPost(postId, message, fileType, userId, fileId) {
        const method = "edit";
        return ApiUtils.postData(`${API_START_URL}${WALL_API_METHOD(method)}?${OWNER_ID}&${POST_ID(postId)}&${MESSAGE(message)}&${ATTACHMENTS(fileType, userId, fileId)}&${ACCESS_TOKEN(accessToken)}&${API_VERSION}`);
    }

    static async addCommentToPost(postId, commentText)  {
        const method = "createComment";
        return ApiUtils.postData(`${API_START_URL}${WALL_API_METHOD(method)}?${OWNER_ID}&${POST_ID(postId)}&${MESSAGE(commentText)}&${ACCESS_TOKEN(accessToken)}&${API_VERSION}`);
    }

    static async checkLikeOnPost(postId) {
        const method = "getLikes";
        return ApiUtils.getData(`${API_START_URL}${WALL_API_METHOD(method)}?${OWNER_ID}&${POST_ID(postId)}&${ACCESS_TOKEN(accessToken)}&${API_VERSION}`);
    }

    static async deletePost(postId) {
        const method = "delete";
        return ApiUtils.postData(`${API_START_URL}${WALL_API_METHOD(method)}?${OWNER_ID}&${POST_ID(postId)}&${ACCESS_TOKEN(accessToken)}&${API_VERSION}`);
    }

    static async getPhotoUploadUrl() {
        const method = "getWallUploadServer";
        return ApiUtils.getData(`${API_START_URL}${PHOTOS_API_METHOD(method)}?${ACCESS_TOKEN(accessToken)}&${API_VERSION}`);
    }

    static async getDocsUploadUrl() {
        const method = "getUploadServer";
        return ApiUtils.getData(`${API_START_URL}${DOCS_API_METHOD(method)}?${ACCESS_TOKEN(accessToken)}&${API_VERSION}`);
    }

    static async saveUploadedPhoto(photoData, serverData, hashData) {
        const method = "saveWallPhoto";
        return ApiUtils.postData(`${API_START_URL}${PHOTOS_API_METHOD(method)}?${ACCESS_TOKEN(accessToken)}&${PHOTO_DATA(photoData)}&${SERVER_DATA(serverData)}&${HASH_DATA(hashData)}&${API_VERSION}`);
    }

    static async saveUploadedDocs(file) {
        const method = "save";
        return ApiUtils.postData(`${API_START_URL}${DOCS_API_METHOD(method)}?${ACCESS_TOKEN(accessToken)}&${FILE_DATA(file)}&${API_VERSION}`);
    }

    static async postUploadedPhoto(userId, photoId) {
        const method = "post";
        return ApiUtils.getData(`${API_START_URL}${WALL_API_METHOD(method)}?${ACCESS_TOKEN(accessToken)}&${ATTACHMENTS(userId, photoId)}&${API_VERSION}`);
    }

    static async uploadPhotoToServer(uploadUrl) {
        const formData = new FormData();
        const pathToPhoto = pathToUploadedImage;
        const photoStream = fs.createReadStream(pathToPhoto);
        formData.append("photo", photoStream);
        return ApiUtils.postData(uploadUrl, formData, {
            headers: {
              'Content-Type': formDataContentType
            }});
    }

    static async uploadDocsToServer(upload_url) {
        const formData = new FormData();
        const pathToFile = pathToUploadedFile;
        const fileStream = fs.createReadStream(pathToFile);
        formData.append("textFile", fileStream);
        return ApiUtils.postData(upload_url, formData, {
            headers: {
                'Content-Type': formDataContentType
            }
        })
    }

    static async uploadDocAndGetDocId() {
        const uploadUrlResponse = await this.getDocsUploadUrl();
        const uploadUrl = uploadUrlResponse.data.response.upload_url;
        const uploadDocResponse = await this.uploadDocsToServer(uploadUrl);
        const fileInfo = uploadDocResponse.data.file;
        const savedDocResponse = await this.saveUploadedDocs(fileInfo);
        const docId = savedDocResponse.data.response.doc.id;
        return docId;
    }

    static async uploadPhotoAndGetPhotoId() {
        const uploadUrlResponse = await this.getPhotoUploadUrl();
        const uploadUrl = uploadUrlResponse.data.response.upload_url;
        const uploadPhotoResponse = await this.uploadPhotoToServer(uploadUrl);

        const photoData = uploadPhotoResponse.data.photo;
        const serverData = uploadPhotoResponse.data.server;
        const hashData = uploadPhotoResponse.data.hash;

        const savedPhotoResponse = await this.saveUploadedPhoto(photoData, serverData, hashData);
        const uploadedPhotoId = savedPhotoResponse.data.response[0].id;
        return uploadedPhotoId;
    }
}