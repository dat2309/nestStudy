export class ResponseData<D>{
    data :D | D[];
    status:number;
    message:string
}