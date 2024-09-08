export class Invoice {
  public id: number;
  public type: 'Purchase' | 'Sales';
  public companyName: string;
  public description: string;
  public amount: number;
  public vat: number;
  public date: Date;
  public siteCode: string;
  public invoiceNumber: string;

  constructor(
    id: number,
    type: 'Purchase' | 'Sales',
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
