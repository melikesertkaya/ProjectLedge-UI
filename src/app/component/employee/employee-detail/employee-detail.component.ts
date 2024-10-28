import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/models/employee/employee.model';
import { EmployeeService } from 'src/app/services/Employee/employee.service';
import { Personnel } from 'src/app/models/employee/personnel.model';
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
      const id = params.get('id'); 
      if (id) {
        this.getCompanyDetails(id);
      }
    });
  }
  
  getCompanyDetails(id: string): void {
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
      personnel.Role || 'Unknown',
      personnel.HourlySalary || 0,
      personnel.TotalSalary || 0,
      personnel.HourlySgkPremium || 0,
      personnel.TotalSgkPremium || 0,
      personnel.ConstructionSiteName ?? 'Unknown',
      personnel.CompanyName ?? 'Unknown'
    );
  }
  
  goBack(): void {
    this.router.navigate(['/menu/employee'], { queryParams: { tab: 'employee' }}); 
  }

  showSiteForm() {
    this.isSiteFormVisible = true;
  }

  

goToSiteDetails(name: string): void {
  this.router.navigate(['site-detail', name]);
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