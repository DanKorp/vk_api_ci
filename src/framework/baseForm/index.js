const Element = require('../baseElement');
const Logger = require('../logger');
const timeouts = require('../../environment/timeouts');

module.exports = class BaseForm {
    constructor(locator, name) {
        this.locator = locator;
        this.name = name;
        this.form = new Element(this.locator, this.name);
    }

    getFormName = () => this.name;

    async isFormOpened() {
        const isOpened = await $(this.locator).isExisting();
        Logger.info(`Form "${this.name}" is opened - "${isOpened}"`);
        return isOpened;
    }

    async isFormDisplayed() {
        const isDisplayed = await $(this.locator).isDisplayed();
        Logger.info(`Form "${this.name}" is displayed - "${isDisplayed}"`);
        return isDisplayed;
    }

    async waitForFormIsOpened() {
        Logger.info(`Waiting for form "${this.name}" to load`);
        const isOpened = await $(this.locator).waitForExist(timeouts.pageLoadTime);
        Logger.info(`Form "${this.name}" is opened - "${isOpened}"`);
        return isOpened;
    }
}