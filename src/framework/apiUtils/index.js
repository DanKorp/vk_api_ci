const axios = require('axios').default;

module.exports = class APIUtils {
    static async getData(url, ...args) {
        return axios.get(url, ...args)
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                return error.response;
            });
    }

    static async postData(url, ...args) {
        return axios.post(url, ...args)
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                return error.response;
            });
    }
}