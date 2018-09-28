import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/Shared/user.service';
import { Global } from "src/app/Shared/global";
import { HttpHeaders } from "@angular/common/http";
import { Pipe } from "@angular/core";
import { PipeTransform } from "@angular/core";
import {Router} from "@angular/router";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  user: any[] = [];
  AccountHolder: any;
  password: string;
  confirmPassword: string;
  searchVar: string;
  UserId;
  p:number = 1;
  constructor(private http: HttpClient, private global: Global, private router:Router) { }

  editClick(userOne: any) {
    this.AccountHolder = userOne;
    document.getElementById("myModal1").style.display="block";
  }

  VerifyClick(userOne: any) {
    this.AccountHolder = userOne;
    document.getElementById("myModal2").style.display="block";
  }

  pwdUpdate() {
    var result = this.AccountHolder;
    result.Password = this.confirmPassword;
    this.http.put(this.global.WebApiPath + "/Admin/UserDetails/" + this.AccountHolder.Id, result, httpOptions).subscribe(d => {
      console.log(d);
      alert("successfully updated");
      this.password="";
      this.confirmPassword="";
    })
  }

  closeVerify(){
    document.getElementById("myModal2").style.display="none";
  }

  isVerify() {
    var result = this.AccountHolder;
    console.log(result);
    
    result.IsVerified = 1;
    this.http.put(this.global.WebApiPath + "/Admin/UserDetails/" + this.AccountHolder.Id, result, httpOptions).subscribe(d => {
      console.log(d);
      alert("successfully updated");
    })
  }

  onCloseEdit(event){
    document.getElementById("myModal1").style.display="none";
    event.reset();
  }

  isBlocked(userOne: any) {
    this.AccountHolder = userOne;
    var result = this.AccountHolder;
   // document.getElementById("loading_div").style.display="block";
   // document.getElementById("loading_text").innerHTML="initiating process...";
    if (result.IsVerified == 2) {
      result.IsVerified = 0;
      alert("unblocked");
      document.getElementById(result.Id + "b3").innerHTML = "block";
    }
    else {
      result.IsVerified = 2;
      alert("blocked user");
      document.getElementById(result.Id+'b').innerHTML = "blocked";
    }
    console.log("new ======>"+result);
    this.http.put(this.global.WebApiPath + "/Admin/UserDetails/" + result.Id, result, httpOptions).subscribe(d => {
      console.log("new "+d);
     // document.getElementById("loading_div").style.display="none";
      // document.getElementById(userId+"").style.backgroundColor = "green";      
    })
  }

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
    document.getElementById("loading_div").style.display = "block";
    this.UserId=localStorage.getItem("User_Details");
    this.http.get(this.global.WebApiPath + '/Admin/UserDetails').subscribe(data => {
      // console.log(data);
      var temp: any = data;
      this.user = temp;
      //console.log(this.user);
      this.AccountHolder = this.user[0];
      document.getElementById("loading_div").style.display = "none";

    })
   
  }
 
}



@Pipe({
  name: 'UserSearchFilter'
})
export class UserSearchFilter implements PipeTransform {
  transform(items: any[], searchText: string): any[] {

    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      var temp: string = it.userSingle.Fname.toLowerCase() + " " + it.userSingle.Lname.toLowerCase();
      
      return temp.includes(searchText);
    });
  }
}





