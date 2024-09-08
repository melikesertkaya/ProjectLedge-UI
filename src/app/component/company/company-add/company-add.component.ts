import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/Company/company.service';
import { Company } from 'src/app/models/company/company.model'; // Import the Company model

@Component({
  selector: 'app-company-add',
  templateUrl: './company-add.component.html',
  styleUrls: ['./company-add.component.css']
})
export class CompanyAddComponent implements OnInit {
  companyForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private companyService: CompanyService) { }

  ngOnInit(): void {
    this.companyForm = this.formBuilder.group({
      name: ['', Validators.required],
      taxNumber: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      currentAccount: ['', Validators.required],
      site: ['', Validators.required]
    });
  }


  addCompany() {
    if (this.companyForm.valid) {
      const id=this.companyForm.get('id')?.value;
      const name = this.companyForm.get('name')?.value;
      const taxNumber = this.companyForm.get('taxNumber')?.value;
      const address = this.companyForm.get('address')?.value;
      const phone = this.companyForm.get('phone')?.value;
      const currentAccount = this.companyForm.get('currentAccount')?.value;
      const site = this.companyForm.get('site')?.value;

      const company = new Company(
        id,
        name,
        taxNumber,
        address,
        phone,
        currentAccount,
        site
      );

      // Add your logic to handle the new company, such as calling a service
      this.companyService.addCompany(company);
      this.companyForm.reset();
    }
  }
}
