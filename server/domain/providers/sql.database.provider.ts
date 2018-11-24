import IDatabaseProvider from "../../core/providers/iDatabase.provider";

class SqlDatabaseProvider implements IDatabaseProvider{
    readonly dbType: string;

    constructor(){
        this.dbType = 'sql';
    }

    createDatabase() {
        //throw new Error("Method not implemented.");
        return null;
    }

}

export default SqlDatabaseProvider;