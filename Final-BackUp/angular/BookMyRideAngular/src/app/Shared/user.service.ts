import { Injectable } from '@angular/core';
import { User } from 'src/app/Shared/user';
import { Global } from 'src/app/Shared/global';
import {Http,Response,Headers,RequestOptions,RequestMethod} from '@angular/http';
import {Observable} from 'rxjs';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import {RideLog} from 'src/app/Shared/ride-log';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers : new HttpHeaders({
  'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:Http,private global :Global,private http1: HttpClient){ }

  singleUserRegister(user : User){
    document.getElementById("loading_text").innerHTML="Intiating Sign Up...";
    document.getElementById("loading_div").style.display="block";
    var body=JSON.stringify(user);
    var headerOptions=new Headers({'Content-Type':'application/json'});//mime type
    var requestionOptions=new RequestOptions({method:RequestMethod.Post,headers:headerOptions});
    return this.http.post(this.global.WebApiPath+'/Users/SignUp',body, requestionOptions).pipe(map(x=>x));
  }
  
  getUserDetailsService(id : number){
    var headerOptions=new Headers({'Content-Type':'application/json'});
    return this.http.get(this.global.WebApiPath+'/Users/getUserDetailsById/'+id).pipe(map(x=>x));
  }
  updateUserDetails(user:User){
    document.getElementById("loading_text").innerHTML="Initiating Updation...";
    document.getElementById("loading_div").style.display="block";
    var body=JSON.stringify(user);
    var headerOptions=new Headers({'Content-Type':'application/json'});
    var requestionOptions=new RequestOptions({method:RequestMethod.Post,headers:headerOptions});
    return this.http.post(this.global.WebApiPath+'/Users/UserDetailsUpdate',body, requestionOptions).pipe(map(x=>x));
  }

/////////////////////////////////////Image Service/////////////////////////////////////////
  postFile( fileToUpload: File,userId:string) {
    const endpoint = this.global.WebApiPath+'/api/Users/PostImageEntity';
    const formData: FormData = new FormData();
    formData.append('Image', fileToUpload, fileToUpload.name);
    formData.append('UserId',userId);
    return this.http
      .post(endpoint, formData);
  }
  ///////////////////////////////////Start Search Option For Start Location >> POSTRIDE/////////////////////////////////////////////////  
  getStartLocation(inputValue:string){
    var headerOptions=new Headers({'Content-Type':'application/json'});
    return this.http.get(this.global.WebApiPath+'/Location/getStartLocation/'+inputValue).pipe(map(x=>x));
  }
  ///////////////////////////////////End Search Option For Start Location >> POSTRIDE///////////////////////////////////////////////////

  /////////////////////////////////////Post a Ride//////////////////////////////////////////////////////////////////
  postRide(ride:RideLog){
    var body=JSON.stringify(ride);
    var headerOptions=new Headers({'Content-Type':'application/json'});
    var requestionOptions=new RequestOptions({method:RequestMethod.Post, headers:headerOptions});
    return this.http.post(this.global.WebApiPath+'/RideLog/userPostRide',body,requestionOptions).pipe((map(x=>x)));
  }
  /////////////////////////////////////End Of Post A Ride//////////////////////////////////////////////////////////////
  ////////////////////////////////////User As a Host Details//////////////////////////////////////////////////////////
  getUserAsHostRideLogService(UserId,num){
    var headerOptions=new Headers({'Content-Type':'application/json'});
    return this.http.get(this.global.WebApiPath+'/RideLog/getRideLogDetails/'+UserId+"/"+num).pipe(map(x=>x));
  }
  //////////////////////////////////End Of User As a Host Details////////////////////////////////////////////////////
  ////////////////////////////////Getting Single Ride Log Deails/////////////////////////////////////////////////////
  getSingleRideLogDetailsService(RideLogId){
    var headerOptions=new Headers({'Content-Type':'application/json'});
    return this.http.get(this.global.WebApiPath+'/RideLog/getSingleRideLogDetailsService/'+RideLogId).pipe(map(x=>x));
  }
  ////////////////////////////////Ending Single Ride Log Deails///////////////////////////////////////////////////////
  ///////////////////////////////Getting Requested Riders Details/////////////////////////////////////////////////////
  getRequestedRidersLogDetailsService(RideLogId){
    var headerOptions=new Headers({'Content-Type':'application/json'});
    return this.http.get(this.global.WebApiPath+'/RideLog/getRequestedRidersLogDetails/'+RideLogId).pipe(map(x=>x));
  }
  ///////////////////////////////End Of Requested Riders Details//////////////////////////////////////////////////////
  ///////////////////////////////Accepting Ride Service///////////////////////////////////////////////////////////////
  acceptRideService(RideLogId){
    var headerOptions=new Headers({'Content-Type':'application/json'});
    return this.http.get(this.global.WebApiPath+'/Users/AcceptRideSerice/'+RideLogId).pipe(map(x=>x));
  }
  ///////////////////////////////End Of Accepting Ride Service////////////////////////////////////////////////////////
  ///////////////////////////////Accepting Ride Service///////////////////////////////////////////////////////////////
  rejectRideService(RideLogId){
    var headerOptions=new Headers({'Content-Type':'application/json'});
    return this.http.get(this.global.WebApiPath+'/Users/RejectRideSerice/'+RideLogId).pipe(map(x=>x));
  }
  ///////////////////////////////End Of Accepting Ride Service////////////////////////////////////////////////////////
  //////////////////////////////Show Accepted Request/////////////////////////////////////////////////////////////////
  showAcceptedRideRequestService(RideLogId){
    var headerOptions=new Headers({'Content-Type':'application/json'});
    return this.http.get(this.global.WebApiPath+'/RideLog/showAcceptedRide/'+RideLogId).pipe(map(x=>x));
  }
  /////////////////////////////End Show Accept Show///////////////////////////////////////////////////////////////////
  //////////////////////////////////Get All Rides of the User ////////////////////////////////////////////////////
  getUserAsRiderLogService(UserId,num){
    var headerOptions=new Headers({'Content-Type':'application/json'});
    return this.http.get(this.global.WebApiPath+'/Users/getUserAsRiderLog/'+UserId+"/"+num).pipe(map(x=>x));
  }
  //////////////////////////////////End Of Getting All Rides Of the User/////////////////////////////////////////
  reviewGivenByUserService(UserId){
    var headerOptions=new Headers({'Content-Type':'application/json'});
    return this.http.get(this.global.WebApiPath+'/Users/reviewGivenByUserService/'+UserId).pipe(map(x=>x));
  }
  reviewForUserService(UserId){
    var headerOptions=new Headers({'Content-Type':'application/json'});
    return this.http.get(this.global.WebApiPath+'/Users/reviewForUserService/'+UserId).pipe(map(x=>x));
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////

  
  //////////////////////////////////////////////Home PAge Analytics//////////////////////////////////////////////

  getUserCountService(): Observable<any>
  {
    return this.http1.get<any>(this.global.WebApiPath+'/Users/UserCount', httpOptions);
  
  }
  ////////////////////////////////Ending number of users registered////////////////////////////////////////////////// 
  ////////////////////////////////Getting number of vehicles registered////////////////////////////////////////////////// 
  
  getVehicleCountService(): Observable<any>
  {
    return this.http1.get<any>(this.global.WebApiPath+'/Vehicle/VehicleCount', httpOptions);
  
  }
  ////////////////////////////////Ending number of users registered////////////////////////////////////////////////// 
  ////////////////////////////////Getting number of rides succeeded////////////////////////////////////////////////// 
  
  getSucceededRidesCountService(): Observable<any>
  {
    return this.http1.get<any>(this.global.WebApiPath+'/RideLog/SucceededRidesCount', httpOptions);
  
  }
  ////////////////////////////////Ending number of users registered////////////////////////////////////////////////// 
  ////////////////////////////////Getting number of rides posted////////////////////////////////////////////////// 
  getPostedRidesCountService(): Observable<any>
  {
    return this.http1.get<any>(this.global.WebApiPath+'/RideLog/PostedRidesCount', httpOptions);
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  ////////////////////////////////////////Submit Refferal Code////////////////////////////////////////////////////
  submitRefferal(refferal){
    var body=JSON.stringify(refferal);
    var headerOptions=new Headers({'Content-Type':'application/json'});
    var requestionOptions=new RequestOptions({method:RequestMethod.Post, headers:headerOptions});
    return this.http.post(this.global.WebApiPath+'/Users/submitRefferal',body,requestionOptions).pipe((map(x=>x)));
  } 
  ///////////////////////////////////////End Of Submit Refferal Code//////////////////////////////////////////////

  //////////////////////////////////////Redeem Points////////////////////////////////////////////////////////////
  redeemPoints(ridersLogId){
    var headerOptions=new Headers({'Content-Type':'application/json'});
    return this.http.get(this.global.WebApiPath+'/Users/reedemPoints/'+ridersLogId).pipe(map(x=>x));
  }
  //////////////////////////////////////End Of Reedem Points/////////////////////////////////////////////////////

  /////////////////////////////////////Update Ride Status///////////////////////////////////////////////////////
  updateRideStatusService(RideLogId,RideStatus){
    var headerOptions=new Headers({'Content-Type':'application/json'});
    return this.http.get(this.global.WebApiPath+'/Users/updateRideStatus/'+RideLogId+"/"+RideStatus).pipe(map(x=>x));
  }
  ////////////////////////////////////End Of Update Ride Status////////////////////////////////////////////////

  ////////////////////////////////////Contact US////////////////////////////////////////////////
  PostContactUs(ContactUsDetails):Observable<any>
  {
    return this.http1.post<any>(this.global.WebApiPath+'/Users/contactUs',ContactUsDetails, httpOptions);
    
  }

}
