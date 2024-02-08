import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import * as data from '../../json/users.json';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private _router: Router) {}

  authorizeUserCredential(event: Event): void {
    event.preventDefault();
    const detectedUser = data.users.find(
      (user) => user.username === this.username
    );

    if (!!detectedUser && detectedUser.password === this.password) {
      this._router.navigate(['/home']);
    } else {
      alert('user not found');
    }
  }
}
