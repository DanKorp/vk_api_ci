const BaseForm = require('../../framework/baseForm');
const Element = require('../../framework/baseElement');

class VkIdForm extends BaseForm {
    constructor() {
        super('//form[@class="vkc__EnterPasswordNoUserInfo__content"]', "VK ID Form");
    }

    get passwordField() {
        return new Element('//input[@name="password"]', 'Password Field');
    }

    get loginIntoAccountButton() {
        return new Element('//span[@class="vkuiButton__in"]', 'LogIn into Account Button');
    }

    async typeSecretPassword(password) {
        await this.passwordField.clearAndTypeSecret(password)
    }

    async clickLoginButton() {
        await this.loginIntoAccountButton.click();
    }
}

module.exports = new VkIdForm();