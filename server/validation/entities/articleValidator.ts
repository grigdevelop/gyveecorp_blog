import { Article } from "../../data/entities/article";
import * as validator from 'validator';

type Dictionary = {
    key: string,
    value: string
}

class ValidationResult{

    private validationObject = {};

    forField(fieldName: string, doValidate: () => boolean, message: string):void{

        if(!doValidate()){

            if(!this.validationObject[fieldName]){
                this.validationObject[fieldName] = [];
            }

            this.validationObject[fieldName].push(message);
        }
    }
}

class ArticleValidator {

    static validate(article: Article):string[] {
        let messages : string[] = [];

        this.forField("title", () => !validator.isEmpty(article.title), 
            "Article title can't be empty.")

        this.forField("desc", () => !validator.isEmpty(article.desc),
            "Article descrtiption can't be empty.");

        return messages;
    }

    static forField(fieldName: string, fn: () => boolean, message: string){

    }
}

export {ArticleValidator};