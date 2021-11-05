
export class SupportedByToSave {
    constructor(
        public plannedDeliveryTime: string,
        public orderContentId: number,
        public missionId: number,
        public delivered = false,
        public signatureTime: string | undefined = undefined
    ) { }
}