import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstructionSites } from 'src/app/models/construction-site/construction-site.model'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrentAmountResponseModel  } from 'src/app/models/company/CurrentAmountResponseModel '; 
import { DatePipe } from '@angular/common';
import { EmployeeService } from 'src/app/services/Employee/employee.service';
import { Personnel } from 'src/app/models/employee/personnel.model';
import { PersonelCurrentAccount } from 'src/app/models/timesheet/personelCurrentAccount';
@Component({
  selector: 'app-employee-salary-detail',
  templateUrl: './employee-salary-detail.component.html',
  styleUrls: ['./employee-salary-detail.component.css']
})
export class EmployeeSalaryDetailComponent implements OnInit {
  public groupedCurrentAmount: { 
    receivables: CurrentAmountResponseModel[], 
    payables: CurrentAmountResponseModel[], 
    progressPayments: CurrentAmountResponseModel[] 
  } = {
    receivables: [],
    payables: [],
    progressPayments: []
  };

  datePipe = new DatePipe('en-US'); 
  id: string | null= null;
  selectedFilter: string = 'all'; 
  filteredCurrentAmount: CurrentAmountResponseModel[] = []; 
  public totalAmount:number=0;
  personnels: Personnel | null = null;
  startDate: Date | null = null; // Başlangıç tarihi
  endDate: Date | null = null;   // Bitiş tarihi
  currentAmountResponseModel: any[] = []; // API'den gelen tüm personel verileri
  filteredPersonnel: any[] = []; // Filtrelenmiş personel verileri
  displayedColumns: string[] = ['id', 'name', 'date', 'role']; // Tablo sütunları
  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router,
    private fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id'); 
      if (this.id) {
        this.getEmployeeDetails(this.id);
      }
    });
  }
 
  getEmployeeDetails(id: string): void {
    this.employeeService.getEmployeeByIdx(id).subscribe(
      (personnelData) => {
        console.log('Fetched Employee data:', personnelData);
    
        this.personnels = this.mapPersonnel(personnelData); 
      },
      (error) => {
        console.error('Error fetching employee data:', error);
      }
    );
  }
  private mapPersonnel(personnel: any): Personnel {
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

  

  getCurrentAmountByPersonnelId(personnelId: string): void {
    this.employeeService.getTimeSheetByPersonelId(personnelId).subscribe(
      (employees: any[]) => {
        if (employees && employees.length > 0) {
          this.currentAmountResponseModel = employees.map(this.mapPersonelCurrentAccount);
          this.filteredPersonnel = [...this.currentAmountResponseModel]; 
        } else {
          console.warn('No data found for the specified personnel ID.');
          this.currentAmountResponseModel = [];
          this.filteredPersonnel = [];
        }
      },
      (error) => {
        if (error.status === 404) {
          console.error('Personnel not found:', error.message);
        } else if (error.status === 400) {
          console.error('Invalid request:', error.message);
        } else {
          console.error('An unexpected error occurred:', error);
        }
      }
    );
  }
  private mapPersonelCurrentAccount(personelCurrentAccount: any): PersonelCurrentAccount {
    return new PersonelCurrentAccount(
      personelCurrentAccount.PersonelId, 
      personelCurrentAccount.TotalAmount, 
      personelCurrentAccount.TotalSgkPremium,
      personelCurrentAccount.CreatedDate,
      personelCurrentAccount.Period,
    );
  }
  filterPersonnelByDate(): void {
    this.getCurrentAmountByPersonnelId(this.id??""); 
    if (this.startDate && this.endDate) {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);

      this.filteredPersonnel = this.currentAmountResponseModel.filter(personnel => {
        const personnelDate = new Date(personnel.dateOfBirth);
        return personnelDate >= start && personnelDate <= end;
      });
    } else {
      console.warn('Both start and end dates must be selected for filtering.');
      this.filteredPersonnel = [...this.currentAmountResponseModel];
    }
  }

  
  goBack(): void {
    if (this.id) {
      this.router.navigate(['/employee-detail', this.id]); // Adjust based on your route
    } else {
      this.router.navigate(['/menu/company'], { queryParams: { tab: 'company' }}); 
    }
  }
  
goToSiteDetails(id: string): void {
  this.router.navigate(['employee-salary-detail', id]);
}

}