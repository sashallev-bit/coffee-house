

export interface ResponseDto<T = unknown> {
    message: string;
    data?: T;
    errors: string;
}