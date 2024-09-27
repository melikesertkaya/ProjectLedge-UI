import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog'; // PrimeNG Dialog kullanıyorsanız
import { Company } from 'src/app/models/company/company.model';
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
      const newCompany: Company = {
        id: formValue.id ?? '',  // Eğer id varsa kullan, yoksa boş string kullan
        name: formValue.name,
        address: formValue.address,
        phoneNumber: formValue.phoneNumber,
        taxNumber: formValue.taxNumber,
        companyCode: formValue.companyCode,
        description: formValue.description,
        kdvTypes: Number(formValue.kdvTypes),  // Enum değerini sayısal formata dönüştürün
        billNumber: formValue.billNumber,
        currentAccountType: Number(formValue.currentAccountType),  // Enum değerini sayısal formata dönüştürün
      };

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
