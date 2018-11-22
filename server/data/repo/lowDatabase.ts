import lowdb = require('lowdb');
import * as FileSync from 'lowdb/adapters/FileSync';
import { LowdbSync } from 'lowdb';

let localDbInstance : LowdbSync<any>;

localDbInstance.defaults({articles: [], authors: []}).write();

function getLocalDbInstance(localDbPath: string){
    if( localDbInstance ) return localDbInstance;

    const adapter = new FileSync(localDbPath);
    localDbInstance = lowdb(adapter)

}

export { getLocalDbInstance }; 
