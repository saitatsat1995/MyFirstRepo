import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BookMyRideAngular';

  constructor(private router: Router){
    var currentdate = new Date();
    currentTime=currentdate.getTime();
    var lastUpdated=currentdate.getTime();
    var currentTime=currentdate.getTime();
    document.addEventListener("mousemove",()=>{
      var currentdate = new Date();
      lastUpdated=currentdate.getTime()
    });
    setInterval(()=>{
      if(localStorage.getItem("User_Details")!=null){ 
        var currentdate = new Date();
        currentTime=currentdate.getTime();
        var diff=(currentTime-lastUpdated);
        //console.log("Inactivity="+diff);
        if(diff>300000){
            this.onLogout();
        }
      }
    },1000);
  }

  onLogout(){
    document.getElementById("loading_div").style.display="block";
    document.getElementById("loading_text").innerHTML="Session Out,Logging you out...";
    setTimeout(()=>{ 
      if(localStorage.getItem("User_Details")!=null){
        localStorage.removeItem("User_Details");
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
