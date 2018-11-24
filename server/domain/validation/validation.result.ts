interface FieldsValidationResult{
    [index: string]: string[];
}

class ValidationResult{
    private _message: string;

    public fieldsValidationResult: FieldsValidationResult = {};

    public get message(): string{
        return this._message;
    };

    public get hasErrors():boolean{

        // check if any message written or any invalid field exists
        if(this.message || Object.keys(this.fieldsValidationResult).length != 0){
            return true;
        }

        return false;
    }

    public addError(fieldName: string, message: string):void {
        
        if(!this.fieldsValidationResult[fieldName]){
            this.fieldsValidationResult[fieldName] = [];
        }

        this.fieldsValidationResult[fieldName].push(message);
    }

    public addMessage(message: string){
        this._message = message;
    }
}

export { ValidationResult };