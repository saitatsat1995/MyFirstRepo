/* DATE:29/08/2018 Author:RISHABH KUMAR THAKUR
This Component is called for sign-up form.
isLoggedIn() is called after fillup of the sign-up form.
registerUser() is called when user SUBMIT the form.
  */
import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { User } from '../../Shared/user';
import { UserService } from '../../Shared/user.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public result:string;
  cpassword:string;
/* userservice is taken of UserService type and router is taken of Router */

  constructor( private userService :UserService,private router: Router) {  }

  /*  isLoggedIn() Method will be called after re-clicking the Sign-up form */

  ngOnInit() {
    this.isLoggedIn();
  }

   user=new User();
   userCPass:string;
/* This registerUser() Method  is called when user presses the Submit Button.*/

  //=====================START registerUser()==========================

   registerUser(event){
     document.getElementById("loading_div").style.display="block";
     console.log("Registration Process Started--->");
     this.user.Profile_pic="user.png";
     this.user.Country="India";
     //console.log(this.user);
     this.userService.singleUserRegister(this.user).subscribe(data=>{
       this.user=new User();
       var result=data["_body"];
       //alert(result);
       document.getElementById("loading_text").innerHTML=result;
       document.getElementById("loading_div").style.display="block";
       setTimeout(()=>{ 
        document.getElementById("msg_modal").style.display="none";
        document.getElementById("loading_div").style.display="none";
        if(result=='"Successfully Registered..."'){
            this.router.navigate(['/User/Login']);
            event.reset();
        }else if(result=='"You have entered a Registered Email ID, Login to continue..."'){
            this.router.navigate(['/User/Login']);
            event.reset();
        } 
       }, 1500);
     });
    
   }
   //=====================END registerUser()==============================

  //=====================START isLoggedIn()==============================

   isLoggedIn(){
    if(localStorage.getItem("User_Details")!=null)  {
      document.getElementById("msg_container").innerHTML="Your are already logged in,No Need of Registration....<br/>Redirecting yout to Your Profile..";
      document.getElementById("msg_modal").style.display="block";
      setTimeout(function(){ 
        document.getElementById("msg_modal").style.display="none";
       }, 2500);
       this.router.navigate(['/Account']); 
    }
  }
}
//=====================END isLoggedIn()=================================