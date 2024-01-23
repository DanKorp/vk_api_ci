const path = require('path');

module.exports = {
    startUrl: "https://vk.com/",
    apiStartUrl: "https://api.vk.com/method/",
    pathToUploadedImage: path.join(process.cwd(), 'src', 'testData', 'image.jpg'),
    pathToDownloadedImage: path.join(process.cwd(), 'src', 'downloadedImages', 'downloadedImage.jpg'),
    user_id: '223548303',
    pathToUploadedFile: path.join(process.cwd(), 'src', 'testData', 'textFile.txt'),
    photoAttachmentType: 'photo',
    docsAttachmentType: 'doc',
    textFileName: "textFile.txt"
}