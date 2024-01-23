const { assert } = require('chai')
const user = require('../../environment/credentials');
const testEnv = require('../../environment/testEnvironment');
const { welcomePage, vkIdPage, feedPage, profilePage } = require('../../pages/index');
const vkApiUtils = require('../../vkApiUtils/vkApiUtils');
const randomTextGenerator = require('../../testUtils/randomTextGenerator');
const fileDownloader = require('../../testUtils/imageDownloader');
const imageComparator = require('../../testUtils/imageComparator');

describe("VK", async function () {

    before(function () {
        this.phoneNumber = user.testUser.phone;
        this.password = user.testUser.password;
        this.userId = user.testUser.ownerID;
        this.profileLink = user.testUser.userProfileLink;
    });

    beforeEach(async function () {
        browser.url(testEnv.startUrl);
        assert.isTrue(await welcomePage.waitForFormIsOpened(), `Page "${welcomePage.getFormName}" is not opened.`);

        await welcomePage.loginForm.typeInPhoneNumber(this.phoneNumber);
        await welcomePage.loginForm.clickSignInButton();

        assert.isTrue(await vkIdPage.waitForFormIsOpened(), `Page ${vkIdPage.getFormName} is not opened.`);
        await vkIdPage.vkIdForm.typeSecretPassword(this.password);
        await vkIdPage.vkIdForm.clickLoginButton();

        assert.isTrue(await feedPage.waitForFormIsOpened(), `Page "${feedPage.getFormName}" is not opened.`);
        await feedPage.sidebarMenuForm.clickMyProfileButton();

        assert.isTrue(await profilePage.waitForFormIsOpened(), `Page "${profilePage.getFormName}" is not opened.`);
    })

    it("test case 1", async function () {
        const photoId = await vkApiUtils.uploadPhotoAndGetPhotoId(this.userId);
        const postPhotoResponse = await vkApiUtils.postUploadedPhoto(this.userId, photoId);
        const postWithPhotoId = postPhotoResponse.data.response.post_id;
        await vkApiUtils.deletePost(postWithPhotoId);

        const randomMessage = randomTextGenerator.generateRandomText();
        const postResponse = await vkApiUtils.createPost(randomMessage);
        const postId = postResponse.data.response.post_id;

        assert.equal(await profilePage.wallForm.getTextFromLastCreatedPost(this.userId, postId), randomMessage, "Actual text from the post is not equal to posted text.")
        assert.equal(await profilePage.wallForm.getIdOfLastPostCreator(postId), this.userId, "ID of the last post creator is not equal to user ID.");

        const newRandomMessage = randomTextGenerator.generateRandomText();
        await vkApiUtils.editPost(postId, newRandomMessage, photoAttachmentType, this.userId, photoId);

        assert.notEqual(await profilePage.wallForm.getLastCreatedPostText(this.userId, postId), newRandomMessage, "Text is the post has not changed.");

        await profilePage.wallForm.clickOnPhotoInPost(this.userId, postId);
        const photoDownloadUrl = await profilePage.wallForm.retrievePhotoDownloadUrl(this.userId, postId);
        await profilePage.wallForm.clickClosePhotoViewButton();

        await fileDownloader.downloadAndWriteToDisk(photoDownloadUrl);

        const pathToActualImage = testEnv.pathToUploadedImage;
        const pathToExpectedImage = testEnv.pathToDownloadedImage;
        const thresholdValue = 0.1;

        const comparisonResult = await imageComparator.compareTwoImages(pathToActualImage, pathToExpectedImage, thresholdValue);

        assert.isTrue(comparisonResult, "Images are different.");

        const randomComment = randomTextGenerator.generateRandomText();
        await vkApiUtils.addCommentToPost(postId, randomComment);

        await profilePage.wallForm.clickShowRepliesButton(this.userId, postId);
        assert.equal(await profilePage.wallForm.getCommentatorByPostId(this.userId, postId), this.userId, "Commentator ID is not equal to the user ID.");

        await profilePage.wallForm.clickLikeButtonOnLastCreatedPost(this.userId, postId);
        assert.isTrue(await profilePage.wallForm.checkActiveLikeButton(this.userId, postId), "Like button is not active.");

        const likeResponse = await vkApiUtils.checkLikeOnPost(postId);
        const userIdFromLikeResponse = likeResponse.data.response.users[0].uid;
        assert.equal(userIdFromLikeResponse, Number(this.userId), `User ID "${userIdFromLikeResponse}" is not equal to expected ID "${this.userId}"`);

        await vkApiUtils.deletePost(postId);
        assert.isTrue(await profilePage.wallForm.checkIfPostDeleted(this.userId, postId), "Post is still displayed.")
    })

    it("test case 3", async function () {
        const randomMessage = randomTextGenerator.generateRandomText();
        const postResponse = await vkApiUtils.createPost(randomMessage);
        const postId = postResponse.data.response.post_id;

        assert.equal(await profilePage.wallForm.getIdOfLastPostCreator(postId), this.userId, "ID of the last post creator is not equal to user ID.");

        await profilePage.topBarForm.clickTopProfileLinkButton();
        await profilePage.topBarForm.clickLogOutButton();

        browser.url(testEnv.startUrl + this.profileLink);
        assert.equal(await profilePage.wallForm.getTextFromLastCreatedPost(this.userId, postId), randomMessage, "Text from the post is not equal to the original text.");

        assert.isTrue(await profilePage.bottomBarLoginForm.waitForFormIsOpened(), `Form "${profilePage.bottomBarLoginForm.getFormName}" is not displayed.`)
    })

    it("test case 4", async function () {
        const randomMessage = randomTextGenerator.generateRandomText();
        const postResponse = await vkApiUtils.createPost(randomMessage);
        const postId = postResponse.data.response.post_id;

        const newRandomMessage = randomTextGenerator.generateRandomText();
        const docId = await vkApiUtils.uploadDocAndGetDocId();

        await vkApiUtils.editPost(postId, newRandomMessage, docsAttachmentType, this.userId, docId);

        const actualFileName = testEnv.textFileName;
        assert.notEqual(await profilePage.wallForm.getLastCreatedPostText(this.userId, postId), newRandomMessage, "Text is the post has not changed.");
        assert.equal(await profilePage.wallForm.getFileNameInLastCreatedPost(this.userId, postId), actualFileName, "File names are not equal.");

        const randomComment = randomTextGenerator.generateRandomText();
        await vkApiUtils.addCommentToPost(postId, randomComment);

        await profilePage.wallForm.clickShowRepliesButton(this.userId, postId);
        assert.equal(await profilePage.wallForm.getCommentatorByPostId(this.userId, postId), this.userId, "Commentator ID is not equal to the user ID.");

        await profilePage.wallForm.clickLikeButtonOnLastCreatedPost(this.userId, postId);
        assert.isTrue(await profilePage.wallForm.checkActiveLikeButton(this.userId, postId), "Like button is not active.");

        const likeResponse = await vkApiUtils.checkLikeOnPost(postId);
        const userIdFromLikeResponse = likeResponse.data.response.users[0].uid;
        assert.equal(userIdFromLikeResponse, Number(this.userId), `User ID "${userIdFromLikeResponse}" is not equal to expected ID "${this.userId}"`);

        await vkApiUtils.deletePost(postId);
        assert.isTrue(await profilePage.wallForm.checkIfPostDeleted(this.userId, postId), "Post is still displayed.")
    })

    it("test case 5", async function () {
        const randomMessage = randomTextGenerator.generateRandomText();

        const photoId = await vkApiUtils.uploadPhotoAndGetPhotoId(this.userId);
        const postPhotoResponse = await vkApiUtils.postUploadedPhoto(this.userId, photoId);
        const postWithPhotoId = postPhotoResponse.data.response.post_id;
        await vkApiUtils.deletePost(postWithPhotoId);

        const photoAttachmentType = testEnv.photoAttachmentType;
        const postResponse = await vkApiUtils.createPostWithAttachment(randomMessage, photoAttachmentType, this.userId, photoId);
        const postId = postResponse.data.response.post_id;

        assert.equal(await profilePage.wallForm.getTextFromLastCreatedPost(this.userId, postId), randomMessage, "Actual text from the post is not equal to posted text.")

        await profilePage.wallForm.clickOnPhotoInPost(this.userId, postId);
        const photoDownloadUrl = await profilePage.wallForm.retrievePhotoDownloadUrl(this.userId, postId);
        await profilePage.wallForm.clickClosePhotoViewButton();

        await fileDownloader.downloadAndWriteToDisk(photoDownloadUrl);

        const pathToActualImage = testEnv.pathToUploadedImage;
        const pathToExpectedImage = testEnv.pathToDownloadedImage;
        const thresholdValue = 0.1;

        const comparisonResult = await imageComparator.compareTwoImages(pathToActualImage, pathToExpectedImage, thresholdValue);

        assert.isTrue(comparisonResult, "Images are different.");
    })
})