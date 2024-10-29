import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserRequest } from 'src/app/models/user/user.request';
import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  userName: string = '';
  registerPassword: string = '';
  personnelType: string = '';
  showLogin: boolean = false;
  showRegister: boolean = false;
  popupMessage: string = '';
  isPopupVisible: boolean = false;
  popupType: 'success' | 'error' = 'success';
  constructor(private router: Router, private userService: UserService) {}

  toggleView(view: string): void {
    this.showLogin = view === 'login';
    this.showRegister = view === 'register';
  }

  closePopup(): void {
    this.showLogin = false;
    this.showRegister = false;
  }

  login(): void {
    this.userService.login(this.username, this.password).subscribe(
      (response: boolean) => {
        if (response) {
          // Giriş başarılı
          this.router.navigate(['/menu'], { queryParams: { tab: 'company' } });
        } else {
          // Giriş başarısız
          alert('Kullanıcı adı veya şifre hatalı.');
        }
      },
      error => {
        // Hata yönetimi
        console.error('Giriş sırasında bir hata oluştu', error);
        alert('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      }
    );
  }

  register(): void {
    const newUser: UserRequest = {
      username: this.userName,
      password: this.registerPassword,
      userType: this.personnelType === 'Admin' ? 1 : 2 // Örneğin Admin için 1, User için 2
    };

    this.userService.register(newUser).subscribe(
      response => {
        if (response) {
          this.showPopup('Kullanıcı Eklendi', 'success');
          this.closePopup();
          this.clear(); // Formu temizle
        }
      },
      error => {
        console.error('Kayıt sırasında bir hata oluştu', error);
        alert('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      }
    );
  }

  clear(): void {
    this.username = '';
    this.password = '';
    this.userName = '';
    this.registerPassword = '';
    this.personnelType = '';
  }
  showPopup(message: string, type: 'success' | 'error') {
    this.popupMessage = message;
    this.popupType = type; 
    this.isPopupVisible = true;
    setTimeout(() => {
      this.isPopupVisible = false;
    }, 3000);
  }
}
