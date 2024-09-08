export class Timesheet {
    public id: number;
    public employeeId: number;
    public date: string; // ISO date string
    public hoursWorked: number;
    public overtimeHours: number;
    public dailySalary: number;
    public hourlyWage: number;
    public dailySocialSecurityPremium: number;
    public hourlySocialSecurityPremium: number;

    constructor(
        id: number,
        employeeId: number,
        date: string,
        hoursWorked: number,
        overtimeHours: number,
        dailySalary: number,
        hourlyWage: number,
        dailySocialSecurityPremium: number,
        hourlySocialSecurityPremium: number
    ) {
        this.id = id;
        this.employeeId = employeeId;
        this.date = date;
        this.hoursWorked = hoursWorked;
        this.overtimeHours = overtimeHours;
        this.dailySalary = dailySalary;
        this.hourlyWage = hourlyWage;
        this.dailySocialSecurityPremium = dailySocialSecurityPremium;
        this.hourlySocialSecurityPremium = hourlySocialSecurityPremium;
    }
}
