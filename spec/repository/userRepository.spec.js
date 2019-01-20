import "jasmine";
import { UserRepository } from "../../src/repository/userRepository";
var AWS = require('aws-sdk');
const config = require("../../config");

/**
 * Goal: Integration test for the DynamoDB
 * Unit tests with Mocks are not useful because of the strong dependency with DynamoDB
 * Pre-requiert: Having setting-up the test environment in the DB
 */
describe("get", () => {

    let dbConnection = null;
    let userRepository = null;

    beforeAll(() => {
        AWS.config.update({
            region: config.env.DYNAMO_REGION,
            endpoint: "http://"+config.env.DYNAMO_URL+":"+config.env.DYNAMO_PORT
        });        
        dbConnection = new AWS.DynamoDB.DocumentClient();
        userRepository = new UserRepository();
        userRepository.setDbConnection(dbConnection);
        userRepository.setTableName(config.test.USER_TABLE);
    });

    it("should get an entity object with correct params", (done) => {
        userRepository.get({
            username: config.test.USER_USERNAME
        }).then((req) => {
            expect(req.username).toEqual(config.test.USER_USERNAME);
            done();
        });
    });
    it("should get a null object with incorrect params", (done) => {
        userRepository.get({
            username: config.test.USER_USERNAME+"1",
        }).then((req) => {
            expect(req).toBeNull();
            done();
        });
    });
});