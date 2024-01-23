const BaseForm = require('../../framework/baseForm');
const { loginForm } = require('../../forms/index');

class WelcomePage extends BaseForm {
    constructor() {
        super('//div[@class="JoinForm"]', "Welcome Page");
    }

    get loginForm() {
        return loginForm;
    }
}

module.exports = new WelcomePage();