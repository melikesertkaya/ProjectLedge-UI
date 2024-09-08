import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/Company/company.service';  // Update to CompanyService
import { Company } from 'src/app/models/company/company.model';  // Update to Company model
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',  // Update to the correct template file
  styleUrls: ['./company-edit.component.css']  // Update to the correct style file
})
export class CompanyEditComponent implements OnInit {
  editForm: FormGroup = new FormGroup({});
  id: number = -1;

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,  // Update to CompanyService
    private route: ActivatedRoute,
    private router: Router,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.id = this.config.data.id;

    // Get the company data for pre-filling the form
    const company =this.companyService.getCompanyById(this.id);
      this.editForm = this.formBuilder.group({
        name: [company?.name, Validators.required],
        taxNumber: [company?.taxNumber, Validators.required],
        address: [company?.address, Validators.required],
        phone: [company?.phone, Validators.required],
        currentAccount: [company?.currentAccount, Validators.required],
        site: [company?.site, Validators.required],
      });
  }

  updateCompany() {
    if (this.editForm.valid) {
      const updatedCompany = new Company(
        this.editForm.get('id')?.value,
        this.editForm.get('name')?.value,
        this.editForm.get('taxNumber')?.value,
        this.editForm.get('address')?.value,
        this.editForm.get('phone')?.value,
        this.editForm.get('currentAccount')?.value,
        this.editForm.get('site')?.value
      );

      this.companyService.updateCompany(updatedCompany);
        this.ref.close(); // Close the dialog
    
    }
  }
}