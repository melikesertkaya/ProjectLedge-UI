import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import { Timesheet } from 'src/app/models/timesheet/timesheet.model';
import { EmployeeService } from 'src/app/services/Employee/employee.service';
import { Personnel } from 'src/app/models/employee/personnel.model';
import { PersonelCurrentAccount } from 'src/app/models/timesheet/personelCurrentAccount';
import { distinctUntilChanged } from 'rxjs/operators';
import { MAT_DATE_FORMATS } from '@angular/material/core';

export const CUSTOM_DATE_FORMATS = {
  parse: { dateInput: 'DD-MM-YYYY' },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
};
@Component({
  selector: 'app-timesheet-dialog',
  templateUrl: './timesheet-dialog.component.html',
  styleUrls: ['./timesheet-dialog.component.css'],  providers: [
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }
  ]
})
export class TimesheetDialogComponent implements OnInit {
  form!: FormGroup;  // Definite assignment assertion
  personnels: Personnel[] = [];
  personelCurrentAccount: PersonelCurrentAccount | null = null;
  personelId: string | null = null;
  popupMessage: string = '';
  isPopupVisible: boolean = false;
  popupType: 'success' | 'error' = 'success';
  isHourlyReadonly = false;
  date = new FormControl();
  constructor(
    public dialogRef: MatDialogRef<TimesheetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Timesheet,
    private employeeService: EmployeeService,
    private fb: FormBuilder
  ) 
  {    }

  ngOnInit(): void {
    this.form = this.fb.group({
      employee: ['', Validators.required],
      date: [this.data.date || '', Validators.required],
      hoursWorked: [this.data.hoursWorked || 0, Validators.required],
      overtimeHours: [this.data.overtimeHours || 0, Validators.required],
      dailySalary: [this.data.dailySalary || 0, Validators.required],
      hourlyWage: [this.data.hourlyWage || 0, Validators.required],
      dailySocialSecurityPremium: [this.data.dailySocialSecurityPremium || 0, Validators.required],
      hourlySocialSecurityPremium: [this.data.hourlySocialSecurityPremium || 0, Validators.required],
      fullDay: [false], 
      hourly: [false] 
    });
    this.getAllPersonnels();
    this.form.get('hoursWorked')?.valueChanges.pipe(distinctUntilChanged()).subscribe(() => {
      this.calculateHourlyWage();
    });
  
    this.form.get('employee')?.valueChanges.pipe(distinctUntilChanged()).subscribe(() => {
      this.calculateHourlyWage();
    });
  
    this.form.get('fullDay')?.valueChanges.pipe(distinctUntilChanged()).subscribe(() => {
      this.calculateHourlyWage();
    });
  
    this.form.get('hourly')?.valueChanges.pipe(distinctUntilChanged()).subscribe(() => {
      this.calculateHourlyWage();
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
  getAllPersonnels() {
    this.employeeService.getEmployees().subscribe(
      (data) => {
        this.personnels =this.mapPersonnel(data);
        
      },
    );
  }
  private mapPersonnel(data: any[]): Personnel[] {
    return data.map((personnel) => {
      return new Personnel(
        personnel.Id,  
        personnel.FirstName,  
        personnel.LastName,  
        personnel.DateOfBirth,  
        personnel.Role,  
        personnel.HourlySalary,  
        personnel.TotalSalary,  
        personnel.HourlySgkPremium,  
        personnel.TotalSgkPremium,  
        personnel.ConstructionSiteName ?? 'Unknown',  
        personnel.CompanyName ?? 'Unknown' 
      );
    });
  }
  getEmployeeDetails(personelInfo: Personnel): void {
    if (!personelInfo.id) {
      this.showPopup('Personel Seçilemedi ', 'error'); 
      this.personelId = null; 
    } else {
      this.personelId = personelInfo.id;
    }
  }
    

  showPopup(message: string, type: 'success' | 'error') {
    this.popupMessage = message;
    this.popupType = type; 
    this.isPopupVisible = true;
    setTimeout(() => {
      this.isPopupVisible = false;
    }, 3000);
  }

  onFullDayChange() {
    const fullDay = this.form.get('fullDay')?.value;
    this.form.get('hourly')?.setValue(false);
    this.form.get('hoursWorked')?.disable(); // Disable hourly input
    this.form.get('hourlyWage')?.disable();
    this.form.get('hourlySocialSecurityPremium')?.disable();
    this.form.get('dailySalary')?.enable();
    this.form.get('dailySocialSecurityPremium')?.enable();
    this.isHourlyReadonly = !fullDay;
    
    if (fullDay) {
      this.calculateHourlyWage();
    }
  }

  onHourlyChange() {
    const hourly = this.form.get('hourly')?.value;
    this.form.get('fullDay')?.setValue(false);
    this.form.get('hoursWorked')?.enable(); 
    this.form.get('hourlyWage')?.enable();
    this.form.get('hourlySocialSecurityPremium')?.enable();
    this.form.get('dailySalary')?.disable();
    this.form.get('dailySocialSecurityPremium')?.disable();
    this.isHourlyReadonly = hourly;
    
    if (hourly) {
      this.calculateHourlyWage();
    }
  }
 
  calculateHourlyWage() {
    const fullDay = this.form.get('fullDay')?.value;
    const hourly = this.form.get('hourly')?.value;
    const hoursWorked = this.form.get('hoursWorked')?.value;
    this.employeeService.getPersonelCurrentAccount(this.personelId ?? "").subscribe((data) => {
      this.personelCurrentAccount = this.mapPersonelCurrentAccount(data);
  
      // Full day seçeneği aktifse, günlük maaş ve SGK primini ayarlıyoruz
      if (fullDay) {
        this.form.get('dailySalary')?.setValue(this.personelCurrentAccount.totalAmount || 0);
        this.form.get('dailySocialSecurityPremium')?.setValue(this.personelCurrentAccount.totalSgkPremium || 0);
      }
      if(fullDay==false){
        this.form.get('dailySalary')?.setValue(0);
        this.form.get('dailySocialSecurityPremium')?.setValue(0)
        this.form.get('hoursWorked')?.enable(); 
        this.form.get('hourlyWage')?.enable();
        this.form.get('hourlySocialSecurityPremium')?.enable();
      }
  
      // Saatlik çalışma seçeneği aktifse, saatlik maaş ve SGK primini ayarlıyoruz
      if (hourly &&(this.personelCurrentAccount!=undefined || this.personelCurrentAccount!=null)) {
        this.form.get('hourlyWage')?.setValue(((this.personelCurrentAccount.totalAmount/240)*hoursWorked) || 0);
        this.form.get('hourlySocialSecurityPremium')?.setValue(((this.personelCurrentAccount.totalSgkPremium/30)*hoursWorked) || 0);
        this.form.get('dailySalary')?.disable();
        this.form.get('dailySocialSecurityPremium')?.disable();
      }
      if(hourly==false){
        this.form.get('hourlyWage')?.setValue(0)
        this.form.get('hourlySocialSecurityPremium')?.setValue(0)
        this.form.get('hoursWorked')?.setValue(0)
        this.form.get('dailySalary')?.enable();
        this.form.get('dailySocialSecurityPremium')?.enable();
      }
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
  
}
