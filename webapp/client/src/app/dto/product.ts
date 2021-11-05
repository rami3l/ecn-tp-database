import { Stock } from "./stock";


export class Product {
    constructor(
        public id: number,
        public name: string,
        public stocks: Stock[]
    ) { }
}