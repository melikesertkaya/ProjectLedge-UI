import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/Company/company.service';
import { Company } from 'src/app/models/company/company.model';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-company-add',
  templateUrl: './company-add.component.html',
  styleUrls: ['./company-add.component.css']
})
export class CompanyAddComponent implements OnInit {
  addForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private companyService: CompanyService,  public ref: DynamicDialogRef) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      taxNumber: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      currentAccount: ['', Validators.required],
      site: ['', Validators.required],
    });
  }

  addCompany() {
    if (this.addForm.valid) {
      const id = this.addForm.get('id')?.value;
      const name = this.addForm.get('name')?.value;
      const taxNumber = this.addForm.get('taxNumber')?.value;
      const address = this.addForm.get('address')?.value;
      const phone = this.addForm.get('phone')?.value;
      const currentAccount = this.addForm.get('currentAccount')?.value;
      const site = this.addForm.get('site')?.value;

      const company = new Company(
        parseInt(id, 10),
        name,
        taxNumber,
        address,
        phone,
        currentAccount,
        site
      );
      
      try {
       this.companyService.addCompany(company);
        this.ref.close(); // Close the dialog after adding the company
      } catch (error) {
        console.error('Error adding company:', error);
        // Handle error if necessary
      }
    }
  }
}
