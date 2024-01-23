const BaseForm = require('../../framework/baseForm');

class BottomBarLoginForm extends BaseForm {
    constructor() {
        super('//div[contains(@class, "PageBottomBanner--unauth")]', 'Bottom Bar Login Form')
    }
}

module.exports = new BottomBarLoginForm();