const BaseForm = require('../../framework/baseForm');
const Element = require('../../framework/baseElement')

class LoginForm extends BaseForm {
    constructor() {
        super('//div[@id="index_login"]', 'Login Form');
    }

    get phoneOrEmailField() {
        return new Element('//input[contains(@id, "index_email")]', 'Login Field');
    }

    get signUpButton() {
        return new Element('//button[contains(@class, "VkIdForm__signInButton")]//span[@class="FlatButton__in"]', 'SignIn Button');
    }

    async typeInPhoneNumber(phoneNumber) {
        await this.phoneOrEmailField.clearAndType(phoneNumber);
    }

    async clickSignInButton() {
        await this.signUpButton.click();
    }
}

module.exports = new LoginForm();