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

    static validate(article: Article) {
        let result : ValidationResult = new ValidationResult();

        result.forField("title", () => !validator.isEmpty(article.title), 
            "Article title can't be empty.")

        result.forField("desc", () => !validator.isEmpty(article.desc),
            "Article descrtiption can't be empty.");
        
        this.forField("content", () => !validator.isEmpty(article.content),
            "Article content can't be empty.");

        return result;
    }

    static forField(fieldName: string, fn: () => boolean, message: string){

    }
}

export {ArticleValidator};