export interface RegisterDto {
    login: string;
    password: string;
    confirmPassword: string;
    city: string;
    street: string;
    houseNumber: string;
    paymentMethod: string | string[];
}