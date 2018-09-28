import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/user/home/home.component';
import {LoginComponent} from 'src/app/user/login/login.component';
////////////////Child Component For User Module/////////////////////////////////
import { AccountComponent } from 'src/app/user/account/account.component';
///////////////////////////SignUp component rishabh 27.8.2018/////////////////////////////////////////////
import { SignUpComponent} from './user/sign-up/sign-up.component';
import { PostRideComponent } from 'src/app/user/post-ride/post-ride.component';
import { SearchResultComponent } from 'src/app/user/search-result/search-result.component';
import { RideDetailsComponent } from 'src/app/user/ride-details/ride-details.component';
import { FeedbackComponent } from 'src/app/user/feedback/feedback.component';
import {LocationManagementComponent} from 'src/app/admin/location-management/location-management.component';
import {ForgotPasswordComponent} from 'src/app/user/forgot-password/forgot-password.component';
import {FeedbackManagementComponent} from 'src/app/admin/feedback-management/feedback-management.component';
////////////////////////////////////////////////////////////////////////////////
///////////////Child Coponent For Admin/////////////////////////////////////////
import { DashboardComponent } from 'src/app/admin/dashboard/dashboard.component';
import { UserManagementComponent } from "src/app/admin/user-management/user-management.component";
// import { UserManagementComponent } from 'src/app/user-management/user-management.component';

//////////////End Child Component for Admin/////////////////////////////////////
const routes: Routes = [
  { path: '', redirectTo: '/User', pathMatch: 'full' },
  { path: 'User', component:HomeComponent,},
  { path:'User/Account',component:AccountComponent},
  { path:'Admin', component:DashboardComponent},
  { path:'User/Login' , component:LoginComponent},
  { path:'User/SignUp',component:SignUpComponent},
  { path:'User/Post-Ride',component:PostRideComponent},
  { path:'User/SearchResult',component:SearchResultComponent},
  { path:'User/Ride-Details',component:RideDetailsComponent},
  { path:'User/Feedback',component:FeedbackComponent},
  {path:'User/Forgot-Password', component:ForgotPasswordComponent},
  { path:'Admin/Dashboard',component:DashboardComponent},
  { path:'Admin/Location', component:LocationManagementComponent},
  { path:'Admin/UserManagement',component:UserManagementComponent}  ,
  { path:'Admin/FeedbackManagement', component:FeedbackManagementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
