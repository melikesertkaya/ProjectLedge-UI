import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from 'src/app/services/Company/company.service';
import { Company } from 'src/app/models/company/company.model';

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
    private companyService: CompanyService
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
      (company) => {
        this.company = company;
      },
      (error) => {
        console.error('Error fetching company details:', error);
      }
    );
  }
  
}
