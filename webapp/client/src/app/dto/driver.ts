import { Certification } from "./certification";
import { Truck } from "./truck";

export class Driver {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public defaultTruck: Truck,
        public certifications: Certification[]
    ) { }
}