import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AuthorComponent } from './author/author.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseListComponent } from './course-list/course-list.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ErrorComponent } from './error/error.component';
import { OnCreateDirective } from './directives/on-create.directive';
import { CategoryComponent } from './category/category.component';
import { CourseComponent } from './course/course.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ReviewComponent } from './review/review.component';
import { SectionComponent } from './section/section.component';
import { LessonComponent } from './lesson/lesson.component';
import { AuthInterceptor } from './services/auth-interceptor';
import { CreateReviewComponent } from './create-review/create-review.component';
import { ReviewListComponent } from './review-list/review-list.component';
import { AccountComponent } from './account/account.component';
import { PurchaseComponent } from './purchase/purchase.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AuthorComponent,
    CourseDetailsComponent,
    CourseListComponent,
    LoginComponent,
    RegistrationComponent,
    ErrorComponent,
    OnCreateDirective,
    CategoryComponent,
    CourseComponent,
    SearchBarComponent,
    ReviewComponent,
    SectionComponent,
    LessonComponent,
    CreateReviewComponent,
    ReviewListComponent,
    AccountComponent,
    PurchaseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
