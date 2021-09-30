import { DeliveryPoint } from "./deliverypoint";
import { Order } from "./order";
import { Product } from "./product";

export class OrderContent {
    constructor(
        public id: number,
        public quantity: number,
        public desiredDeliveryDate: Date,
        public product: Product,
        public order: Order,
        public deliveryPoint: DeliveryPoint
    ) { }
}