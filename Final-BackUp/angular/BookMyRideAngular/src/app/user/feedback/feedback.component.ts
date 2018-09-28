import { Component, OnInit } from '@angular/core';
import {FeedbackService} from 'src/app/Shared/feedback.service';
import { UserRating } from '../../Shared/user-rating';
import { Global } from 'src/app/Shared/global';
import {Router} from "@angular/router";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  result;
  startDate:string;
  endDate:string;
  APIPATH=this.global.WebApiPath;
  RideLogDetails;
  RideHostDetails;
  RideersLogDetails;

  RatingOnHost=0;
  RatingOnRide=0;

  ReviewOnHost="";
  RviewOnRide="";

  constructor(private feedbackservice: FeedbackService, private global:Global,private router:Router) { }
  RideLogId;
  RidersLogId;
   ngOnInit() {
    this.RideLogDetails=JSON.parse(localStorage.getItem("FeedBack_RideLodDetails"));
    this.RideHostDetails=JSON.parse(localStorage.getItem("FeedBack_RideHostDetails"));
    this.RideersLogDetails=JSON.parse(localStorage.getItem("FeedBack_RiderLogDetails"));
    //alert(this.RideLogDetails);
   }
   onRatingOne(rating){
    this.RatingOnHost=rating;
   }
   onRatingTwo(num){
     this.RatingOnRide=num;
   }
   SubmitReviewOnHost(){
     console.log("Rating On Host:"+this.RatingOnHost);
     console.log("Review On Host"+this.ReviewOnHost);
     if(this.RatingOnHost==0){
        alert("Please enter a valid star rating...");
     }else if(this.ReviewOnHost==""){
        alert("Please enter a valid Review....");
     }else{
      document.getElementById("loading_div").style.display="block";
      document.getElementById("loading_text").innerHTML="Intiating review submission..."; 
      this.feedbackservice.submitReviwOnHost(this.RatingOnHost.toString(),this.ReviewOnHost.toString(),this.RideHostDetails['Id'].toString()).subscribe(data=>{
        var result=JSON.parse(data["_body"]);
        document.getElementById("loading_text").innerHTML=result;
        setTimeout(()=>{
          if(result=="Successfully review submited..."){
            document.getElementById("loading_div").style.display="none";
            this.router.navigate(['/User/Account']);
          }
        },1000);
      });
     }
   }
}
