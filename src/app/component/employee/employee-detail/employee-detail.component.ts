import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/models/employee/employee.model';
import { EmployeeService } from 'src/app/services/Employee/employee.service';
import { Personnel } from 'src/app/models/employee/personnel.model';
import { PersonelCurrentAccount } from 'src/app/models/timesheet/personelCurrentAccount';
export enum PersonnelRole {
  Worker = 1,
  Supervisor = 2,
  Engineer = 3,
  Manager = 4
}
@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  Employee: Employee | null = null;
  personnels: Personnel[] = [];
  companyId: string | null = null;
  companyName: string | null = null;
  isSiteFormVisible = false;
  sitesName: string[] = [];
  siteTotalAmount:number=0;
  isEmployeeFormVisible = false;
  employeeForm: FormGroup;
  public totalOfAllSites:number =0
  personnelRoles = [
    { key: PersonnelRole.Worker, value: 'Worker' },
    { key: PersonnelRole.Supervisor, value: 'Supervisor' },
    { key: PersonnelRole.Engineer, value: 'Engineer' },
    { key: PersonnelRole.Manager, value: 'Manager' }
  ];
  personelId: string | null = null;
  personelCurrentAccount: PersonelCurrentAccount | null = null;
  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.personelId= params.get('id'); 
      if ( this.personelId) {
        this.getEmployeeDetails( this.personelId);
      }
    });
    this.getPersonelCurrentAcount()
  }
  getRoleName(role: any): string {
    return PersonnelRole[role] || 'Unknown'; // Gelen int değeri enum ismine çevirir, eşleşme yoksa 'Unknown' gösterir
  }
  getEmployeeDetails(id: string): void {
    this.employeeService.getEmployeeByIdx(id).subscribe(
      (personnelData) => {
        console.log('Fetched Employee data:', personnelData);
        this.personnels = [this.mapCompany(personnelData)]; // Ensure `personnels` is an array
      },
      (error) => {
        console.error('Error fetching employee data:', error);
      }
    );
  }
  
  private mapCompany(personnel: any): Personnel {
    return new Personnel(
      personnel.Id || 'Unknown',
      personnel.FirstName || 'N/A',
      personnel.LastName || 'N/A',
      personnel.DateOfBirth || new Date(),
      personnel.Role,
      personnel.HourlySalary || 0,
      personnel.TotalSalary || 0,
      personnel.HourlySgkPremium || 0,
      personnel.TotalSgkPremium || 0,
      personnel.ConstructionSiteName ?? 'Unknown',
      personnel.CompanyName ?? 'Unknown'
    );
  }
  getPersonelCurrentAcount(){
    this.employeeService.getPersonelCurrentAccount(this.personelId ?? "").subscribe((data) => {
      this.personelCurrentAccount = this.mapPersonelCurrentAccount(data);
    });
  }
  private mapPersonelCurrentAccount(data: any): PersonelCurrentAccount {
    return new PersonelCurrentAccount(
      data.PersonelId,
      data.TotalAmount,  
      data.TotalSgkPremium,
      data.CreatedDate,
      data.Period
    );
  }
  
  goBack(): void {
    this.router.navigate(['/menu/employee'], { queryParams: { tab: 'employee' }}); 
  }

  showSiteForm() {
    this.isSiteFormVisible = true;
  }

  

goToSiteDetails(id: string): void {
  this.router.navigate(['employee-salary-detail', id]);
}
showEmployeeForm(): void {
  this.isEmployeeFormVisible = true;
}

hideEmployeeForm(): void {
  this.isEmployeeFormVisible = false;
  this.employeeForm.reset();
}

// Add a New Employee
addEmployee(): void {
  if (this.employeeForm.valid) {
    const newEmployee = this.employeeForm.value as Personnel;
    this.personnels.push(newEmployee); // Add employee to the list
    this.hideEmployeeForm();
  }
}

// View Employee Details
viewEmployeeDetails(employee: Personnel): void {
  console.log('Viewing details for:', employee);
  // Implement details view logic here, possibly routing to a detailed view
}

// Remove Employee
removeEmployee(employee: Personnel): void {
  this.personnels = this.personnels.filter(p => p !== employee);
}
}