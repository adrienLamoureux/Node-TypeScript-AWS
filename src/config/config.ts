import * as config from "../../config";

/**
 * @class Config. Helper class to use the relevant configuration for the server
 */
export class Config {

    /**
     * @method getVersion Return the current version of the API
     * @returns The current version
     */
    public static getVersion(): string {
        return config.env.VERSION;
    }

    /**
     * @method getVersionPublic Return the public endpoint based on the version
     * @returns The public endpoint
     */
    public static getVersionPublic(): string {
        return Config.getVersion() + config.env.PUBLIC;
    }

    /**
     * @method getVersionAuth Return the endpoint which requiert authentication
     * @returns The authentication endpoint
     */
    public static getVersionAuth(): string {
        return Config.getVersion() + config.env.AUTH;
    }

    /**
     * @method getUrl Return the server URL
     * @returns The server URL
     */
    public static getUrl(): string {
        return config.env.URL;
    }

    /**
     * @method getPort Return the server PORT
     * @returns The server PORT
     */
    public static getPort(): string {
        return config.env.PORT;
    }

    /**
     * @method getDynamoURL Return the dynamoDB URL
     * @returns The dynamoDB URL
     */
    public static getDynamoURL(): string {
        return config.env.DYNAMO_URL;
    }

    /**
     * @method getDynamoPORT Return the dynamoDB PORT
     * @returns The dynamoDB PORT
     */
    public static getDynamoPORT(): string {
        return config.env.DYNAMO_PORT;
    }

    /**
     * @method getDynamoRegion Return the dynamoDB Region configured
     * @returns The dynamoDB Region
     */
    public static getDynamoRegion(): string {
        return config.env.DYNAMO_REGION;
    }

    /**
     * @method getDynamoAPIVersion Return the dynamoDB API Version
     * @returns The dynamoDB API Version
     */
    public static getDynamoAPIVersion(): string {
        return config.env.DYNAMO_API_VERSION;
    }

    /**
     * @method getDynamoEndpoint Return the dynamoDB endpoint based on URL and PORT
     * @returns The dynamoDB endpoint
     */
    public static getDynamoEndpoint(): string {
        return "http://"+Config.getDynamoURL()+":"+Config.getDynamoPORT();
    }
}

