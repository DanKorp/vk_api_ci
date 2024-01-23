const BaseForm = require('../../framework/baseForm');
const Element = require('../../framework/baseElement');
const stringUtils = require('../../framework/utils/stringUtils');

class WallForm extends BaseForm {
    constructor() {
        super('//div[@class="WallLegacy"]', 'Wall Form');
    }

    get photoUrlElement() {
        return new Element('//div[contains(@id, "pv_photo") and(contains(@class, "PhotoEditorTheme"))]//img[contains(@src, "")]', 'Photo URL Element');
    }

    get closePhotoViewButton() {
        return new Element('//div[@class="pv_close_btn"]', 'Close Photo View Button');
    }

    getLastCreatedPostById = (postId) => {
        return new Element(`//div[contains(@data-post-id, "_${postId}")]`, 'Last Created Post by Post ID');
    }

    getLastCreatedPostByUserIdAndPostId = (userId, postId) => {
        return new Element(`//div[@id="wpt${userId}_${postId}"]`, 'Last Created Post By User ID and Post ID');
    }

    getLastCreatedPostWithText = (userId, postId, actualText) => {
        return new Element(`${this.getLastCreatedPostByUserIdAndPostId(userId, postId).locator}//div[text()="${actualText}"]`, 'Last Created Post With Text');
    }

    getLikeButtonByUserIdAndPostId = (userId, postId) => {
        return new Element(`//div[contains(@class, "PostBottomAction") and(contains(@onclick, "wall${userId}_${postId}")) and(contains(@data-like-button-type, "like"))]`, 'Like Button');
    }

    getActiveLikeButtonByUserIdAndPostId = (userId, postId) => {
        return new Element(`//div[contains(@class, "PostBottomAction") and(contains(@data-reaction-target-object, "wall${userId}_${postId}"))]`, 'Active Like Button');
    }

    getDeletedPostByUserIdAndPostId = (userId, postId) => {
        return new Element(`//div[contains(@data-post-id, "${userId}_${postId}") and(contains(@class, "unshown"))]`, 'Deleted Post by User ID and Post ID');
    }

    getPictureInLastCreatedPost = (userId, postId) => {
        return new Element(`//div[@id="wpt${userId}_${postId}"]//a[contains(@href, "")]`, 'Picture in Last Created Post');
    }

    getCommentByUserIdAndPostId = (userId, postId) => {
        return new Element(`//div[@id="replies${userId}_${postId}"]//a[contains(@class, "author") and(contains(@data-from-id, ""))]`, 'Comment to Created Post');
    }

    getShowRepliesButtonByUserIdAndPostId = (userId, postId) => {
        return new Element(`//div[@id="replies${userId}_${postId}"]//span[@class="js-replies_next_label"]`, "Show Replies Button");
    }

    getPhotoInThePostByUserIdAndPostId = (userId, postId) => {
        return new Element(`//div[@id="wpt${userId}_${postId}"]//a[@aria-label="photo"]`, "Photo in the Post by User ID and Post ID");
    }

    getFileFromLastCreatedPost = (userId, postId) => {
        return new Element(`//div[contains(@id, "post${userId}_${postId}")]//*[@class="SecondaryAttachment__childrenText"]`, "File Name From Last Created Post");
    }

    async getFileNameInLastCreatedPost(userId, postId) {
        const fileName = await this.getFileFromLastCreatedPost(userId, postId).getText();
        return fileName;
    }

    async getCommentatorByPostId(postId) {
        const commentatorId = await this.getCommentByUserIdAndPostId(userId, postId).getAttributeFromElement("data-from-id");
        return commentatorId;
    }

    async getIdOfPictureInLastCreatedPost(userId, postId) {
        const userIdAndPictureId = await this.getPictureInLastCreatedPost(userId, postId).getAttributeFromElement("href");
        const pictureId = stringUtils.retrievePartAfterUnderscore(userIdAndPictureId);
        return pictureId;
    }

    async getLastCreatedPostText(userId, postId, actualText) {
        await this.getLastCreatedPostWithText(userId, postId, actualText).scrollIntoView();
        return this.getLastCreatedPostWithText(userId, postId, actualText).getText();
    }

    async getTextFromLastCreatedPost(userId, postId) {
        await this.getLastCreatedPostByUserIdAndPostId(userId, postId).scrollIntoView();
        return this.getLastCreatedPostByUserIdAndPostId(userId, postId).getText();
    }

    async getIdOfLastPostCreator(postId) {
        const dataPostId = await this.getLastCreatedPostById(postId).getAttributeFromElement("data-post-id");
        const userId = stringUtils.retrievePartBeforeUnderscore(dataPostId);
        return userId;
    }

    async clickLikeButtonOnLastCreatedPost(userId, postId) {
        await this.getLikeButtonByUserIdAndPostId(userId, postId).scrollIntoView();
        await this.getLikeButtonByUserIdAndPostId(userId, postId).clickWithJS();
    }

    async checkActiveLikeButton(userId, postId) {
        return this.getActiveLikeButtonByUserIdAndPostId(userId, postId).waitForDisplayed();
    }

    async checkIfPostDeleted(userId, postId) {
        return this.getDeletedPostByUserIdAndPostId(userId, postId).waitForExist();
    }

    async clickShowRepliesButton(userId, postId) {
        await this.getShowRepliesButtonByUserIdAndPostId(userId, postId).scrollIntoView();
        await this.getShowRepliesButtonByUserIdAndPostId(userId, postId).click();
    }

    async clickOnPhotoInPost(userId, postId) {
        await this.getPhotoInThePostByUserIdAndPostId(userId, postId).click();
    }

    async retrievePhotoDownloadUrl() {
        const photoDownloadUrl = await this.photoUrlElement.getAttributeFromElement("src");
        return photoDownloadUrl;
    }

    async clickClosePhotoViewButton() {
        await this.closePhotoViewButton.click();
    }

    async getLastCreatedPost() {
        return new Element('')
    }
}

module.exports = new WallForm();