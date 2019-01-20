/**
 * @interface IUserRepository Communicate with the database system for the users objects
 */
export interface IUserRepository {
    /**
     * @method get Execute a get request on the associated database based on parameter
     * @param params A json object as a key identifier like { username: USERNAME }
     * @returns The db json result or null
     */
    get(params: any): Promise<any>;

    /**
     * @method post Execute a post request on the associated database with the following parameter
     * @param params A json object like { username: USERNAME, password: PASSWORD }
     * @returns The db json result or null
     */
    post(params: any): Promise<any>;

    /**
     * @method getTableName Get the name of the db table targeted by the repository
     * @returns Name of the table
     */
    getTableName(): string;

    /**
     * @method setTableName Set the name of the db table targeted by the repository
     * @param tableName Name of the table
     */
    setTableName(tableName: string);

    /**
     * @method setDbConnection Set the connection to the database
     * @param dbConnection The connection to the database
     */
    setDbConnection(dbConnection);
}