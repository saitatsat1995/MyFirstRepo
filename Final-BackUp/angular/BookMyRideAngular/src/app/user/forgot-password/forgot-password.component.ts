import { Component, OnInit } from '@angular/core';
import {User} from 'src/app/Shared/user';
import {UserOtp} from 'src/app/Shared/user-otp'
import {UserOneService} from 'src/app/Shared/user-one.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  otpTimeOut;
  Password;
  cPassword;
  userOtp;
  EmailId;
  result;
  user:User =new User(); 
  otpobj:UserOtp=new UserOtp();
  first:boolean=true;
  second:boolean=false;
  constructor(private userService:UserOneService,private router: Router) { }
  ngOnInit() {
    this.isLoggedIn();
  }


  isLoggedIn(){
    if(+localStorage.getItem("User_Details")!=3 && localStorage.getItem("User_Details")!=null){
     document.getElementById("msg_container").innerHTML="Your are already logged in,No Need to Login again...";
     document.getElementById("msg_modal").style.display="block";
     setTimeout(()=>{ 
       document.getElementById("msg_modal").style.display="none";
       this.router.navigate(['/User']);
      }, 10); 
    }
  }

  forgotPassword(event){
    document.getElementById("loading_div").style.display="block";
    document.getElementById("loading_text").innerHTML="initiating process...";
    this.userService.forgotPasswordService(this.user).subscribe(data=>{
      document.getElementById("loading_div").style.display="block";
      this.result=JSON.parse(data["_body"]);
      document.getElementById("loading_text").innerHTML=this.result[0];
      
      setTimeout(()=>{ 
        document.getElementById("loading_div").style.display="none";
       }, 1500);

      if(this.result[0]=="OTP Status Mail Successfully Sent to your Email ID..."){
        this.EmailId=this.result[1];
        this.first=false;
        this.second=true;
         this.otpTimeOut= setTimeout(()=>{ 
          this.router.navigate(['User/Forgot-Password']);
         }, 180000);
      }
      else{
        event.reset();
       // this.user.Email="";
      }
    });
  }

  otpVerification(event){
    document.getElementById("loading_div").style.display="block";
    document.getElementById("loading_text").innerHTML="initiating process...";
    this.otpobj.Otp=this.userOtp;
    this.otpobj.Email=this.EmailId;
    this.userService.otpVerificationService(this.otpobj).subscribe(data=>{
      document.getElementById("loading_div").style.display="block";
     
      this.result=JSON.parse(data["_body"]);
      document.getElementById("loading_text").innerHTML=this.result;
      
      setTimeout(()=>{ 
        document.getElementById("loading_div").style.display="none";
       }, 1500);
       clearTimeout(this.otpTimeOut);
      if(this.result=="Successfully verified..."){
        this.first=false;
        this.second=false;
      }
      else{
        //console.log("else ran");
        event.reset();
      }
    });
  }

  changePassword(event){
    document.getElementById("loading_div").style.display="block";
    document.getElementById("loading_text").innerHTML="initiating process...";

    this.user.Password=this.Password;
    this.user.Email=this.EmailId
    this.userService.changePasswordService(this.user).subscribe(data=>{
       //console.log(data);
       document.getElementById("loading_div").style.display="block";
    this.result=JSON.parse(data["_body"]);
    document.getElementById("loading_text").innerHTML=this.result;
    
    setTimeout(()=>{ 
      document.getElementById("loading_div").style.display="none";
     }, 1500);
    if(this.result=="successfully changed"){
      this.router.navigate(['User/Login']);
    }
    else{
     event.reset();
    }
    });
  }

}
