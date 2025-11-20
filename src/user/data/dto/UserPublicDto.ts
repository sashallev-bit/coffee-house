

export interface UserPublicDto {
    "id": number,
    "login": string,
    "city": string,
    "street": string,
    "houseNumber": number,
    "paymentMethod": string | string[],
    "createdAt": string,
}
