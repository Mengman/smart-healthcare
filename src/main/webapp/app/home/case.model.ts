export class Case {
    constructor(
        public id: number,
        public name: string,
        public gender: string,
        public phone: string,
        public years: number,
        public type: string,
        public visitTime: Date
    ) {}
}
