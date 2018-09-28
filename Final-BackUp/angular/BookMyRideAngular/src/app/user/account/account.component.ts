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
import { RefferalCode } from 'src/app/Shared/refferal-code';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  startRating=[1,2,3,4,5];
  startRating1=[1,2,3,4,5];
  filetoupload:File=null;
  AccountHolder : User = new User();
  veichleDetails : VechileLog = new VechileLog();
  veichleImage:any;
  UserId : number;
  isPostRide:boolean=true;
  APIPATH=this.global.WebApiPath;
  refferalCode :RefferalCode = new RefferalCode();
  reedemPointsData=[];
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
  fileToUpload: File = null;
  imageShow:any;
  RideLogAsHost=[];
  RideLogAsRider=[];
  reviewGivenByUserDetails=[];
  reviewForUserDetails=[];
  ngOnInit() {
    //alert("ngOnInit Called");
    this.isLoggedIn();
    if(localStorage.getItem("User_Details")!=null){
      this.UserId=parseInt(localStorage.getItem("User_Details"));
      this.getProfilePictureData();
      this.getVeichleDetails();      
      document.getElementById("loading_div").style.display="block";
      document.getElementById("loading_text").innerHTML="Fetching your profile data...";
      this.userServices.getUserDetailsService(this.UserId).subscribe(data=>{
        var result=JSON.parse(data["_body"]);
        this.AccountHolder=result[0];
        //console.log(this.AccountHolder);
        for(var i=0;i<this.AccountHolder.Rating;i++){
          this.startYellow[i]=i;
        }
        for(var i=0;i<(5-this.AccountHolder.Rating);i++){
          this.startWhite[i]=i;
        }
        document.getElementById("loading_div").style.display="none";
        document.getElementById("loading_text").innerHTML="";
      });
    }
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
       }, 1500); 
    }
  }
  updateUser(){
    if(localStorage.getItem("User_Details")!=null){
      this.userServices.updateUserDetails(this.AccountHolder).subscribe(data=>{
        document.getElementById("msg_container").innerHTML=JSON.parse(data["_body"]);
        document.getElementById("msg_modal").style.display="block";  
        document.getElementById("loading_div").style.display="none";
        setTimeout(()=>{ 
          document.getElementById("msg_modal").style.display="none";   
          document.getElementById("loading_div").style.display="none";
          this.router.navigate(['User/Account']);
         }, 1500);
      });
    }
  }
///////////////////////////////////////FILE UPLOAD/////////////////////////////////////////////////////////////
getImageFile(file:FileList){
  this.filetoupload=file.item(0);
  if(this.isImage(this.filetoupload.name)){
    var reader= new FileReader();
    reader.readAsDataURL(this.filetoupload);
   }else{
      alert("Please Select a valid Image file...");
   }
}
///////////////////////////////////Upload Profile Picture///////////////////////////////////////////////////////
onSubmit(Image){
  if(this.isImage(this.filetoupload.name)){
    if(this.filetoupload.size<2048000){
      document.getElementById("loading_div").style.display="block";
      document.getElementById("loading_text").innerHTML="Uploading your Profile picture...";
      this.userServices.postFile(this.filetoupload,this.UserId.toString()).subscribe(
        data=>{
          console.log("Data successfully inserted...");
          Image.value=null;
          document.getElementById("loading_text").innerHTML="Profile picture successfully updated...";
          setTimeout(()=>{
            document.getElementById("loading_div").style.display="none";
          },500);
          this.getProfilePictureData();
          this.ngOnInit();
        }
      );
    }else{
      alert("Image size should be less than 2MB...");
    }
  }else{
    alert("Please Select a valid Image file...");
  }
}
getExtension(filename) {
  var parts = filename.split('.');
  return parts[parts.length - 1];
}

isImage(filename) {
    var ext = this.getExtension(filename);
    switch (ext.toLowerCase()) {
    case 'jpg':
    case 'gif':
    case 'bmp':
    case 'png':
        //etc
        return true;
    }
    return false;
  }
/////////////////////////////////End OF Upload Profile Picture////////////////////////////////////////////////
///////////////////////////////////////END OF FILE UPLOAD//////////////////////////////////////////////////////
////////////////////////////////////////Get File Data//////////////////////////////////////////////////////////
getProfilePictureData(){
  var img = this.http.get(this.global.WebApiPath + '/Users/Image/' + this.UserId, { responseType: "blob" });
  img.subscribe(data => {
    var xyz = data;
    console.log("Profile Pic Sucessfully fetched...");
    let reader = new FileReader();
    reader.addEventListener("load", () =>{
      this.imageShow = reader.result;
    },false);
    if(xyz){reader.readAsDataURL(xyz);}
   });
}
////////////////////////////////////////Get File Data//////////////////////////////////////////////////////////
////////////////////////////////////////Update Veichle Details////////////////////////////////////////////////
updateVeichle(){
  console.log("Update Veichle Details Intiated.....");
  //console.log(this.veichleDetails);
  this.veichleDetails.UserId=this.UserId;
  this.veichleLogService.updateVeichleDetails(this.veichleDetails).subscribe(data=>{
    var result=JSON.parse(data["_body"]);
    console.log(result[0]);
    this.veichleDetails=result[1];
    if(this.veichleDetails.VechileRegNumber!=null){
      this.isPostRide=false;
    }
    document.getElementById("loading_text").innerHTML=result[0];
    setTimeout(()=>{
      document.getElementById("loading_text").innerHTML="";
      document.getElementById("loading_div").style.display="none";
    },1000);
  });
}
///////////////////////////////////////End Of Update Veichle Details/////////////////////////////////////////
///////////////////////////////////////Get Veichle Details///////////////////////////////////////////////////
getVeichleDetails(){
  console.log("Getting Vechile Details....");
  this.veichleLogService.getVeichleDetails(this.UserId).subscribe(data=>{
    var result=JSON.parse(data["_body"]);
    console.log(result[0]);
    this.veichleDetails=result[1];
    if(this.veichleDetails.VechileRegNumber!=null){
      this.isPostRide=false;
    }
    console.log("Veichle Image fetched...");
  });
}
///////////////////////////////////////End Of Veichle Details////////////////////////////////////////////////
///////////////////////////////////////Upload Veichle Image//////////////////////////////////////////////////
UploadVechileImage(Image){
  if(this.isImage(this.filetoupload.name)){
    if(this.filetoupload.size<2048000){
      document.getElementById("loading_div").style.display="block";
      document.getElementById("loading_text").innerHTML="Uploading your veichle image...";
      this.veichleLogService.postFile(this.filetoupload,this.UserId.toString()).subscribe(
        data=>{
          console.log("Data successfully inserted...");
          Image.value=null;
          document.getElementById("loading_text").innerHTML="Veichle Image successfully updated...";
          setTimeout(()=>{
            document.getElementById("loading_div").style.display="none";
            this.ngOnInit();
          },500);
          this.getProfilePictureData();
        }
      );
    }else{
      alert("Image size should be less than 2MB...");
    }
  }else{
    alert("Please select a valid Image...");
  }
}
///////////////////////////////////////End Of Upload Vechile Image///////////////////////////////////////////
////////////////////////////////////User As a Host Details///////////////////////////////////////////////////
getUserAsHostRideLog(){
  console.log("Fetching Ride Log....");
  console.log("Getting User As Rider Log Details-->");
  document.getElementById("loading_div").style.display="block";
  document.getElementById("loading_text").innerHTML="Fetching the your rides...";
  this.userServices.getUserAsHostRideLogService(this.UserId,5).subscribe(data=>{
    var result=JSON.parse(data["_body"]);
    document.getElementById("getUserAsHostRideLog_res").innerHTML=result[0];
    if(result[0]=="Ride Log As Host Successfully Fetched...."){
      this.RideLogAsHost=result[1];
      this.RideLogAsHost=this.RideLogAsHost;
      console.log(result[0]);
      document.getElementById("loading_div").style.display="block";
      document.getElementById("loading_text").innerHTML="Fetching Ride Log As Host....";
      document.getElementById("getUserAsHostRideLog_res").innerHTML="";
    }else{
      document.getElementById("getUserAsHostRideLog_res").innerHTML=result[0];
    }
    setTimeout(()=>{
      document.getElementById("loading_div").style.display="none";
    },1000);
  });
}
//////////////////////////////////End Of User As a Host Details////////////////////////////////////////////////////
//////////////////////////////////Get All Rides of the User ////////////////////////////////////////////////////

getUserAsRiderLog(){
  console.log("Getting User As Rider Log Details-->");
  document.getElementById("loading_div").style.display="block";
  document.getElementById("loading_text").innerHTML="Fetching the your rides...";
  this.userServices.getUserAsRiderLogService(this.UserId,5).subscribe(data=>{
    console.log("User As Rider Log Details-->");
    var result=JSON.parse(data["_body"]);
    console.log(result[1]);
    document.getElementById("getUserAsRiderLog_res").innerHTML=result[0];
    if(result[0]=="Ride Log Successfully fetched...."){
      this.RideLogAsRider=result[1];
      document.getElementById("getUserAsRiderLog_res").innerHTML="";
    }
    document.getElementById("loading_text").innerHTML=result[0];
    setTimeout(()=>{
      document.getElementById("loading_div").style.display="none";
    },1500);
  });
}

//////////////////////////////////End Of Getting All Rides Of the User/////////////////////////////////////////
//////////////////////////////////Go to View a Single Ride////////////////////////////////////////////////////////
viewRideYouHost(RideLogId){
  localStorage.setItem("RideLogId",RideLogId);
  document.getElementById("loading_div").style.display="block";
  document.getElementById("loading_text").innerHTML="Taking you to Ride Details...";
  setTimeout(()=>{
    document.getElementById("loading_div").style.display="none";
    this.router.navigate(['/User/Ride-Details']);
  },1000);
}
//////////////////////////////////End Of go to view Single Ride//////////////////////////////////////////////////
//////////////////////////////////Go to View a Feedback////////////////////////////////////////////////////////
redirectToFeedback(data1,data2,data3){
  localStorage.setItem("FeedBack_RideLodDetails",JSON.stringify(data1));
  localStorage.setItem("FeedBack_RideHostDetails",JSON.stringify(data2));
  localStorage.setItem("FeedBack_RiderLogDetails",JSON.stringify(data3));
  document.getElementById("loading_div").style.display="block";
  document.getElementById("loading_text").innerHTML="Taking you to Feedback...";
  setTimeout(()=>{
    document.getElementById("loading_div").style.display="none";
    this.router.navigate(['/User/Feedback']);
  },1000);
}
//////////////////////////////////End Of go to view Feedback////////////////////////////////////////////////////


//////////////////////////////////Showing Review Given By User/////////////////////////////////////////////////
reviewGivenByUser(){
  document.getElementById("loading_div").style.display="block";
  document.getElementById("loading_text").innerHTML="Fetching your feedbacks...";
  this.userServices.reviewGivenByUserService(this.UserId).subscribe(data=>{
     var result=JSON.parse(data["_body"]);
     console.log(result[0]);
     if(result[0]=="FeedBack List Sucesfully Fetched...."){
       this.reviewGivenByUserDetails=result[1];
       this.reviewGivenByUserDetails.reverse();
     }else{
      document.getElementById("reviewGivenByUser_res").innerHTML=result[0];
     }
     document.getElementById("loading_text").innerHTML=result[0];
     setTimeout(()=>{
      document.getElementById("loading_div").style.display="none";
     },1000);
  });
}
reviewForUser(){
  document.getElementById("loading_div").style.display="block";
  document.getElementById("loading_text").innerHTML="Fetching your feedbacks...";
  this.userServices.reviewForUserService(this.UserId).subscribe(data=>{
     var result=JSON.parse(data["_body"]);
     if(result[0]=="FeedBack List Sucesfully Fetched...."){
      this.reviewForUserDetails=result[1];
      this.reviewForUserDetails.reverse();
      //console.log(this.reviewGivenByUserDetails);
     }else{
      document.getElementById("reviewForUser_res").innerHTML=result[0];
     }
     document.getElementById("loading_text").innerHTML=result[0];
     setTimeout(()=>{
      document.getElementById("loading_div").style.display="none";
     },1000);
  });
}
/////////////////////////////////Showing Review Given By User/////////////////////////////////////////////////
/////////////////////////////////Button Calling to the function//////////////////////////////////////////////


//==========================================================================================================
//==========================================|| Button To show Your Rides ||================================= 
showYourRidesFlag=false;
showYourRides(){
  if(this.showYourRidesFlag){
    this.showYourRidesFlag=false;
  }else{
    this.getUserAsRiderLog();
    this.showYourRidesFlag=true;
  }
}
//----------------------------------------|| End Of Show Your Rides ||=====================================
//=========================================================================================================
//==========================================================================================================
//==========================================|| Button To show Your Rides You Hosted ||================================= 
showRidesYouHostFlag=false;
showRidesYouHost(){
  if(this.showRidesYouHostFlag){
    this.showRidesYouHostFlag=false;
  }else{
    this.getUserAsHostRideLog();
    this.showRidesYouHostFlag=true;
  }
}
//----------------------------------------|| End Of Show Your Rides You Hosted ||=====================================
//=========================================================================================================
//==========================================================================================================
//==========================================|| Button To show Your feedback you have given ||================================= 
showYourReviewsFlag=false;
showYourReviews(){
  if(this.showYourReviewsFlag){
    this.showYourReviewsFlag=false;
  }else{
    this.reviewGivenByUser();
    this.showYourReviewsFlag=true;
  }
}
//----------------------------------------|| Button To show Your feedback you have given ||=====================================
//=========================================================================================================
//==========================================================================================================
//==========================================|| Button To show Your feedback you have given ||================================= 
feedbackAboutYouFlag=false;
feedbackAboutYou(){
  if(this.feedbackAboutYouFlag){
    this.feedbackAboutYouFlag=false;
  }else{
    this.reviewForUser();
    this.feedbackAboutYouFlag=true;
  }
}
//----------------------------------------|| Button To show Your feedback you have given ||=====================================
//=========================================================================================================
/////////////////////////////////End Of Button Calling to the function///////////////////////////////////////

/////////////////////////////////////Show Refferal Modal/////////////////////////////////////////////////////
show_reffer_modal(){
  document.getElementById("refferal_modal").style.display="block";
  this.refferalCode.refferal_code=this.randomString();
}
close_reffer_modal(){
  document.getElementById("refferal_modal").style.display="none";
}
/////////////////////////////////////End Of Show Refferal Modal/////////////////////////////////////////////

////////////////////////////////////Random Charecter Generater/////////////////////////////////////////////
randomString() {
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	var string_length = 8;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
	return randomstring;
}
////////////////////////////////////End Of Random Chercter Generater//////////////////////////////////////

////////////////////////////////////Submit refferal///////////////////////////////////////////////////////
submitRefferalCode(){
  this.refferalCode.refferer_email=this.AccountHolder.Email;
  this.refferalCode.refferer_id=this.AccountHolder.Id;
  //console.log(this.refferalCode);
  document.getElementById("loading_text").innerHTML="Intiating your refferal code....";
  document.getElementById("loading_div").style.display="block";
  this.userServices.submitRefferal(this.refferalCode).subscribe(data=>{
   var result=JSON.parse(data['_body']);
   console.log(result);
   document.getElementById("loading_text").innerHTML=result;
   setTimeout(()=>{
     if(result=="You have successfully reffer to the given email id..."){
      document.getElementById("refferal_modal").style.display="none";
      this.refferalCode=new RefferalCode();
     }
     document.getElementById("loading_div").style.display="none";
   },2000);
  });
}
////////////////////////////////////End Of Submit Refferal///////////////////////////////////////////////

////////////////////////////////////Reedem Points////////////////////////////////////////////////////////
reedemPoints(RideDetails){
  document.getElementById("redeem_points_modal").style.display="block";
  this.reedemPointsData=RideDetails;
  console.log(RideDetails);
}
close_reedem_points(){
  document.getElementById("redeem_points_modal").style.display="none";
}
reedem_points(RidersLogId){
  document.getElementById("loading_div").style.display="block";
  document.getElementById("loading_text").innerHTML="Intiating your request...";
  this.userServices.redeemPoints(RidersLogId).subscribe(data=>{
    var result=JSON.parse(data["_body"]);
    console.log(result);
    document.getElementById("loading_text").innerHTML=result;
    setTimeout(()=>{
      this.getUserAsRiderLog();
      this.ngOnInit();
      document.getElementById("redeem_points_modal").style.display="none";
      document.getElementById("loading_div").style.display="none";
    },1500);
    
  });
}
////////////////////////////////////End Of Reedem Points////////////////////////////////////////////////
}
