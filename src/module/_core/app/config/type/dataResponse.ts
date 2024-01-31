export interface IErrorResponseData {
    status: false;
    errorCode: number;
    message: string | string[];
    metaData?: any;

    [x: string]: any;
}
