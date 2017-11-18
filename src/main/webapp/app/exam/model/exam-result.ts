export class ExamResult {
    constructor(
        public name: string,
        public gender: string,
        public birthday: string,
        public id: string,
        public dustAge: string,
        public dustType: string,
        public jobHistory?: string,
        public examDesc?: string
    ) {

    }
}
