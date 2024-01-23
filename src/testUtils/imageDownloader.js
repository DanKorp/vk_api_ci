const axios = require('axios').default;
const fs = require('fs');
const path = require('path');
const { pathToDownloadedImage } = require('../environment/testEnvironment');

module.exports = class ImageDownloader {
    static async getBase64(url) {
        const response = await axios.get(url, {
            responseType: "arraybuffer"
        });
        return Buffer.from(response.data, 'binary').toString('base64');
    }

    static async writeImageToDisk(image, path) {
        fs.writeFileSync(path, image, "base64");
    }

    static async downloadAndWriteToDisk(url) {
        const image = await this.getBase64(url);
        this.writeImageToDisk(image, pathToDownloadedImage);
    }
}