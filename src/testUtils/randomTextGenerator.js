const { sentence } = require('txtgen/dist/cjs/txtgen');

module.exports = class RandomTextGenerator {
    static generateRandomText() {
        return sentence;
    }
}