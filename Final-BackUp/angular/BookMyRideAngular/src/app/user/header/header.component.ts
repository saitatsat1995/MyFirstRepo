import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public router: Router) { }

  UserId:any;
  UserRole:any;
  ngOnInit() {
    this.UserId=localStorage.getItem("User_Details");
    this.UserRole=localStorage.getItem("User_Role");
    //console.log("User Ride:"+this.UserId);
    //console.log(this.constructor.name);
  }

  onLogout(){
    document.getElementById("loading_div").style.display="block";
    document.getElementById("loading_text").innerHTML="Logging out...";
    setTimeout(()=>{ 
      if(localStorage.getItem("User_Details")!=null){
        localStorage.removeItem("User_Details");
        localStorage.clear();
        this.router.navigate(['/User/Login']);
        console.log("You are Logged out...");
        document.getElementById("loading_text").innerHTML="You are Logged out...";
      }
      else{
        console.log("You are not Logged in...");
        document.getElementById("loading_text").innerHTML="You are not Logged in...";
      }
      document.getElementById("loading_div").style.display="none";
     }, 1500);
  }
  
}
