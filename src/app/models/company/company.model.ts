export class Company {
  id: string; // Guid yerine string kullanıyoruz
  name: string;
  address: string;
  phoneNumber: string; // API'de `PhoneNumber` olarak geçiyor
  taxNumber: string;
  companyCode: string; // API'de `CompanyCode` olarak geçiyor
  description: string;
  kdvTypes: KdvType; // Enum olarak temsil edilecek
  billNumber: string;
  currentAccountType: CurrentAccountType; // Enum olarak temsil edilecek

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
    currentAccountType: CurrentAccountType
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
  }
  getKdvTypeString(): string {
    switch (this.kdvTypes) {
      case KdvType.Tevkifatlı:
        return 'Tevkifatlı';
      case KdvType.Tevkifatsız:
        return 'Tevkifatsız';
      default:
        return 'Unknown'; // Fallback for unknown values
    }
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

// KDV Type Enum
export enum KdvType {
  Tevkifatlı = 1,
  Tevkifatsız = 2
}

// Current Account Type Enum
export enum CurrentAccountType {
  ReceivableAmount = 1, // Alış
  PayableAmount = 2, // Satış
  ProgressPaymentAmount=3 //Hakediş
}
