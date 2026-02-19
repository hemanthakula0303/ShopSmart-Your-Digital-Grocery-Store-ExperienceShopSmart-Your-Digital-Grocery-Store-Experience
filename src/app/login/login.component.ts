import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],   // 👈 THIS LINE IS STEP 5
  templateUrl: './login.component.html'
})
export class LoginComponent {

  email = '';
  password = '';
  message = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.post<any>('http://localhost:5000/api/users/login', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/products']);
      },
      error: () => {
        this.message = "Invalid Login";
      }
    });
  }
}
