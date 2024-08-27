export interface BaseResponse<T> {
    status: number;
    message: string;
    data: T;
}

export function isSuccess<T>(response: BaseResponse<T>): boolean {
    return response.status === 200;
}