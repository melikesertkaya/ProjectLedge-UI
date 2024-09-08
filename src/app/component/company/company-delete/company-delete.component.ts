import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/services/Company/company.service';

@Component({
  selector: 'app-company-delete',
  templateUrl: './company-delete.component.html',
  styleUrls: ['./company-delete.component.css']
})
export class CompanyDeleteComponent implements OnInit {
  id: number = -1;
  companyName: string = '';

  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    const company = this.companyService.getCompanyById(this.id);
    if (company) {
      this.companyName = company.name;
    }
  }

  deleteCompany() {
    this.companyService.deleteCompany(this.id);
    this.router.navigate(['menu/'], { queryParams: { tab: 'company' } });
  }

  cancel() {
    this.router.navigate(['menu/'], { queryParams: { tab: 'company' } });
  }
}
