import "jasmine";
import { UserService } from "../../src/service/userService";
import { UserRepository } from "../../src/repository/userRepository";
import { UserVO } from "../../src/service/vo/userVO";
const config = require("../../config");

/**
 * Unit test for UserService logic. Repository is Mocked
 */
describe("findByUsernamePassword", () => {

    let userService = null;
    let userRepository = null;

    beforeEach(() => {
        userRepository = new UserRepository();
    });

    it("should get UserVO with correct username and password", (done) => {
        spyOn(userRepository, "get").and.returnValue({
            username: config.test.USER_USERNAME,
            password: config.test.USER_PASSWORD
        });
        userService = new UserService(userRepository);
        userService.findByUsernamePassword(config.test.USER_USERNAME, config.test.USER_PASSWORD).then((userVO) => {
            expect(userVO).not.toBeNull();
            expect(userVO.getUsername()).toEqual(config.test.USER_USERNAME);
            expect(userVO.getPassword()).toEqual(config.test.USER_PASSWORD);
            done();
        });
    });
    it("should get null if username is missing", (done) => {
        spyOn(userRepository, "get").and.returnValue(null);
        userService = new UserService(userRepository);
        userService.findByUsernamePassword(null, config.test.USER_PASSWORD).then((userVO) => {
            expect(userVO).toBeNull();
            done();
        });
    });
    it("should get null if password is missing", (done) => {
        spyOn(userRepository, "get").and.returnValue(null);
        userService = new UserService(userRepository);
        userService.findByUsernamePassword(config.test.USER_USERNAME, null).then((userVO) => {
            expect(userVO).toBeNull();
            done();
        });
    });
});

describe("register", () => {

    let userService = null;
    let userRepository = null;

    beforeEach(() => {
        userRepository = new UserRepository();
    });

    it("should get true if user registered successfully", (done) => {
        spyOn(userRepository, "get").and.returnValue(null);
        spyOn(userRepository, "post").and.returnValue({});
        userService = new UserService(userRepository);
        userService.register(new UserVO(config.test.USER_USERNAME+"1", config.test.USER_PASSWORD+"1")).then((created) => {
            expect(created).toBe(true);
            done();
        });
    });
    it("should get false if the user already exist", (done) => {
        spyOn(userRepository, "get").and.returnValue({
            username: config.test.USER_USERNAME,
            password: config.test.USER_PASSWORD
        });
        userService = new UserService(userRepository);
        userService.register(new UserVO(config.test.USER_USERNAME, config.test.USER_PASSWORD)).then((created) => {
            expect(created).toBe(false);
            done();
        });
    });
});