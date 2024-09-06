import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  username: string = "";
  password: string = "";

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void { }

  public login(): void {
    if (this.username && this.password) {
      alert(`Username: ${this.username}\nPassword: ${this.password}`);
    } else {
      alert('Please enter both username and password.');
    }
  }

  public clear(): void {
    this.username = "";
    this.password = "";
  }
}
