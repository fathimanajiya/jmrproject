import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  onSubmit() {
    if (!this.email || !this.password) {
      alert('Please fill out all fields!');
      return;
    }
    alert(`Sign-in successful:\nEmail: ${this.email}\nRemember Me: ${this.rememberMe}`);
  }
}


