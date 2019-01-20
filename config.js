require('dotenv').config();

const config = {
    env: {
        URL: process.env.URL || "localhost",
        PORT: process.env.PORT || "5000",
        API: process.env.API || "/api",
        VERSION: process.env.VERSION || "/v1",
        PUBLIC: process.env.PUBLIC || "/public",
        AUTH: process.env.AUTH || "/auth",
        DYNAMO_URL: process.env.DYNAMO_URL || "localhost",
        DYNAMO_PORT: process.env.DYNAMO_PORT || "8000",
        DYNAMO_REGION: process.env.DYNAMO_REGION || "fr-fr",
        DYNAMO_API_VERSION: process.env.DYNAMO_API_VERSION || "2012-10-08"
    },
    test: {
        USER_TABLE: process.env.TEST_USER_TABLE || "testusers",
        USER_USERNAME: process.env.TEST_USER_USERNAME || "toto@gmail.com",
        USER_PASSWORD: process.env.TEST_USER_PASSWORD || "toto"
    }
}

module.exports = config;