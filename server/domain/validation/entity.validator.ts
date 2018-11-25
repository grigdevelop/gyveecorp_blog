import * as Joi from 'joi';
import { ValidationResult } from "./validation.result";
import { ValidationErrorItem } from "joi";
import { LoginInput } from "../../core/services";
import { Article } from '../entities';

const articleSchema = Joi.object().keys({
    id: Joi.number().error(() => '"id" most be a number.').optional(),
    title: Joi.string().min(3).max(100).required(),
    desc: Joi.string().required(),
    authorId: Joi.number().min(1).required(),
    content: Joi.string().required().error(() => 'content is required'),
    datePublished: Joi.date().required()
});

const loginInputSchema = Joi.object().keys({
    username: Joi.string().min(3).max(10).required(),
    password: Joi.string().required()
});

const options: Joi.ValidationOptions = {
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

let validateArticle = async (article: Article) : Promise<ValidationResult> => {
    return await validateEntity(article, articleSchema);
};

let validateLoginInput = async (login: LoginInput): Promise<ValidationResult> => {
    return await validateEntity(login, loginInputSchema);
}

export { validateArticle, validateLoginInput }