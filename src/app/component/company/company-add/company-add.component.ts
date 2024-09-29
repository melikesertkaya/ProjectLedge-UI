import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog'; // PrimeNG Dialog kullanıyorsanız
import { Company, CurrentAccountType, KdvType } from 'src/app/models/company/company.model';
import { CompanyService } from 'src/app/services/Company/company.service';

@Component({
  selector: 'app-company-add',
  templateUrl: './company-add.component.html',
  styleUrls: ['./company-add.component.css']
})
export class CompanyAddComponent implements OnInit {
  companyForm!: FormGroup; // Non-null assertion operator kullanılabilir

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      address: [''],
      phoneNumber: [''],
      taxNumber: [''],
      companyCode: [''],
      description: [''],
      kdvTypes: [null, Validators.required],  // Enum değerini null ile başlatıyoruz
      billNumber: [''],
      currentAccountType: [null, Validators.required],  // Enum değerini null ile başlatıyoruz
      currentAccounts: [[]],
      constructionSites: [[]],
      progressPayments: [[]],
      personnels: [[]]
    });
  }

  onSubmit() {
    if (this.companyForm.valid) {
      const formValue = this.companyForm.value;

      // Enum dönüşümünü yapın
      const newCompany: Company = new Company(
        formValue.id ?? '',  // If id exists, use it; otherwise, use an empty string
        formValue.name,
        formValue.address,
        formValue.phoneNumber,
        formValue.taxNumber,
        formValue.companyCode,
        formValue.description,
        formValue.kdvTypes as KdvType,  // Cast to KdvType enum
        formValue.billNumber,
        formValue.currentAccountType as CurrentAccountType  // Cast to CurrentAccountType enum
    );
    

      this.companyService.addCompany(newCompany).subscribe({
        next: (company) => {
          console.log('Company added:', company);
          // Dialog'ı kapatabilir veya başarı mesajı gösterebilirsiniz
        },
        error: (err) => {
          console.error('Error adding company:', err);
          // Hata mesajını kullanıcıya gösterebilirsiniz
        }
      });
    } else {
      console.error('Form is invalid');
      // Kullanıcıya formun geçersiz olduğunu bildirin
    }
  }
}
