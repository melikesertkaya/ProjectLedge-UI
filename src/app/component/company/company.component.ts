import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company, CurrentAccountType, KdvType } from 'src/app/models/company/company.model';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/Company/company.service';
import { DialogService } from 'primeng/dynamicdialog';
import { CompanyEditComponent } from './company-edit/company-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { CompanyDeleteComponent } from './company-delete/company-delete.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  providers: [DialogService]
})
export class CompanyComponent implements OnInit {
  companies: Company[] = [];
  companiesName: string[] = [];
  form: FormGroup;
  isFormVisible = false;kdvTypeOptions
   = [
    { value: KdvType.Tevkifatlı, label: 'Tevkifatlı' },
    { value: KdvType.Tevkifatsız, label: 'Tevkifatsız' }
  ];

  accountTypeOptions = [
    { value: CurrentAccountType.ReceivableAmount, label: 'Alış' },
    { value: CurrentAccountType.PayableAmount, label: 'Satış' },
    { value: CurrentAccountType.ProgressPaymentAmount, label: 'Hakediş' }
  ];
  constructor(
    private router: Router,
    private companyService: CompanyService,
    public dialogService: DialogService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      address: [''],
      phoneNumber: [''],
      taxNumber: [''],
      companyCode: [''],
      description: [''],
      kdvTypes: [''],
      billNumber: [''],
      currentAccountType: ['']
    });
  }

  ngOnInit(): void {
    this.getCompanyName();
  }

  getCompanyName() {
    this.companyService.getCompaniesName().subscribe(
      (companies) => {
        this.companiesName = companies;
      },
      (error) => {
        console.error('Error fetching companies:', error);
      }
    );
  }

  goToCompanyDetails(name: string): void {
    this.router.navigate(['company-detail', name]);
  }

  openAddDialog(): void {
    this.isFormVisible = true; // Show the form
  }

  hideForm() {
    this.isFormVisible = false;
    this.form.reset(); // Reset form on hiding
  }
  addCompany() {
    if (this.form.valid) {
      const newCompany: Company = new Company(
        '', // id: Assign or generate as needed
        this.form.value.name,
        this.form.value.address,
        this.form.value.phoneNumber,
        this.form.value.taxNumber,
        this.form.value.companyCode,
        this.form.value.description,
        this.form.value.kdvTypes,
        this.form.value.billNumber,
        this.form.value.currentAccountType
      );
  
      this.companyService.addCompany(newCompany).subscribe({
        next: (response) => {
          console.log('Company added:', response);
          this.getCompanyName(); // Refresh the list
          this.hideForm(); // Hide the form
        },
        error: (error) => {
          console.error('Error adding company:', error);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }
  
  openEditDialog(id: string): void {
    this.dialogService.open(CompanyEditComponent, {
      data: { id: id },
      header: 'Şirket Düzenle',
      width: '70%'
    });
  }

  navigateToDelete(companyName: string): void {
    const dialogRef = this.dialog.open(CompanyDeleteComponent, {
      width: '400px',
      data: { companyName }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) { // If user confirmed deletion
        this.companyService.deleteCompany(companyName).subscribe({
          next: () => {
            console.log('Company deleted successfully.');
            window.location.reload();
          },
          error: (error) => {
            console.error('Error deleting company:', error);
          }
        });
      }
    });
}

  
  
}
