const Logger = require('../logger');

const secretValue = "******"

module.exports = class Element {
    constructor(locator, name) {
        this.locator = locator;
        this.name = name;
    }

    async click() {
        Logger.info(`Click at "${this.name}"`);
        await $(this.locator).isClickable();
        await $(this.locator).click();
    }

    async clickWithJS() {
        Logger.info(`Click at "${this.name}" with JS`);
        await $(this.locator).isClickable();
        const element = await $(this.locator);
        await browser.execute("arguments[0].click();", element);
    }

    async getText() {
        Logger.info(`Get text from element "${this.name}"`);
        await $(this.locator).isExisting();
        const text = await (await $(this.locator)).getText();
        Logger.info(`Retrieved text from "${text}"`);
        return text;
    }

    async getTextFromElements() {
        Logger.info(`Get text from elements "${this.name}"`);
        await $(this.locator).isExisting();
        const elements = await (await $$(this.locator));
        return Promise.all(elements.map(async (el) => el.getText()));
    }

    async getAttributeFromElement(attribute) {
        Logger.info(`Get attribute from element "${this.name}"`);
        await $(this.locator).isExisting();
        const retrievedAttribute = await (await $(this.locator)).getAttribute(attribute);
        Logger.info(`Retrieved attribute "${retrievedAttribute}`);
        return retrievedAttribute;
    }

    async getAttributeFromElements(attribute) {
        Logger.info(`Get attribute from elements "${this.name}"`);
        await $(this.locator).isExisting();
        const elements = await (await $$(this.locator));
        return Promise.all(elements.map(async (el) => el.getAttribute(attribute)));
    }

    async clearAndType(value) {
        Logger.info(`Type text "${value}" to element "${this.name}"`);
        await $(this.locator).isExisting();
        await (await $(this.locator)).setValue(value);
    }

    async clearAndTypeSecret(value, secretValue) {
        Logger.info(`Type secret text "${secretValue}" to element "${this.name}"`);
        await $(this.locator).isExisting();
        await (await $(this.locator)).setValue(value);
    }

    async scrollIntoView() {
        Logger.info(`Scroll element "${this.name}" into view`);
        await $(this.locator).isExisting();
        const element = await (await $(this.locator));
        return element.scrollIntoView();
    }
}