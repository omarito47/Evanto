import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface ApiResponse {
  id: string;
  // Add other properties from the response if available
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm!: FormGroup;
  formSubmitted = false;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  submitForm() {
    this.formSubmitted = true;

    if (this.signupForm.valid) {
      // Perform the signup logic here
      console.log(this.signupForm.value);
    }
  }

  signUp() {
    const url = 'http://127.0.0.1:9090/user/';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      name: this.signupForm.value.username,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      age: 0,
      address: '',
      phoneNumber: '',
      role: 'user'
    };

    if (this.signupForm.valid) {
      this.http.post<ApiResponse>(url, body, { headers }).subscribe(
        response => {
          const userId = response['id'];
          console.log(response);
          this.router.navigate(['/verificationCode/${userId}']);
        },
        error => {
          console.error(error);
        }
      );
    }
  }
}