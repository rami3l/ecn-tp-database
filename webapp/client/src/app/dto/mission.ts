import { Driver } from "./driver";
import { Truck } from "./truck";

export class Mission {
    constructor(
        public id: number,
        public loadingTime: Date,
        public driver: Driver,
        public truck: Truck
    ) { }
}