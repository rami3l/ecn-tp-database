import { Driver } from "./driver";
import { LoadingPoint } from "./loadingpoint";
import { Truck } from "./truck";

export class Mission {
    constructor(
        public id: number,
        public loadingTime: Date,
        public loadingPoint: LoadingPoint,
        public driver: Driver,
        public truck: Truck
    ) { }
}