import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company/company.model';
import { Router, ActivatedRoute } from '@angular/router'; // ActivatedRoute import edildi
import { CompanyService } from 'src/app/services/Company/company.service';
import { DialogService } from 'primeng/dynamicdialog';
import { CompanyEditComponent } from './company-edit/company-edit.component';
import { CompanyAddComponent } from './company-add/company-add.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  providers: [DialogService]
})
export class CompanyComponent implements OnInit {
  companies: Company[] = [];
  companiesName: string[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute, // ActivatedRoute eklendi
    private companyService: CompanyService,
    public dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.getCompanyName();
  }

  getCompanyName() {
    this.companyService.getCompaniesName().subscribe(
      (companies) => {
        this.companiesName = companies;
      },
      (error) => {
        console.error('Error fetching companies:', error);
      }
    );
  }

  goToCompanyDetails(name: string): void {
    this.router.navigate(['company-detail', name]);  // Şirket detaylarına yönlendir
  }

  openAddDialog(): void {
    this.dialogService.open(CompanyAddComponent, {
      header: 'Şirket Ekle',
      width: '70%'
    });
  }

  openEditDialog(id: string): void {
    this.dialogService.open(CompanyEditComponent, {
      data: { id: id },
      header: 'Şirket Düzenle',
      width: '70%'
    });
  }

  navigateToDelete(id: string): void {
    this.router.navigate(['company/delete', id]);
  }
}
