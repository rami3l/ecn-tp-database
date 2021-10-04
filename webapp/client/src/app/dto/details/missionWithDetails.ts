import { Driver } from "../driver";
import { LoadingPoint } from "../loadingpoint";
import { Mission } from "../mission";
import { OrderContent } from "../ordercontent";
import { Truck } from "../truck";

export class MissionWithDetails extends Mission {
    constructor(
        id: number,
        loadingTime: Date,
        loadingPoint: LoadingPoint,
        driver: Driver,
        truck: Truck,
        public orderContents: OrderContent[]
    ) {
        super(id, loadingTime, loadingPoint, driver, truck);
    }
}