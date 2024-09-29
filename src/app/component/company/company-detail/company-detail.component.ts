import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/services/Company/company.service';
import { ConstructionSitesService } from 'src/app/services/ConstructionSite/construction-site.service'; // Servisi ekleyin
import { Company, CurrentAccountType, KdvType } from 'src/app/models/company/company.model';
import { ConstructionSites } from 'src/app/models/construction-site/construction-site.model'; // Modeli ekleyin
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {
  company: Company | null = null;
  companyId: string | null = null;
  isSiteFormVisible = false;
  siteForm: FormGroup;
  constructionSites: ConstructionSites[] = [];
  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private constructionSitesService: ConstructionSitesService, // Servisi ekleyin
    private router: Router,
    private fb: FormBuilder
  ) {
    this.siteForm = this.fb.group({
      siteName: ['', Validators.required],
      siteCode: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const companyName = params.get('name'); 
      if (companyName) {
        this.getCompanyDetails(companyName);
      }
    });
  }
  
  getCompanyDetails(name: string): void {
    this.companyService.getCompanyByNamex(name).subscribe(
      (companyData) => {
        console.log('Fetched company data:', companyData);
        this.company = this.mapCompany(companyData);
        this.companyId = this.company?.id; 
        if (this.companyId) {
          this.getConstructionSites(this.companyId);
        }
      },
      (error) => {
        console.error('Error fetching company details:', error);
      }
    );
  }
  
  getConstructionSites(companyId: string): void {
    this.constructionSitesService.getConstructionSitesByCompanyId(companyId).subscribe(
      (sites) => {
        this.constructionSites = sites.map((site: any) => 
          new ConstructionSites(site.Name, site.ConstructionSiteNo, site.CompanyId)
        );
      },
      (error) => {
        console.error('Error fetching construction sites:', error);
      }
    );
  }
  
  private mapCompany(company: any): Company {
    return new Company(
      company.Id, 
      company.Name, 
      company.Address, 
      company.PhoneNumber, 
      company.TaxNumber, 
      company.CompanyCode, 
      company.Description, 
      company.KdvTypes as KdvType, 
      company.BillNumber, 
      company.CurrentAccountType as CurrentAccountType 
    );
  }

  goBack(): void {
    this.router.navigate(['/menu/company'], { queryParams: { tab: 'company' }}); 
  }

  showSiteForm() {
    this.isSiteFormVisible = true;
  }

  hideSiteForm() {
    this.isSiteFormVisible = false;
    this.siteForm.reset();
  }

  addSite() {
    const siteCode = this.siteForm.value.siteCode; 
    if (this.companyId) {
        const newSiteRequest = new ConstructionSites(
            this.siteForm.value.siteName,
            siteCode,
            this.companyId 
        );

        this.constructionSitesService.createConstructionSite(newSiteRequest).subscribe(
          (response) => {
              console.log('Construction site added:', response);
              window.location.reload();
              this.hideSiteForm();
          },
          (error) => {
              console.error('Error adding construction site:', error);
          }
      );
      
    } else {
        console.error('Company ID is missing');
    }
}
}