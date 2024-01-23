module.exports = class CurrentDateProvider {
    static async getCurrentDateAndTime() {
        return (new Date()).toLocaleString().replaceAll(/(:|\/)/g, "-").replace(",", "")
    }
}