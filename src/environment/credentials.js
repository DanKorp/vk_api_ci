require('dotenv').config();

module.exports = {
    'testUser': {
        phone: process.env.TEST_USER_PHONE,
        password: process.env.TEST_USER_PASSWORD,
        accessToken: process.env.TEST_USER_TOKEN,
        ownerID: process.env.TEST_USER_ID,
        userProfileLink: process.env.TEST_USER_LINK
    }
}