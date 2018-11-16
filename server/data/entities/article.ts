import { IEntity } from "./iEntity";

export class Article implements IEntity {
    id: number;
    title: string;
    desc: string;
    authorId: number;
    content: string;
    datePublished: Date;

    static getTableName(): string {
        return "articles";
    }
}