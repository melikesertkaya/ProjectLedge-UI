export class ProgressPayment {
    public id: number;
    public date: Date;
    public euroBalance: number;
    public dollarBalance: number;
    public tlBalance: number;
    public amount: number;
    public siteName: string;
    public companyName: string;
  
    constructor(
      id: number,
      date: Date,
      euroBalance: number,
      dollarBalance: number,
      tlBalance: number,
      amount: number,
      siteName: string,
      companyName: string
    ) {
      this.id = id;
      this.date = date;
      this.euroBalance = euroBalance;
      this.dollarBalance = dollarBalance;
      this.tlBalance = tlBalance;
      this.amount = amount;
      this.siteName = siteName;
      this.companyName = companyName;
    }
  }
  