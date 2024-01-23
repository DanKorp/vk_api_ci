const BaseForm = require('../../framework/baseForm');
const Element = require('../../framework/baseElement');

class SidebarMenuForm extends BaseForm {
    constructor() {
        super('//div[@id="react_rootLeftMenuRoot"]', "Sidebar Menu");
    }

    get myProfileButton() {
        return new Element('//li[@id="l_pr"]', 'My Profile Button');
    }

    async clickMyProfileButton() {
        await this.myProfileButton.click();
    }
}

module.exports = new SidebarMenuForm();