import { Address } from "./address";
import { Client } from "./client";

export class DeliveryPoint {
    constructor(
        public id: number,
        public address: Address,
        public client: Client
    ) { }
}