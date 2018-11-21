class ValidationHelper{

    static isNotNullOrEmpty(input: string):void {
        if(!input){
            throw Error(`{input} can't be null or`);
        }
    }
}

export { ValidationHelper };