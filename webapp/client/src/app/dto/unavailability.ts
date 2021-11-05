export class Unavailability {
    constructor(
        public id: number,
        public startDate: Date,
        public endDate: Date,
        public comments: string
    ) { }
}