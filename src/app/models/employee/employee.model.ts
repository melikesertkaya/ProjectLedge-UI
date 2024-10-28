export class Employee {
    public id: string;
    public firstName: string;
    public lastName: string;
    public siteNumber: string; 
    public hourlyRate: number;
    public salary: number;
    public socialSecurityPremium: number;

    constructor(
        id: string,
        firstName: string,
        lastName: string,
        siteNumber: string,
        hourlyRate: number,
        salary: number,
        socialSecurityPremium: number
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.siteNumber = siteNumber;
        this.hourlyRate = hourlyRate;
        this.salary = salary;
        this.socialSecurityPremium = socialSecurityPremium;
    }
}
