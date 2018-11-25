import { ValidationResult } from "../../domain/validation/validation.result";

class ValidationError extends Error {
    readonly name: string = 'ValidationError';

    constructor(public result: ValidationResult){
        super();
    }
}

export {ValidationError};