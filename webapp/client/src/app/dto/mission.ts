import { Driver } from "./driver";
import { LoadingPoint } from "./loadingpoint";
import { Truck } from "./truck";

export class Mission {

    static OK = 1;
    static KO = -1;
    static BEGUN = 2;
    static NOT_BEGUN = 0;

    constructor(
        public id: number,
        public loadingTime: Date,
        public loadingPoint: LoadingPoint,
        public driver: Driver,
        public truck: Truck,
        public truckAvailable: boolean,
        public status: number
    ) { }
}