import { IDatabaseProvider } from "./../../core/providers";
import lowdb = require('lowdb');
import * as FileSync from 'lowdb/adapters/FileSync';
import { LowdbSync } from 'lowdb';
import { Article } from "./../entities";

class LocalDbScheme{
    public articles: Article[] = []
}

interface LocalDb extends LowdbSync<LocalDbScheme>{

}

class LocalDatabaseProvider implements IDatabaseProvider{

    readonly dbType: string;

    public localDb: LocalDb;

    constructor(private dbPath: string){
        this.dbType = 'local';
    }

    createDatabase() : LocalDb {
        const scheme = new LocalDbScheme();
        const adapter = new FileSync(`assets/db/${this.dbPath}`);
        this.localDb = lowdb(adapter);  
        this.localDb.defaults(scheme).write();

        return this.localDb;
    }
}

export default LocalDatabaseProvider;
export { LocalDb };