import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  title = 'Title from href';
  showOne = true;
  selectedTab: number = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const tabToSelect = params['tab'];
      if (tabToSelect) {
        switch(tabToSelect){
          case 'one':
            this.selectedTab = 0;
            break;
          case 'two':
            this.selectedTab = 1;
            break;
          case 'three':
            this.selectedTab = 2;
            break;
          case 'person':
            this.selectedTab = 3;
            break;
          case 'parent':
            this.selectedTab = 4;
            break;
          default:
            this.selectedTab = 1;
            break;
        }
      }
    });
  }
}
