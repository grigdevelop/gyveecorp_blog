import * as lowdb from 'lowdb';
import { getLocalDbInstance } from './lowDatabase';

interface IDbProvider<TLocalDb, TSqlDb> {

    getLocalDb():TLocalDb;

    getSqlDb():TSqlDb;
}

class DbProvider implements IDbProvider<lowdb.LowdbSync<any>, any>{

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