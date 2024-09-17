import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company/company.model';
import { Router } from '@angular/router';
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

  constructor(
    private router: Router,
    private companyService: CompanyService,
    public dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe(
      (companies) => {
          this.companies = companies;
      },
      (error) => {
          console.error('Error fetching companies:', error);
      }
  );
  }

  openAddDialog() {
    this.dialogService.open(CompanyAddComponent, {
      header: 'Add Company',
      width: '70%'
    });
  }

  openEditDialog(id: string) { // id: string olarak güncellendi
    const ref = this.dialogService.open(CompanyEditComponent, {
      data: {
        id: id
      },
      header: 'Edit Company',
      width: '70%'
    });
  }
  
  navigateToDelete(id: string) { // id: string olarak güncellendi
    this.router.navigate(['company/delete', id]);
  }
}
