export class Payable {
    public fieldName: string
    public provider: string
    public category: string
    public subCategory: string
    public documentId: string
    public pricePerUnit: number
    public quantity: number
    public comment: string
    public transactionDate: Date
    public lastUpdated: Date
    public _id: string

    public constructor(init?:Partial<Payable>) {
        Object.assign(this, init);
    }
}
