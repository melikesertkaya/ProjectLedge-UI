import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/Company/company.service';
import { Company } from 'src/app/models/company/company.model';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
  editForm: FormGroup = new FormGroup({});
  id: string = ''; // Güncellenmiş id türü string olarak tanımlandı

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.id = this.config.data.id;

    // Get the company data for pre-filling the form
    this.companyService.getCompanyById(this.id).subscribe(
      (company: Company) => {
        this.editForm = this.formBuilder.group({
          name: [company?.name, Validators.required],
          taxNumber: [company?.taxNumber, Validators.required],
          address: [company?.address, Validators.required],
          phone: [company?.phoneNumber, Validators.required], // API'de 'phoneNumber' olarak geçiyor
          currentAccount: [company?.companyCode, Validators.required], // API'de 'companyCode' olarak geçiyor
          site: [company?.description, Validators.required], // API'de 'description' olarak geçiyor
        });
      },
      (error) => {
        console.error('Error fetching company:', error);
        // Handle error if necessary
      }
    );
  }

  updateCompany() {
    if (this.editForm.valid) {
      const updatedCompany = new Company(
        this.id,
        this.editForm.get('name')?.value,
        this.editForm.get('taxNumber')?.value,
        this.editForm.get('address')?.value,
        this.editForm.get('phone')?.value,
        this.editForm.get('currentAccount')?.value,
        this.editForm.get('site')?.value,
        1, // kdvTypes: Boş bir string olarak başlatılıyor
        '', // billNumber: Boş bir string olarak başlatılıyor
        1, // currentAccountType: Boş bir string olarak başlatılıyor
      );

      this.companyService.updateCompany(updatedCompany);
      this.ref.close(); // Close the dialog
    }
  }
}
