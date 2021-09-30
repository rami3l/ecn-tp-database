import { Client } from "./client";

export class Order {
    constructor(
        public id: number,
        public client: Client
    ) { }
}