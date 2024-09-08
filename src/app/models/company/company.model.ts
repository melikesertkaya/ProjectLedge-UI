export class Company {
    id:number
    name: string;             // Adı
    taxNumber: string;        // Vergi No
    address: string;          // Adres
    phone: string;            // Telefon
    currentAccount: string;   // Cari
    site: string;             // Şantiye
  
    constructor(
      id:number,
      name: string,
      taxNumber: string,
      address: string,
      phone: string,
      currentAccount: string,
      site: string,
     
    ) {
      this.name = name;
      this.taxNumber = taxNumber;
      this.address = address;
      this.phone = phone;
      this.currentAccount = currentAccount;
      this.site = site;
      this.id=id;
    }
  }
  