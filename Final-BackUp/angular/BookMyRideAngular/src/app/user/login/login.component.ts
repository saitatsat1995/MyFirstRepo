import { Component, OnInit } from '@angular/core';
import {UserOneService} from 'src/app/Shared/user-one.service';
import {User} from 'src/app/Shared/user'; 
import {Router} from "@angular/router";
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';
import { HttpClient } from "@angular/common/http";
import { Global } from "src/app/Shared/global";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isSubmitted:boolean=true;
  public result:string;
  constructor( private userService :UserOneService,private router: Router,private global:Global,private socialAuthService: AuthService, private http:HttpClient) { }
  user:User=new User();
  ngOnInit() {
    this.isLoggedIn();
  }

  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        this.http.get(this.global.WebApiPath+"/Users/GoogleLogin/"+userData.email+"/").subscribe(data => {
          var temp:any = data;
          if(temp.result != 0)
            {
              localStorage.setItem("User_Details",temp.result);
              localStorage.setItem("User_Role",temp.role);
              this.router.navigate(['/User/Account']);
            }
            else{
              alert("you have not signed up yet. Please sign up first");
            this.router.navigate(['/User/SignUp']);
            }
          

        })
      }
    );
  }

  loginUser(event){
   
    this.userService.loginUserService(this.user.Email, this.user.Password).subscribe(data=>{
      this.isSubmitted=false;
       this.user=new User();
       var result=JSON.parse(data["_body"]);
       var status=result[0];
       var id=result[1];
       console.log(status);
       //alert(status);
       document.getElementById("loading_text").innerHTML=status;
       setTimeout(()=>{ 
        document.getElementById("msg_modal").style.display="none"; 
        document.getElementById("loading_div").style.display="none";
        if(status=='Successfully Logged in...'){
          localStorage.setItem("User_Details",result[1]);
          localStorage.setItem("User_Role",result[2]);
          this.router.navigate(['/User/Account']);
        }else{
          this.isSubmitted=true;
          //event.reset();
        }
       }, 1500);
    });
  }

  isLoggedIn(){
    if(localStorage.getItem("User_Details")!=null){
     document.getElementById("msg_container").innerHTML="Your are already logged in,No Need to Login again...";
     document.getElementById("msg_modal").style.display="block";
     setTimeout(()=>{ 
       document.getElementById("msg_modal").style.display="none";
       this.router.navigate(['/User']);
      }, 1500); 
    }
  }
  flagShowPassword=true;
  changePasswordInputType() {
      if(this.flagShowPassword){
        this.flagShowPassword=false;
      }else{
        this.flagShowPassword=true;
      }
  }
}
