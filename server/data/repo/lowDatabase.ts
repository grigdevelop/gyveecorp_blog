import lowdb = require('lowdb');
import * as FileSync from 'lowdb/adapters/FileSync';
import { LowdbSync } from 'lowdb';
import { Article } from '../entities/article';
import { Author } from '../entities/author';

class LocalDbScheme{
    public articles: Article[] = [];
    public authors: Author[] = [];
}

interface LowDbWithScheme extends LowdbSync<LocalDbScheme>{

}


let localDbInstance : LowDbWithScheme;

function getLocalDbInstance(localDbPath: string): LowDbWithScheme {

    if( !localDbInstance ) {

        let scheme = new LocalDbScheme();
        const adapter = new FileSync(localDbPath);        
        localDbInstance = lowdb(adapter)
        localDbInstance.defaults(scheme).write(); 
    };    

    return localDbInstance;
}

export { getLocalDbInstance, LowDbWithScheme }; 
