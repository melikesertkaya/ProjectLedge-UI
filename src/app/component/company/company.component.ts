import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company/company.model';  // Import the Company model
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from 'src/app/services/Company/company.service';  // Update the service import
import { DialogService,DynamicDialogRef  } from 'primeng/dynamicdialog';
import { CompanyEditComponent } from './company-edit/company-edit.component';  // Update to your company edit component

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  providers: [DialogService]
})
export class CompanyComponent implements OnInit {
  companies: Company[] = [];  // Update the type to Company
  dialogRef: DynamicDialogRef | undefined; 
  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private companyService: CompanyService,  // Update to your company service
    public dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe((companies) => {  // Update method to get companies
      this.companies = companies;
    });
  }

  openEditDialog(id: number) {
    this.dialogRef = this.dialogService.open(CompanyEditComponent, {
      data: { id: id }, // Pass the company ID to the component
      header: 'Edit Company',
      width: '50%', // Adjust width as needed
      contentStyle: { 'max-height': '500px', overflow: 'auto' }, // Optional styling
      baseZIndex: 10000, // Ensures dialog appears above other content
    });

    // Handle when the dialog is closed
    this.dialogRef.onClose.subscribe((updatedCompany: Company) => {
      if (updatedCompany) {
        // Refresh the company list or perform any other actions needed after the modal closes
        this.companyService.getCompanies().subscribe((companies) => {
          this.companies = companies;
        });
      }
    });
  }

  navigateToDelete(id: number) {
    this.router.navigate(['company/delete', id]);  // Update route for company delete
  }
}
