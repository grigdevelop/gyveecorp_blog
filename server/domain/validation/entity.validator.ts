import Article from "../entities/article";
import * as Joi from 'joi';
import { ValidationResult } from "./validation.result";
import { ValidationErrorItem } from "joi";

let articleSchema = Joi.object().keys({
    id: Joi.number().error(() => '"id" most be a number.').optional(),
    title: Joi.string().min(3).max(100).required(),
    desc: Joi.string().required(),
    authorId: Joi.number().required(),
    content: Joi.string().required().error(() => 'content is required'),
    datePublished: Joi.date().required()
});

let options: Joi.ValidationOptions = {
    abortEarly: false
};

// validation method for all types of entity
let validateEntity = <T>(entity: T, schema: Joi.ObjectSchema) : Promise<ValidationResult> => {
    return new Promise<ValidationResult>(resolve => {

        // use custom validation result
        let validationResult: ValidationResult = new ValidationResult();

        Joi.validate(entity, schema, options).then(result => {

            // no validation error
            resolve(validationResult);

        }).catch(error => {   

            // get strong types result of validation details
            let details: ValidationErrorItem[] = error.details;

            // set default message
            validationResult.addMessage(error.message);

            // add field validation errors to custom validation result
            details.forEach(detail => {
                validationResult.addError(detail.context.label, detail.message)
            });

            // resolve validation result
            resolve(validationResult);
        });

    });
}

let validateArticle = (article: Article) : Promise<ValidationResult> => {
    return validateEntity(article, articleSchema);
};

export { validateArticle }