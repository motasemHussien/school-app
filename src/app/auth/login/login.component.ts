import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

import * as data from '../../json/users.json';

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
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public userNameControl = new FormControl('');
  public passwordControl = new FormControl('');

  constructor(private _router: Router) {}

  public authorizeUserCredential(event: Event): void {
    event.preventDefault();

    const enteredUsername = this.userNameControl.value;
    const enteredPassword = this.passwordControl.value;

    const detectedUser = data.users.find(
      (user) => user.username === enteredUsername
    );

    if (!!detectedUser && detectedUser.password === enteredPassword) {
      this._router.navigate(['/home']);
    } else {
      alert('user not found');
    }
  }
}
