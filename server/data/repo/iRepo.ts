import { IEntity } from "../entities/iEntity";

export interface IRepo<T extends IEntity, TDb> {
    // tslint:disable-next-line:typedef
    constructor(tableName: string, db: TDb);

    create(obj: T): T;
    update(obj: T): void;
    delete(obj: T): void;
    delete(id: number): void;
    executeQuery(query: string): T[];
}