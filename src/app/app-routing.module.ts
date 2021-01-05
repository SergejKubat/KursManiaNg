import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorComponent } from './author/author.component';
import { CourseComponent } from './course/course.component';
import { CourseListComponent } from './courselist/courselist.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'autor/:autorId', component: AuthorComponent},
  { path: 'kurs/:kursId', component: CourseComponent},
  { path: 'kursevi', component: CourseListComponent},
  { path: 'kursevi/:q', component: CourseListComponent},
  { path: 'prijava', component: LoginComponent},
  { path: 'registracija', component: RegistrationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
