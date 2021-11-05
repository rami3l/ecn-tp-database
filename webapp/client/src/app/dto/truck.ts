import { Driver } from "./driver";
import { TruckType } from "./trucktype";
import { Unavailability } from "./unavailability";

export class Truck {
    constructor(
        public licensePlate: string,
        public truckType: TruckType | undefined,
        public assignedDriver: Driver | undefined,
        public unavailabilities: Unavailability[]
    ) { }
}