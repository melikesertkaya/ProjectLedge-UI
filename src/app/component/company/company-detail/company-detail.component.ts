import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router  } from '@angular/router';
import { CompanyService } from 'src/app/services/Company/company.service';
import { Company, CurrentAccountType, KdvType } from 'src/app/models/company/company.model';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {
  company: Company | null = null;
  companyId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const companyName = params.get('name'); // Fetch company name from route
      if (companyName) {
        this.getCompanyDetails(companyName);
      }
    });
  }
  
  getCompanyDetails(name: string): void {
    this.companyService.getCompanyByNamex(name).subscribe(
        (companyData) => {
            console.log('Fetched company data:', companyData); // API yanıtını kontrol edin
            this.company = this.mapCompany(companyData); // Dönüşüm fonksiyonu ile Company nesnesi oluştur
        },
        (error) => {
            console.error('Error fetching company details:', error);
        }
    );
}

private mapCompany(company: any): Company {
    return new Company(
        company.Id, // API yanıtındaki Id
        company.Name, // API yanıtındaki Name
        company.Address, // API yanıtındaki Address
        company.PhoneNumber, // API yanıtındaki PhoneNumber
        company.TaxNumber, // API yanıtındaki TaxNumber
        company.CompanyCode, // API yanıtındaki CompanyCode
        company.Description, // API yanıtındaki Description
        company.KdvTypes as KdvType, // API yanıtındaki KdvTypes
        company.BillNumber, // API yanıtındaki BillNumber
        company.CurrentAccountType as CurrentAccountType // API yanıtındaki CurrentAccountType
    );
}
goBack(): void {
  this.router.navigate(['/menu/company'], { queryParams: { tab: 'company' }}); // Belirtilen URL'ye yönlendir
}
}
