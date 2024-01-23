const BaseForm = require('../../framework/baseForm');
const { wallForm, sidebarMenuForm, topBarForm, bottomBarLoginForm } = require('../../forms/index');

class ProfilePage extends BaseForm {
    constructor() {
        super('//div[@class="ProfileWrapper"]', 'Profile Page');
    }

    get wallForm() {
        return wallForm;
    }

    get sidebarMenuForm() {
        return sidebarMenuForm;
    }

    get topBarForm() {
        return topBarForm;
    }

    get bottomBarLoginForm() {
        return bottomBarLoginForm;
    }
}

module.exports = new ProfilePage();