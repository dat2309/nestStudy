export class ResponseData<D>{
    data :D | D[];
    status:number;
    message:string
    constructor(data:D | D[],status:number,message:string){
}