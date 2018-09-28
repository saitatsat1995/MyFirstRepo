import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router:Router) { }

  isLoggedIn(){
    if(localStorage.getItem("User_Details")==null){
      document.getElementById("msg_container").innerHTML="Your are not Logged in....<br/>Redirecting yout to Login...";
      document.getElementById("msg_modal").style.display="block";
      document.getElementById("loading_div").style.display="block";
      setTimeout(()=>{ 
        document.getElementById("msg_modal").style.display="none"; 
        document.getElementById("loading_div").style.display="none";
        this.router.navigate(['User/Login']);
       }, 10); 
    }
    if(localStorage.getItem("User_Role") != "ADMIN"){
      this.router.navigate(['User/Account']);
    }
  }   

  ngOnInit() {
    this.isLoggedIn();
   // document.getElementById("myverification").style.display="none"; 
  }


}
