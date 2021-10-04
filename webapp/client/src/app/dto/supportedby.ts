import { Mission } from "./mission";
import { OrderContent } from "./ordercontent";

export class SupportedBy {
    constructor(
        public plannedDeliveryDate: Date,
        public signatureTime: Date,
        public isDelivered: boolean,
        public orderContent: OrderContent,
        public mission: Mission
    ) { }
}