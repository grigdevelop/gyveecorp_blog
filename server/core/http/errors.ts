
/**
 * ApiError. Extends @type {Error}
 */
class ApiError extends Error{
   
    /** The name of the error */
    public readonly name: string = "ApiError";

    /** Error message */
    public readonly errorMessage :string = '';

    /** Error message */
    public readonly message: string = '';

    /**
     * Create an error for api requests
     * @constructor
     * @param {Error} error - Native JS Error
     */
    constructor(public error: Error) {
        super(error.message);        

        this.errorMessage = error.message;
        this.message = error.message;
    }
}

export { ApiError };