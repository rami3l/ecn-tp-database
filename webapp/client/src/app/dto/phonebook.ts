import { PhoneBookFrom } from "./phonebookfrom";

export class PhoneBook {
    constructor(
        public id: string,
        public from: PhoneBookFrom,
        public data: Map<string, string>[]
    ) { }
}