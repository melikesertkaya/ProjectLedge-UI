export class Company {
  id: string; // Guid yerine string kullanıyoruz
  name: string;
  address: string;
  phoneNumber: string; // API'de `PhoneNumber` olarak geçiyor
  taxNumber: string;
  companyCode: string; // API'de `CompanyCode` olarak geçiyor
  description: string;
  kdvTypes: KdvType; // Enum yerine string kullanmak yerine, enum değerleri ile temsil edilecek
  billNumber: string;
  currentAccountType: CurrentAccountType; // Enum yerine string kullanmak yerine, enum değerleri ile temsil edilecek
  currentAccounts: any[]; // Koleksiyon
  constructionSites: any[]; // Koleksiyon
  progressPayments: any[]; // Koleksiyon
  personnels: any[]; // Koleksiyon

  constructor(
    id: string,
    name: string,
    address: string,
    phoneNumber: string,
    taxNumber: string,
    companyCode: string,
    description: string,
    kdvTypes: KdvType,
    billNumber: string,
    currentAccountType: CurrentAccountType,
    currentAccounts: any[],
    constructionSites: any[],
    progressPayments: any[],
    personnels: any[]
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.taxNumber = taxNumber;
    this.companyCode = companyCode;
    this.description = description;
    this.kdvTypes = kdvTypes;
    this.billNumber = billNumber;
    this.currentAccountType = currentAccountType;
    this.currentAccounts = currentAccounts;
    this.constructionSites = constructionSites;
    this.progressPayments = progressPayments;
    this.personnels = personnels;
  }
}

export enum KdvType {
  Tevkifatlı = 1,
  Tevkifatsız = 2
}

export enum CurrentAccountType {
  ReceivableAmount = 1,//alacak
  PayableAmount=2 //verecek
}
