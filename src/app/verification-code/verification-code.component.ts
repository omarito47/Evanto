import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html',
  styleUrls: ['./verification-code.component.css']
})
export class VerificationCodeComponent {
  codeForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.codeForm = this.formBuilder.group({
      code: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]]
    });
  }

  verify() {
    const id = this.route.snapshot.paramMap.get('id');
    const code = this.codeForm.get('code')!.value;

    const url = `http://127.0.0.1:9090/user/verify/${id}/${code}`;
    this.http.get(url).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error(error);
      }
    );
  }
}
