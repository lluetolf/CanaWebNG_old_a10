export class Field {
    public name: string;
    public owner: string;
    public size: number;
    public cultivatedArea: number;
    public ingenioId: number;
    public acquisitionDate: Date;
    public lastUpdated: Date;

    public constructor(init?: Partial<Field>) {
        Object.assign(this, init);
    }
}
