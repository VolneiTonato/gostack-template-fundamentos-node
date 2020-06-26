export enum CodeError{
    BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  CONFLICT = 409,
  NOT_FOUND = 404,
  UNPROCESSABLE = 422,
  INTERNAL_SERVER_ERROR = 500
}

interface IExceptionError{
    status:number,
    message:string

}

export class ExceptionError implements IExceptionError{
    status:number
    message:string


    constructor(args: IExceptionError){
        this.status = args.status
        this.message = args.message
    }
}