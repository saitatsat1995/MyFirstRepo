import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Shared/user';
import { Global } from 'src/app/Shared/global';
import { VechileLog } from 'src/app/Shared/vechile-log';
import { VeichleLogService } from 'src/app/Shared/veichle-log.service';
import {Router} from "@angular/router";
import { UserService } from 'src/app/Shared/user.service';
import { FileUploader } from 'ng2-file-upload';
import{HttpClient} from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ride-details',
  templateUrl: './ride-details.component.html',
  styleUrls: ['./ride-details.component.css']
})
export class RideDetailsComponent implements OnInit {

  constructor(
    private location: Location,
    private router: Router,
    private userServices:UserService,
    private http : HttpClient,
    private veichleLogService:VeichleLogService,
    private global : Global
  ) { }
  startYellow =[];
  startWhite=[]; 
  APIPATH=this.global.WebApiPath;
  rideLogId;
  RideHostDetails:User;
  RideHostVeichleDetails:VechileLog;
  RideLogDetails=[];
  intrestedPeople=[];
  acceptedPeople=[];
  rideStatus;
  ngOnInit() {
    this.isLoggedIn();
    this.rideLogId=localStorage.getItem("RideLogId");
    this.getSingleRideLogDetails();
    this.getRequestedRidersLogDetails();
    this.showAcceptedRideRequest();
  }

  /////////////////////////////////Checking User is Logged in Or Not//////////////////////////////////////////////
  isLoggedIn(){
    if(localStorage.getItem("User_Details")==null){
      document.getElementById("msg_container").innerHTML="Your are not Logged in....<br/>Redirecting yout to Login...";
      document.getElementById("msg_modal").style.display="block";
      document.getElementById("loading_div").style.display="block";
      setTimeout(()=>{ 
        document.getElementById("msg_modal").style.display="none"; 
        document.getElementById("loading_div").style.display="none";
        this.router.navigate(['User/Login']);
       }, 1500); 
    }
  }
  ////////////////////////////////End Of Checking User id Logged in Or Not///////////////////////////////////////////
  ////////////////////////////////Getting Single Ride Log Deails/////////////////////////////////////////////////////
  getSingleRideLogDetails(){
    this.rideLogId=localStorage.getItem("RideLogId");
    if(this.rideLogId!=null){
      console.log("Fetching Ride Log Details...");
      document.getElementById("loading_div").style.display="block";
      document.getElementById("loading_text").innerHTML="Fetching Ride Log Details...";
      this.userServices.getSingleRideLogDetailsService(this.rideLogId).subscribe(data=>{
        var result=JSON.parse(data["_body"]);
        //console.log(result[0]);
        console.log(result);
        console.log(result[0]);
        this.rideStatus=result[1][7];
        document.getElementById("loading_text").innerHTML=result[0];
        this.RideHostDetails=result[2][0];
        this.RideHostVeichleDetails=result[3][0];
        this.RideLogDetails=result[1];
        //console.log("Bhak"+this.RideHostVeichleDetails.VechileRegNumber)
        // console.log(this.RideHostDetails.Fname);
        //console.log(this.RideLogDetails);
        // console.log("Ride Host Details:"+this.RideHostDetails);
        // console.log("Ride Host Veichle Details:"+this.RideHostVeichleDetails);
        for(var i=0;i<this.RideHostDetails.Rating;i++){
          this.startYellow[i]=i;
        }
        for(var i=0;i<(5-this.RideHostDetails.Rating);i++){
          this.startWhite[i]=i;
        }
        setTimeout(()=>{
          document.getElementById("loading_div").style.display="none";
        },1500);
      });
    }else{
      document.getElementById("loading_div").style.display="block";
      document.getElementById("loading_text").innerHTML="Something went worng...";
      setTimeout(()=>{
        document.getElementById("loading_div").style.display="none";
        document.getElementById("loading_text").innerHTML="";
        this.router.navigate(['/User/Account']);
      },1000);
    }
  }
  ///////////////////////////////End Of Getting Single Ride Log Details//////////////////////////////////////////////
  ///////////////////////////////Getting Requested Riders Details/////////////////////////////////////////////////////
  getRequestedRidersLogDetails(){
    this.rideLogId=localStorage.getItem("RideLogId");
    this.userServices.getRequestedRidersLogDetailsService(this.rideLogId).subscribe(data=>{
      var result=JSON.parse(data["_body"]);
      //console.log(result);
      if(result[0]=="No ride request found..."){
        document.getElementById("intresetedPeopleLog").innerHTML="<span class='w3-text-red'>No ride request found...</span>";
      }else{
        this.intrestedPeople=result[1];
        //console.log(this.intrestedPeople);
      }
    });
  }
  ///////////////////////////////End Of Requested Riders Details//////////////////////////////////////////////////////
  ///////////////////////////////Accepting the Ride Request///////////////////////////////////////////////////////////
  acceptRide(RideLogId){
    console.log("Accepting the Ride Request.....");
    document.getElementById("loading_div").style.display="block";
    document.getElementById("loading_text").innerHTML="Accepting the Ride Request.....";
    this.userServices.acceptRideService(RideLogId).subscribe(data=>{
      var result=JSON.parse(data["_body"]);
      document.getElementById("loading_text").innerHTML=result;
      this.showAcceptedRideRequest();
      this.getRequestedRidersLogDetails();
    });
  }
  //////////////////////////////End Of Accepting the Ride Request/////////////////////////////////////////////////////
  ///////////////////////////////Accepting the Ride Request///////////////////////////////////////////////////////////
  rejectRide(RideLogId){
    console.log("Rejecting the Ride Request.....");
    document.getElementById("loading_div").style.display="block";
    document.getElementById("loading_text").innerHTML="Rejecting the Ride Request.....";
    this.userServices.rejectRideService(RideLogId).subscribe(data=>{
    var result=JSON.parse(data["_body"]);
    document.getElementById("loading_text").innerHTML=result;
    this.getRequestedRidersLogDetails();
    this.ngOnInit();
    });
  }
  //////////////////////////////End Of Accepting the Ride Request/////////////////////////////////////////////////////
  //////////////////////////////Start Details to show Accepted Request////////////////////////////////////////////////
  showAcceptedRideRequest(){
    this.rideLogId=localStorage.getItem("RideLogId");
    document.getElementById("loading_div").style.display="block";
    document.getElementById("loading_text").innerHTML="Fetching Accepted Ride Log details...";
    this.userServices.showAcceptedRideRequestService(this.rideLogId).subscribe(data=>{
      console.log("Show Accepted Ride Log Details:-->");
      var result=JSON.parse(data["_body"]);
      document.getElementById("loading_text").innerHTML=result[0];
      if(result[0]!="No Accepted ride found...."){
        this.acceptedPeople=result[1];
      }
      console.log(result[0]);
      //console.log(this.acceptedPeople);
      setTimeout(()=>{
        document.getElementById("loading_div").style.display="none";
      },500);
    });
  }
  //////////////////////////////End Of Details to show Accepted Request///////////////////////////////////////////////

  //////////////////////////////Start Of updateRideLogStatus//////////////////////////////////////////////////////////
  updateRideLogStatus(){
    var rideLogId=this.RideLogDetails[0];
    document.getElementById("loading_div").style.display="block";
    document.getElementById("loading_text").innerHTML="Intiating Updation....";
    this.userServices.updateRideStatusService(rideLogId,this.rideStatus).subscribe(data=>{
      var result=JSON.parse(data["_body"]);
      console.log(result);
      document.getElementById("loading_text").innerHTML=result;
      setTimeout(()=>{
        document.getElementById("loading_div").style.display="none";
        this.ngOnInit();
      },1500);
    });
  }
  //////////////////////////////End Of updateRideLogStatus////////////////////////////////////////////////////////////
}
