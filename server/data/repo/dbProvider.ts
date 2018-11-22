import { getLocalDbInstance, LowDbWithScheme } from './lowDatabase';
import * as fs from 'fs';

interface IDbProvider<TLocalDb, TSqlDb> {

    getLocalDb():TLocalDb;

    getSqlDb():TSqlDb;
}

class DbProvider implements IDbProvider<LowDbWithScheme, any>{
    
    constructor(private localDbPath: string){

    }

    getLocalDb() {        
        return getLocalDbInstance(this.localDbPath);
    }    
    
    getSqlDb() {
        throw new Error("Method not implemented.");
    }

}

export { DbProvider, IDbProvider };