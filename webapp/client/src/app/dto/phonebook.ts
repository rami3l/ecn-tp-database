export class PhoneBook {
    constructor(
        public id: string,
        public from: Map<string, string>,
        public data: Map<string, string>[]
    ) { }
}