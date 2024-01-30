export interface IErrorResponseData {
  status: false;
  errorCode: number;
  message: string | string[];
  metaData?: any;

  [unknown: string]: any;
}

export interface ISuccessResponseData {
  status: true;
  successCode: number;
  data: any;
  metaData?: any;

  [unknown: string]: any;
}
