import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
////////////////My Modules//////////////////////////////////////////////
import { HomeComponent } from 'src/app/user/home/home.component';
import { DashboardComponent } from 'src/app/admin/dashboard/dashboard.component';
import { HeaderComponent } from 'src/app/user/header/header.component';
import { FooterComponent } from 'src/app/user/footer/footer.component';
import { LoginComponent} from 'src/app/user/login/login.component';
import { FeedbackComponent } from 'src/app/user/feedback/feedback.component';
import {LocationManagementComponent} from 'src/app/admin/location-management/location-management.component';
import {FeedbackManagementComponent} from 'src/app/admin/feedback-management/feedback-management.component';
///////////////////////////SignUp component rishabh 27.8.2018/////////////////////////////////////////////
import { SignUpComponent} from './user/sign-up/sign-up.component';
///////////////////////////FormsModules Atul 2782018//////////////////////////////////////////////
import { AccountComponent } from 'src/app/user/account/account.component';
import { PostRideComponent } from 'src/app/user/post-ride/post-ride.component';
import { SearchResultComponent, FilterPipe } from 'src/app/user/search-result/search-result.component';
import { RideDetailsComponent } from 'src/app/user/ride-details/ride-details.component';
import { ForgotPasswordComponent } from 'src/app/user/forgot-password/forgot-password.component';
import { UserManagementComponent, UserSearchFilter } from "src/app/admin/user-management/user-management.component";
import {NgxPaginationModule} from 'ngx-pagination';
///////////////End OF My Modules////////////////////////////////////////

//////////////////social login////////////////////////////////
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angular-6-social-login";


// Configs 
export function getAuthServiceConfigs() {
let config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider("244301889593024")
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("840655437252-pfnr83igbjhuub5mqfhdtsat120tne7d.apps.googleusercontent.com")
      }
    ]);
return config;
}
//////////////////////////end of social login///////////////////
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    AccountComponent,
    SignUpComponent,
    PostRideComponent,
    SearchResultComponent,
    FeedbackComponent,
    RideDetailsComponent,
    LocationManagementComponent,
    UserManagementComponent,
    FilterPipe,
    UserSearchFilter,
    ForgotPasswordComponent,
    FeedbackManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    HttpModule,
    SocialLoginModule,
    NgxPaginationModule
  ],
  providers: [{
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
