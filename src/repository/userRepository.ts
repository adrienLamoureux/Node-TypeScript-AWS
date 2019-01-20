import { IUserRepository } from "./interface/userRepository";
import { Server } from "../server";

import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class UserRepository implements IUserRepository {

    private tableName: string;
    private dbConnection;

    constructor(){
        this.tableName = "users";
    }

    public getTableName(): string {
        return this.tableName;
    }

    public setTableName(tableName: string): void {
        this.tableName = tableName;
    }

    public setDbConnection(dbConnection) {
        this.dbConnection = dbConnection;
    }

    public async get(params: any): Promise<any> {
        return new Promise((resolve, reject) => { 
            this.getDAO().get({
                TableName: this.tableName,
                Key: params
            }, function(err, data) {
                if(err){
                    return reject(err);
                }
                if(!data){
                    return resolve(null);
                }
                return resolve(data.Item || null);
            }
            );
        });
    }

    public async post(params: any): Promise<any> {
        console.log("params");
        console.log(params);
        return new Promise((resolve, reject) => { 
            this.getDAO().put({
                TableName: this.tableName,
                Item: params
            }, function(err, data) {
                if(err){
                    return reject(err);
                }
                if(!data){
                    return resolve(null);
                }
                return resolve(data.Item || null);
            }
            );
        });
    }

    private getDAO(): any {
        return this.dbConnection || Server.getServerInstance().getDbConnection();
    }
}