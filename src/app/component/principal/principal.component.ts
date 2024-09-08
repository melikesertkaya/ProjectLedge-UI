// principal.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  selectedTab: number = 1; // Default to 'Şirket'

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Check if the user is redirected from the login
    this.route.queryParams.subscribe(params => {
      if (params['tab']) {
        switch (params['tab']) {
          case 'login':
            this.selectedTab = 0;
            break;
          case 'company':
            this.selectedTab = 1;
            break;
          case 'employee':
            this.selectedTab = 2;
            break;
          case 'timesheets':
            this.selectedTab = 3;
            break;
          case 'invoice':
            this.selectedTab = 4;
            break;
          case 'progress-payment':
            this.selectedTab = 5;
            break;
          default:
            this.selectedTab = 1;
            break;
        }
      }
    });
  }

  onLogin(): void {
    this.router.navigate(['/menu'], { queryParams: { tab: 'company' } });
  }
  logout(): void {
    // Clear any user-related data here (e.g., authentication tokens)
    // Redirect to the login page
    this.router.navigate(['/'], { queryParams: { tab: 'login' } });
  }
}
