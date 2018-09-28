import { Injectable } from '@angular/core';
import { User } from "src/app/Shared/user";
import {UserOtp} from 'src/app/Shared/user-otp';
import { Global } from 'src/app/Shared/global';
import {Http,Response,Headers,RequestOptions,RequestMethod} from '@angular/http';
import {Observable} from 'rxjs';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserOneService {

  constructor(private http:Http,private global :Global) { }
  loginUserService(email,pass){
    console.log(pass);
    document.getElementById("loading_text").innerHTML="Intiating your login...";
    document.getElementById("loading_div").style.display="block";
    return this.http.get(this.global.WebApiPath+'/Users/UserLogin/'+email+"/"+pass).pipe((map(x=>x)));
  }

  forgotPasswordService(user:User){
    var body=JSON.stringify(user);
    var headerOptions=new Headers({'Content-Type':'application/json'});
    var requestionOptions=new RequestOptions({method:RequestMethod.Post, headers:headerOptions});
    return this.http.post(this.global.WebApiPath+'/Users/userForgotPassword',body,requestionOptions).pipe((map(x=>x)));
  }

  otpVerificationService(otpobj:UserOtp){
    var body=JSON.stringify(otpobj);
    var headerOptions=new Headers({'Content-Type':'application/json'});
    var requestionOptions=new RequestOptions({method:RequestMethod.Post, headers:headerOptions});
    return this.http.post(this.global.WebApiPath+'/Users/userOtpVerify',body,requestionOptions).pipe((map(x=>x)));
  }


  changePasswordService(userPassChange:User){
    var body=JSON.stringify(userPassChange);
    var headerOptions=new Headers({'Content-Type':'application/json'});
    var requestionOptions=new RequestOptions({method:RequestMethod.Post, headers:headerOptions});
    return this.http.post(this.global.WebApiPath+'/Users/userChangePassword',body,requestionOptions).pipe((map(x=>x)));
  }

}
