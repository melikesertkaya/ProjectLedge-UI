export class CurrentAmountResponseModel {
    companyId: string; 
    constructionSiteNo: string; 
    constructionSiteName: string;
    totalAmount: number; 
    currentAccountType: CurrentAccountType; 
    date:Date

    constructor(
      companyId: string,
      constructionSiteNo: string,
      constructionSiteName: string,
      totalAmount: number,
      currentAccountType: CurrentAccountType,
      date:Date
    ) {
      this.companyId = companyId;
      this.constructionSiteNo = constructionSiteNo;
      this.constructionSiteName = constructionSiteName;
      this.totalAmount = totalAmount;
      this.currentAccountType=currentAccountType;
      this.date=date
    }
    getCurrentAccountTypeString(): string {
      switch (this.currentAccountType) {
        case CurrentAccountType.ReceivableAmount:
          return 'Alış';
        case CurrentAccountType.PayableAmount:
          return 'Satış';
          case CurrentAccountType.ProgressPaymentAmount:
            return 'Hakediş';
        default:
          return 'Unknown'; // Fallback for unknown values
      }
    }
  }
  export enum CurrentAccountType {
    ReceivableAmount = 1, // Alış
    PayableAmount = 2, // Satış
    ProgressPaymentAmount=3 //Hakediş
  }