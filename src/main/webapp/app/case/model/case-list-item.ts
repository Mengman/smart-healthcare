import { Case } from './case';

export class CaseListItem extends Case {
    public createdBy: string;
    public createdDate: string;
    public lastModifiedBy: string;
    public lastModifiedDate: string;
    public tasks: any;
}
