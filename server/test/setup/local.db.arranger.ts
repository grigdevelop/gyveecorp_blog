import { LocalDb } from "./../../domain/providers/local.database.provider";
import DbArranger from "./../../core/arrangers/idbArranger";


class LocalDbArranger implements DbArranger{
    
    constructor(private localDb: LocalDb){

    }


    resetAsync(): Promise<void> {
        let self = this;

        return new Promise<void>(resolve => {

            self.localDb.setState({articles: []});
            self.localDb.write();

            resolve();
        });
    }

    resetWithDataAsync(data: any): Promise<void>{
        let self = this;

        return new Promise<void>(resolve => {

            self.localDb.setState(data);
            self.localDb.write();

            resolve();
        });
    }
}

export { LocalDbArranger };