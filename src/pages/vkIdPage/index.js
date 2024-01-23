const BaseForm = require('../../framework/baseForm');
const { vkIdForm } = require('../../forms/index');

class VkIdPage extends BaseForm {
    constructor() {
        super('//div[contains(@class, "vkc__AuthRoot__rootContainer")]', 'VK ID Page');
    }

    get vkIdForm() {
        return vkIdForm;
    }
}

module.exports = new VkIdPage();