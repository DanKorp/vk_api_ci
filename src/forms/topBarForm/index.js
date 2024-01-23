const BaseForm = require('../../framework/baseForm');
const Element = require('../../framework/baseElement');

class TopBarForm extends BaseForm {
    constructor() {
        super('//div[@id="page_header_cont"]', 'Top Bar Form');
    }

    get topProfileLinkButton() {
        return new Element('//a[@id="top_profile_link"]', 'Top Profile Link Button');
    }

    get logOutButton() {
        return new Element('//a[@id="top_logout_link"]', 'Log Out Button');
    }

    async clickTopProfileLinkButton() {
        await this.topProfileLinkButton.click();
    }

    async clickLogOutButton() {
        await this.logOutButton.click();
    }
}

module.exports = new TopBarForm();