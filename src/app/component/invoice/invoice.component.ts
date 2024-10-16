import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Invoice } from 'src/app/models/invoice/invoice.model';
import { InvoiceService } from 'src/app/services/Invoice/invoice.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CompanyService } from 'src/app/services/Company/company.service';
import { Company, CurrentAccountType, KdvType } from 'src/app/models/company/company.model';
import { ConstructionSitesService } from 'src/app/services/ConstructionSite/construction-site.service';
import { ConstructionSiteNameByCompanyName  } from 'src/app/models/construction-site/ConstructionSiteNameByCompanyName'; 
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  form: FormGroup;
  invoices$!: Observable<Invoice[]>;
  isFormVisible = false;
  invoices: Invoice[] = [];
  companies: string[] = [];
  sites: string[] = []; 
  constructionSiteNameByCompanyName: ConstructionSiteNameByCompanyName[] = [];
  selectedCompany: string = ''; 
  kdvTypeOptions = [
    { value: KdvType.Tevkifatlı, label: 'Tevkifatlı' },
    { value: KdvType.Tevkifatsız, label: 'Tevkifatsız' }
  ];
  accountTypeOptions = [
    { value: CurrentAccountType.ReceivableAmount, label: 'Alış' },
    { value: CurrentAccountType.PayableAmount, label: 'Satış' },
    { value: CurrentAccountType.ProgressPaymentAmount, label: 'Hakediş' }
  ];

  constructor(
    private fb: FormBuilder, 
    private invoiceService: InvoiceService, 
    private companyService: CompanyService, 
    private constructionSitesService: ConstructionSitesService
  ) {
    this.form = this.fb.group({
      companyName: ['', Validators.required],  // Company dropdown
      siteCode: ['', Validators.required],     // Site code dropdown
      currentAccountType: ['', Validators.required], // Current account type
      amount: [0, [Validators.required, Validators.min(0)]], // Amount
      kdvTypes: ['', Validators.required], // KDV Type
      invoiceNumber: ['', Validators.required], // Invoice number
      description: ['', Validators.required], // Description
      vat: [0, [Validators.required, Validators.min(0)]], // VAT (if any)
      date: [new Date().toISOString().substring(0, 10), Validators.required] // Date
    });
  }

  ngOnInit(): void {
    this.fetchInvoices();
    this.getInvoices();
    this.getCompanyName();
  }

  fetchInvoices(): void {
    this.invoices$ = this.invoiceService.getInvoices().pipe(
      map(invoices => invoices.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
    );
  }

  showForm() {
    this.isFormVisible = true;
  }

  hideForm() {
    this.isFormVisible = false;
    this.resetForm();
  }

  resetForm() {
    this.form.reset({
      companyName: '',
      siteCode: '',
      currentAccountType: '',
      amount: 0,
      kdvTypes: '',
      invoiceNumber: '',
      description: '',
      vat: 0,
      date: new Date().toISOString().substring(0, 10)
    });
  }

  addInvoice() {
    if (this.form.valid) {
      const invoice: Invoice = {
        type: this.form.value.currentAccountType, // 'Alış' or 'Satış' based on the account type selection
        companyName: this.form.value.companyName,
        description: this.form.value.description,
        amount: this.form.value.amount,
        vat: this.form.value.vat,
        date: new Date(this.form.value.date),
        siteCode: this.form.value.siteCode,
        invoiceNumber: this.form.value.invoiceNumber,
        currentAccountType: this.form.value.currentAccountType,
        kdvTypes: this.form.value.kdvTypes
      };
  
      this.invoiceService.addInvoice(invoice).subscribe({
        next: (response: Invoice) => {
          console.log('Invoice added:', response);
          this.fetchInvoices();
          this.hideForm();
         // window.location.reload();
        },
        error: (error) => {
          console.error('Error adding invoice:', error);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }
  
  

  deleteInvoice(id?: number) {
    if (id !== undefined) {
      this.invoiceService.deleteInvoice(id).subscribe({
        next: () => {
          console.log(`Invoice deleted with ID: ${id}`);
          this.fetchInvoices();
        },
        error: (error) => {
          console.error('Error deleting invoice:', error);
        }
      });
    } else {
      console.warn('Cannot delete invoice: ID is undefined');
    }
  }

  getInvoices() {
    this.invoiceService.getInvoices().subscribe(
      (invoices) => {
        this.invoices = invoices.map(invoice => ({
          ...invoice,
          date: new Date(invoice.date) // Ensure date is parsed correctly
        }));
      },
      (error) => {
        console.error('Error fetching invoices:', error);
      }
    );
  }

  getCompanyName() {
    this.companyService.getCompaniesName().subscribe(
      (companies) => {
        this.companies = companies; // Assign company names to dropdown
      },
      (error) => {
        console.error('Error fetching companies:', error);
      }
    );
  }
  onCompanyChange() {
    this.selectedCompany = this.form.value.companyName;
    if (this.selectedCompany) {
      this.constructionSitesService.getConstructionSiteNameByCompanyName(this.selectedCompany).subscribe(
        (sites: any[]) => { // Assuming the API returns an array of site objects
          this.constructionSiteNameByCompanyName = this.mapConstructionSites(sites);
        },
        (error) => {
          console.error('Error fetching sites:', error);
        }
      );
    }
  }
  
  private mapConstructionSites(constructionSites: any[]): ConstructionSiteNameByCompanyName[] {
    return constructionSites.map(site => new ConstructionSiteNameByCompanyName(
      site.Name,  // Assuming 'Name' is the field for construction site names
      site.ConstructionSiteNo // Assuming 'ConstructionSiteNo' is the field for site codes
    ));
  }
  
}
