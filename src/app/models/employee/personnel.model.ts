export class Personnel {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    role: PersonnelRole;
    hourlySalary: number;
    totalSalary: number;
    hourlySgkPremium: number;
    totalSgkPremium: number;
    constructionSiteName?: string;
    companyName?: string;
  
    constructor(
      id: string,
      firstName: string,
      lastName: string,
      dateOfBirth: Date,
      role: PersonnelRole,
      hourlySalary: number,
      totalSalary: number,
      hourlySgkPremium: number,
      totalSgkPremium: number,
      constructionSiteName?: string,
      companyName?: string
    ) {
      this.id = id;
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
  
  // Assuming PersonnelRole is an enum
  export enum PersonnelRole {
    Worker = 'Worker',
    Manager = 'Manager',
    Engineer = 'Engineer'
  }
  