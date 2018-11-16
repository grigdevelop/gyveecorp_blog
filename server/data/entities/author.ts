import { IEntity } from "./iEntity";

export class Author implements IEntity {
    id: number;
    name: string;
    passwordHash: string;

    static getTableName(): string {
        return "authors";
    }
}