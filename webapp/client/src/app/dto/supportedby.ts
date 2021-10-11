import { Mission } from "./mission";
import { OrderContent } from "./ordercontent";

export class SupportedBy {
    constructor(
        public plannedDeliveryTime: Date,
        public signatureTime: Date,
        public isDelivered: boolean,
        public orderContentId: number,
        public missionId: number,
        public orderContent: OrderContent,
        public mission: Mission
    ) { }
}