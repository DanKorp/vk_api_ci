const BaseForm = require('../../framework/baseForm');
const { sidebarMenuForm } = require('../../forms/index');

class FeedPage extends BaseForm {
    constructor() {
        super('//div[@id="main_feed"]', 'Feed Page');
    }

    get sidebarMenuForm() {
        return sidebarMenuForm
    }
}

module.exports = new FeedPage();