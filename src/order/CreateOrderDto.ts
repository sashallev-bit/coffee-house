import type { OrderItemDto } from "./OrderItemDto";

interface CreateOrderDto {
    items: Array<OrderItemDto>,
    totalPrice: number,
}