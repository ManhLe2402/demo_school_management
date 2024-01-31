class AppException extends Error {
    public errorCode: number;
    public message: string;

    constructor(errorCode: number, message: string) {
        super(message);
        this.errorCode = errorCode;
        this.message = message;
    }
}

export default AppException;
