import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { VerificationCodeComponent } from './verification-code/verification-code.component';

const routes: Routes = [
  {
    path:'signup',
    component:SignUpComponent
  },
  {
    path:'signin',
    component:SignInComponent
  },
  {
    path:'verificationCode/:id',
    component:VerificationCodeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
