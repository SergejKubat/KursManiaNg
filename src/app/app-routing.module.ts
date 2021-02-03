import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AuthorComponent } from './author/author.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseListComponent } from './course-list/course-list.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'autor/:autorId', component: AuthorComponent},
  { path: 'kurs/:kursId', component: CourseDetailsComponent},
  { path: 'kursevi', component: CourseListComponent},
  { path: 'prijava', component: LoginComponent},
  { path: 'registracija', component: RegistrationComponent},
  { path: 'nalog', component: AccountComponent, canActivate: [AuthGuard]},
  { path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
