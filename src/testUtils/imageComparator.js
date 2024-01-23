const { imgDiff } = require('img-diff-js');

module.exports = class ImageCOomparator {
    static async compareTwoImages(pathToActualImage, pathToExpectedImage, thresholdValue) {
        return imgDiff({
            actualFilename: pathToActualImage,
            expectedFilename: pathToExpectedImage,
            options: {
                threshold: thresholdValue
            }
        }).then(result => {
            return result.imagesAreSame;
        })
    }
}