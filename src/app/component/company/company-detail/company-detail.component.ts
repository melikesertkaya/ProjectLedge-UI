import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/services/Company/company.service';
import { ConstructionSitesService } from 'src/app/services/ConstructionSite/construction-site.service'; 
import { Company, CurrentAccountType, KdvType } from 'src/app/models/company/company.model';
import { ConstructionSites } from 'src/app/models/construction-site/construction-site.model'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrentAmountResponseModel  } from 'src/app/models/company/CurrentAmountResponseModel '; 
import { SiteInfo  } from 'src/app/models/company/site-info'; 
@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {
  company: Company | null = null;
  companyId: string | null = null;
  isSiteFormVisible = false;
  sites: ConstructionSites[] = [];
  siteInfoList: SiteInfo[] = [];
  sitesName: string[] = [];
  siteForm: FormGroup;
  constructionSites: ConstructionSites[] = [];
  currentAmountResponseModel : CurrentAmountResponseModel [] = [];
  siteTotalAmount:number=0;
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
          this.getCurrentAmountByCompanyId(this.companyId);
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
        this.siteInfoList = sites.map((site: any) => new SiteInfo(site.Name, null));
        this.getCurrentAmountByCompanyId(companyId);
      },
      (error) => {
        console.error('Error fetching construction sites:', error);
      }
    );
  }
  
  getCurrentAmountByCompanyId(companyId: string): void {
    this.constructionSitesService.getCurrentAmountByCompanyId(companyId).subscribe(
      (amounts) => {
        amounts.forEach((amount: any) => {
          const site = this.siteInfoList.find(s => s.siteName === amount.ConstructionSiteName);
          if (site) {
            site.totalAmount = amount.TotalAmount;
          }
        });
      },
      (error) => {
        console.error('Error fetching current amounts:', error);
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
    const siteName = this.siteForm.value.siteName; 
    const siteCode = this.siteForm.value.siteCode; 
    const companyName = this.siteForm.value.companyName; // Get the company name from the form
  
    if (this.companyId) {
      const newSiteRequest = new ConstructionSites(
        siteName,
        siteCode,  // Ensure this is the correct type (number or string as per your requirement)
        this.companyId,
        companyName // Pass the company name here
      );
  
      this.constructionSitesService.createConstructionSite(newSiteRequest).subscribe(
        (response) => {
          console.log('Construction site added:', response);
          window.location.reload(); // Consider refreshing the site list instead
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
  
goToSiteDetails(name: string): void {
  this.router.navigate(['site-detail', name]);
}
}