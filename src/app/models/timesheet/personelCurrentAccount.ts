export class PersonelCurrentAccount {
    public personelId: string;
    public totalAmount: number;
    public totalSgkPremium: number;
    public createdDate: Date;
    public period: string;

    constructor(
        personelId: string,
        totalAmount: number,
        totalSgkPremium: number,
        createdDate: Date,
        period: string
    ) {
        this.personelId = personelId;
        this.totalAmount = totalAmount;
        this.totalSgkPremium = totalSgkPremium;
        this.createdDate = createdDate;
        this.period = period;
    }
}
