import { Address } from "./address";

export class Client {
    constructor(
        public abbrev: string,
        public name: string,
        public address: Address
    ) { }
}