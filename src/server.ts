import * as bodyParser from "body-parser";
import * as express from "express";
import * as logger from "morgan";
import * as passport from "passport";
import * as session from "express-session";
import * as cookieParser from "cookie-parser";
import * as uidSafe from "uid-safe";
import * as compression from "compression";

import "reflect-metadata";

import { InversifyExpressServer } from 'inversify-express-utils';

import { Config } from "./config/config";
import { Injector } from "./config/injector";
import { Auth } from "./config/auth";
import { Common } from "./common/common";
import * as AWS from 'aws-sdk';
import { ServiceConfigurationOptions } from "aws-sdk/lib/service";

/**
 * @class Server. Manage the server configuration
 */
export class Server {

    private app: express.Application;
    private dbConnection;
    private static _instance: Server;

    /**
     * @method getServerInstance Get a singleton of the node server
     * @returns The Server singleton
     */
    public static getServerInstance(): Server {
        return this._instance || (this._instance = new this());
    }

    /**
     * @method getApp Get the node app of the server
     * @returns The express application
     */
    public getApp(): express.Application {
        return this.app;
    }

    /**
     * @method getDbConnection Get the connection instance to the database
     * @returns The database instance used by the Node Server
     */
    public getDbConnection() {
        return this.dbConnection;
    }

    /**
     * @method getUrl Get the current URL of the server
     * @returns The server URL
     */
    public getUrl(): string {
        return Config.getUrl();
    }

    /**
     * @method getPort Get the current PORT of the server
     * @returns The server PORT
     */
    public getPort(): string {
        return Config.getPort();
    }

    private constructor() {
        this.app = new InversifyExpressServer(this.configureInjection()).setConfig((app) => {
            this.config(app);
        }).build();
    }

    private config(app) {
        app.set('url', Config.getUrl());
        app.set("port", Config.getPort());

        app.use(logger("dev"));

        app.use(bodyParser.json());

        app.use(bodyParser.urlencoded({
            extended: true
        }));
        
        let serviceConfigOptions: ServiceConfigurationOptions = {
            region: Config.getDynamoRegion(),
            endpoint: Config.getDynamoEndpoint()
        };

        this.dbConnection = new AWS.DynamoDB.DocumentClient(serviceConfigOptions);
    
        app = this.configureMiddleware(app);
        app = this.configureSession(app);
        app = this.configureAuthentication(app);

        return app;
    }

    private configureInjection() {
        return Injector.getContainer();
    }

    private configureMiddleware(app: express.Application): express.Application {
        app.use(compression());
        app.use(Common.setupGlobalHeaders);
        return app;
    }

    private configureSession(app: express.Application): express.Application {
        const sessionOpts = {
            genid: function (req) {
                return uidSafe.sync(18); // use UUIDs for session IDs
            },
            secret: "cats",
            resave: false,
            saveUninitialized: true,
            cookie: { httpOnly: true, maxAge: 2419200000, path: '/', secure: false }
        };
        app.use(cookieParser(sessionOpts.secret));
        app.use(session(sessionOpts));
        return app;
    }

    private configureAuthentication(app: express.Application): express.Application {
        let auth: Auth = new Auth();
        passport.use(auth.getLocalAuthenticationStrategy());
        passport.serializeUser((user, done) => auth.serializeUser(user, done));
        passport.deserializeUser((username, done) => auth.deserializeUser(username, done));
        app.use(passport.initialize());
        app.use(passport.session());
        return app;
    }
}