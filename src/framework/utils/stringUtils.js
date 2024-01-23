module.exports = class StringUtils {
    static retrievePartBeforeUnderscore(str) {
        return str.split("_")[0]
    }

    static retrievePartAfterUnderscore(str) {
        return str.split("_")[1]
    }
}