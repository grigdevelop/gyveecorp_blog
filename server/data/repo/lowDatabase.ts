import * as lowdb from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';

const adapter = new FileSync('db.json');
const db : lowdb.LowdbSync<any> = lowdb(adapter);

db.defaults({articles: [], authors: []}).write();

export { db }; 
