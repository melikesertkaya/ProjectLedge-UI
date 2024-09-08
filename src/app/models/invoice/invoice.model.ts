export class Invoice {
  public id: number;
  public type: 'Alış' | 'Satış';
  public companyName: string;
  public description: string;
  public amount: number;
  public vat: number;
  public date: Date;
  public siteCode: string;
  public invoiceNumber: string;

  constructor(
    id: number,
    type: 'Alış' | 'Satış',
    companyName: string,
    description: string,
    amount: number,
    vat: number,
    date: Date,
    siteCode: string,
    invoiceNumber: string
  ) {
    this.id = id;
    this.type = type;
    this.companyName = companyName;
    this.description = description;
    this.amount = amount;
    this.vat = vat;
    this.date = date;
    this.siteCode = siteCode;
    this.invoiceNumber = invoiceNumber;
  }
}
