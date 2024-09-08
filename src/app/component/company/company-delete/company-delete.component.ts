import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/services/Company/company.service'; // Update to CompanyService

@Component({
  selector: 'app-company-delete',
  templateUrl: './company-delete.component.html', // Update template path
  styleUrls: ['./company-delete.component.css']
})
export class CompanyDeleteComponent implements OnInit {
  
  id: number = -1;

  constructor(private route: ActivatedRoute, private router: Router, private companyService: CompanyService) { } // Update to CompanyService

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')!;
    });
  }

  deleteCompany() {
    this.companyService.deleteCompany(this.id);
      // Navigate back to the list after deletion
      this.router.navigate([''], { queryParams: { tab: 'company' } }); // Update to company tab
    
  }

  cancel() {
    // Navigate back to the list without deleting
    this.router.navigate([''], { queryParams: { tab: 'company' } }); // Update to company tab
  }
}
