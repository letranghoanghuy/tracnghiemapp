import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionComponent } from './admin/question/question.component';
import { SubjectComponent } from './admin/subject/subject.component';
import { HomeComponent } from './client/home/home.component';
import { LoginComponent } from './client/login/login.component';
import { RankedComponent } from './client/ranked/ranked.component';
import { SignupComponent } from './client/signup/signup.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path:'loginAdmin', component: LoginAdminComponent},
  { path: 'admin', 
    children:[
      { path:'subject', component: SubjectComponent},
      { path:'question', component: QuestionComponent},
    ]
  },
  { path:'client',
    children:[
      {path: 'home', component: HomeComponent},
      {path: 'ranked', component: RankedComponent},
      {path:'login', component: LoginComponent},
      {path:'signup', component: SignupComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
