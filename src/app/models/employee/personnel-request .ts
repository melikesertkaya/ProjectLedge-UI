export class PersonnelRequest {
    // İstemci tarafından gönderilmesine gerek olmayan Id özelliği hariç tüm özellikler
    id:string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date; // Tarih formatında
    role: number; // Rol için sayısal değer
    hourlySalary: number; // Saatlik maaş
    totalSalary: number; // Toplam maaş
    hourlySgkPremium: number; // Saatlik SGK primi
    totalSgkPremium: number; // Toplam SGK primi
    constructionSiteName?: string; // İnşaat alanı ismi, isteğe bağlı
    companyName?: string; // Şirket ismi, isteğe bağlı
  
    constructor(
      id:string,
      firstName: string,
      lastName: string,
      dateOfBirth: Date,
      role: number,
      hourlySalary: number,
      totalSalary: number,
      hourlySgkPremium: number,
      totalSgkPremium: number,
      constructionSiteName?: string,
      companyName?: string
    ) {
      this.id=id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.dateOfBirth = dateOfBirth;
      this.role = role;
      this.hourlySalary = hourlySalary;
      this.totalSalary = totalSalary;
      this.hourlySgkPremium = hourlySgkPremium;
      this.totalSgkPremium = totalSgkPremium;
      this.constructionSiteName = constructionSiteName;
      this.companyName = companyName;
    }
  }
  