import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/services/Company/company.service';
import { Company } from 'src/app/models/company/company.model';

@Component({
  selector: 'app-company-delete',
  templateUrl: './company-delete.component.html',
  styleUrls: ['./company-delete.component.css']
})
export class CompanyDeleteComponent implements OnInit {
  id: string = ''; // Güncellenmiş id türü string olarak tanımlandı
  companyName: string = '';

  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || ''; // Parametreyi almak için string boş değeri kullan
    if (this.id) {
      this.companyService.getCompanyById(this.id).subscribe(
        (company: Company) => {
          this.companyName = company.name;
        },
        (error) => {
          console.error('Error fetching company:', error);
          // Hata işleme
        }
      );
    }
  }

  deleteCompany() {
    if (this.id) {
      this.companyService.deleteCompany(this.id).subscribe(
        () => {
          this.router.navigate(['menu/'], { queryParams: { tab: 'company' } });
        },
        (error) => {
          console.error('Error deleting company:', error);
          // Hata işleme
        }
      );
    }
  }

  cancel() {
    this.router.navigate(['menu/'], { queryParams: { tab: 'company' } });
  }
}
