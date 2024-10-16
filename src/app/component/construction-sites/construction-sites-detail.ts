import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/services/Company/company.service';
import { ConstructionSitesService } from 'src/app/services/ConstructionSite/construction-site.service'; 
import { Company, CurrentAccountType, KdvType } from 'src/app/models/company/company.model';
import { ConstructionSites } from 'src/app/models/construction-site/construction-site.model'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrentAmountResponseModel  } from 'src/app/models/company/CurrentAmountResponseModel '; 
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-construction-sites',
  templateUrl: './construction-sites-detail.html',
  styleUrls: ['./construction-sites-detail.css']
})
export class ConstructionSitesDetailComponent implements OnInit {
  public groupedCurrentAmount: { 
    receivables: CurrentAmountResponseModel[], 
    payables: CurrentAmountResponseModel[], 
    progressPayments: CurrentAmountResponseModel[] 
  } = {
    receivables: [],
    payables: [],
    progressPayments: []
  };
  startDate: string | null = null;  // Start date for filtering
  endDate: string | null = null;    // End date for filtering
  datePipe = new DatePipe('en-US'); // To format dates
  constructionSite: ConstructionSites | null = null;
  constructionSiteId: string | null = null;
  isSiteFormVisible = false;
  sites: ConstructionSites[] = [];
  sitesName: string[] = [];
  siteForm: FormGroup;
  constructionSites: ConstructionSites[] = [];
  currentAmountResponseModel : CurrentAmountResponseModel [] = [];
  companyId: string | null = null;
  companies: Company[] = [];
  companyName:string | null = null;
  selectedFilter: string = 'all'; // Default filter value
  filteredCurrentAmount: CurrentAmountResponseModel[] = []; 
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
      const constructionSiteName = params.get('name'); 
      if (constructionSiteName) {
        this.getSiteDetails(constructionSiteName);
      }
    });
  }
  filterRecords(): void {
    // Filter by selected type (Alış, Satış, Hakediş, or All)
    let filteredByType = this.selectedFilter === 'receivable' ? this.groupedCurrentAmount.receivables
      : this.selectedFilter === 'payable' ? this.groupedCurrentAmount.payables
      : this.selectedFilter === 'progressPayment' ? this.groupedCurrentAmount.progressPayments
      : [
        ...this.groupedCurrentAmount.receivables,
        ...this.groupedCurrentAmount.payables,
        ...this.groupedCurrentAmount.progressPayments
      ];

    // Filter further by date range if both startDate and endDate are provided
    if (this.startDate && this.endDate) {
      const startDate = new Date(this.startDate);
      const endDate = new Date(this.endDate);

      // Apply date range filtering
      this.filteredCurrentAmount = filteredByType.filter(site => {
        const recordDate = new Date(site.date);
        return recordDate >= startDate && recordDate <= endDate;
      });
    } else {
      // If no date range is specified, use the filteredByType directly
      this.filteredCurrentAmount = filteredByType;
    }
  }
  getSiteDetails(name: string): void {
    this.constructionSitesService.getSiteyByName(name).subscribe(
      (constructionSitesData) => {
        console.log('Fetched construction sites data:', constructionSitesData);
        this.constructionSite = this.mapConstructionSites(constructionSitesData);
        this.constructionSiteId = this.constructionSite?.constructionSiteName; 
        this.companyId=this.constructionSite?.companyId;
        this.getCompanyName();
        if (this.constructionSiteId) {
          this.getConstructionSites(this.constructionSiteId);
          this.getCurrentAmountByCompanyId(this.constructionSiteId);
        }
      },
      (error) => {
        console.error('Error fetching company details:', error);
      }
    );
  }
  getCompanyName() {
    this.companyService.getCompanies().subscribe(
      (companies: any[]) => { // Assuming the service returns an array of company objects
        this.companies = companies.map(this.mapCompany); // Mapping the raw data to Company model
        this.companyName = this.companies.find(x => x.id === this.companyId)?.name || null;
      },
      (error) => {
        console.error('Error fetching companies:', error);
      }
    );
  }
  
  private mapCompany(company: any): Company {
    return new Company(
      company.Id, // Ensure this matches the actual data structure (e.g., "Id" or "id")
      company.Name, // Adjust according to how it's written in your backend response
      company.Address,
      company.PhoneNumber,
      company.TaxNumber,
      company.CompanyCode,
      company.Description,
      company.KdvTypes as KdvType, // If this is an enum, cast it appropriately
      company.BillNumber,
      company.CurrentAccountType as CurrentAccountType // Casting to the enum if needed
    );
  }
  
  getConstructionSites(companyId: string): void {
    this.constructionSitesService.getConstructionSitesByCompanyId(companyId).subscribe(
      (sites) => {
        this.constructionSites = sites.map((site: any) => 
          new ConstructionSites(site.Name, site.ConstructionSiteNo, site.CompanyId,site.companyName)
        );
      },
      (error) => {
        console.error('Error fetching construction sites:', error);
      }
    );
  }
  getCurrentAmountByCompanyId(companyId: string): void {
    this.constructionSitesService.getCurrentAccountsByConstructionSiteName(companyId).subscribe(
      (sites) => {
        this.currentAmountResponseModel = sites.map((site: any) => 
          new CurrentAmountResponseModel(
            site.CompanyId,            
            site.ConstructionSiteNo,   
            site.ConstructionSiteName,   
            site.TotalAmount,
            site.CurrentAccountType,
            site.Date 
          )
        );
  
        // Grouping logic
        this.groupedCurrentAmount.receivables = this.currentAmountResponseModel.filter(site => site.currentAccountType === CurrentAccountType.ReceivableAmount);
        this.groupedCurrentAmount.payables = this.currentAmountResponseModel.filter(site => site.currentAccountType === CurrentAccountType.PayableAmount);
        this.groupedCurrentAmount.progressPayments = this.currentAmountResponseModel.filter(site => site.currentAccountType === CurrentAccountType.ProgressPaymentAmount);
      },
      (error) => {
        console.error('Error fetching current amounts:', error);
      }
    );
  }
  
  private mapConstructionSites(constructionSite: any): ConstructionSites {
    return new ConstructionSites(
        constructionSite.Name,
        constructionSite.ConstructionSiteNo,
        constructionSite.CompanyId,
        constructionSite.CompanyName
    );
  }

  goBack(): void {
    if (this.companyName) {
      this.router.navigate(['/company-detail', this.companyName]); // Adjust based on your route
    } else {
      this.router.navigate(['/menu/company'], { queryParams: { tab: 'company' }}); 
    }
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
  
    if (this.constructionSiteId) {
      const newSiteRequest = new ConstructionSites(
        siteName,
        siteCode,
        this.constructionSiteId,
        companyName // Pass the company name here
      );
  
      this.constructionSitesService.createConstructionSite(newSiteRequest).subscribe(
        (response) => {
          console.log('Construction site added:', response);
        //  window.location.reload(); // Optionally you might want to refresh the data instead of reloading the page
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
  
getSiteName() {
  this.constructionSitesService.getAllConstructionSites().subscribe(
    (constructionSites: ConstructionSites[]) => {
      this.sitesName = constructionSites.map(site => site.constructionSiteName);
    },
    (error) => {
      console.error('Error fetching companies:', error);
    }
  );
}
goToSiteDetails(name: string): void {
  this.router.navigate(['site-detail', name]);
}

}