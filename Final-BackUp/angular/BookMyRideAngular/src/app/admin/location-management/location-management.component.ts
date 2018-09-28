import { Component, OnInit } from '@angular/core';
import { LocationDetailsService } from 'src/app/admin/Shared/location-details.service';
import {Location} from '../../Shared/location';
import {UserService} from 'src/app/Shared/user.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-location-management',
  templateUrl: './location-management.component.html',
  styleUrls: ['./location-management.component.css']
})
export class LocationManagementComponent implements OnInit {

  isStartSearch=true;
  location: Location = new Location();
  cities: Location[] = [];
  fewCities:Location[];
  check: any;
  index:number=0;
  isPrevious:boolean=true;
  isNext:boolean=false;
  maxPages:number;
  searchLocationInput;
  startLocation:string[];
  resultLocation;
  isSearched:boolean=true;

  constructor(private service: LocationDetailsService, private userService:UserService, private router:Router) { }

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
    this.getCities();
  }

  addCity(event){
    document.getElementById("loading_div").style.display="block";
    document.getElementById("loading_text").innerHTML="initiating process...";
    this.service.addCity(this.location).subscribe(data => {this.check = data;
      document.getElementById("loading_div").style.display="block";
      document.getElementById("loading_text").innerHTML=this.check;
      this.getCities();
      setTimeout(()=>{ 
        document.getElementById("loading_div").style.display="none";
       }, 1500);
      this.location = new Location();
      event.reset();
    });
  }

  getCities(){
    this.service.getCities().subscribe(data => {
      this.cities = data;
     // console.log(data);
      let isExtraPage=(this.cities.length)%10;
      this.maxPages=Math.floor( (this.cities.length/10));
      if(isExtraPage>0){
        this.maxPages=this.maxPages+1;
      //  console.log(this.maxPages)
      }
      this.fewCities=new Array(10);
      this.next();
    });
  }

  next(){
    this.fewCities=[];
    this.index=this.index+1;
   // console.log(this.index)
    if(this.index>=this.maxPages){
      this.isNext=true;
    }

    if(this.index==1){
      let endindex=this.index*10;
      for(var i=0;i<endindex;i++){
        this.fewCities[i]=this.cities[i];
      }
    }
    else{
      this.isPrevious=false;
      let endindex=this.index*10;
      let startindex=endindex-10;
      let j=0;
      for(var i=startindex;i<endindex;i++){
        if(this.cities[i]!=null){
        this.fewCities[j]=this.cities[i];
        j=j+1;
        }
        else{
          break;
        }
      }
    }
  }

  previous(){
    this.isNext=false;
    this.fewCities=[];
    this.index=this.index-1;
    if(this.index<=1){
     this.isPrevious=true;
    }

      let endindex=this.index*10;
      let startindex=endindex-10;
      let j=0;
      for(var i=startindex;i<endindex;i++){
        this.fewCities[j]=this.cities[i];
        j=j+1;

    }
  }

  deleteCity(id){
    if(confirm("Are you sure to delete")) {
      this.service.deleteCity(id).subscribe(data => {
        this.check = data;
        this.getCities();
      });
    }


  }
  updateCity(city){
    //console.log(city);
    if(confirm("Are you sure to update")) {
      this.location.Area = city.Area;
      this.location.District = city.District;
      this.location.Pincode = city.Pincode;
      this.location.Town = city.Town;
      this.location.Id = city.Id;
    }
  }

  LocationInput() {
    this.isStartSearch=true;
    let promise = new Promise((resolve, reject) => {
      var inputVal = this.searchLocationInput;
      //console.log("Searching For:--->"+inputVal);
      inputVal = inputVal.trim();
      var flag = true;
      if (inputVal != "" && flag == true) {
       // console.log("check: "+inputVal);
        flag = false;
        this.startLocation = [];
        // document.getElementById("startLocation_result_loading").style.display = "block";
        // document.getElementById("startLocation_result").style.display = "none";
        this.userService.getStartLocation(inputVal).toPromise().then(data => {
          var result = JSON.parse(data["_body"]);
          //console.log("Search Result:-->"+inputVal);
          //console.log(result);
          // document.getElementById("startLocation_result_loading").style.display = "none";
          var inputVal = this.searchLocationInput;
          inputVal = inputVal.trim();
          // if (inputVal.length != 0) {
          //   document.getElementById("startLocation_result").style.display = "block";
          // }
         // console.log(result);
          this.startLocation = result;
          flag = true;
          resolve();
        });
       }
        else {
         this.startLocation = [];
      // //   this.Postride.EndPointLocationId=null;
     }
      return promise;
    });
  }

  setStartLocation(id, area, town) {
    this.isStartSearch=false;
    this.location.Id = id;
    //document.getElementById("startLocation_result").style.display = "none";
    this.searchLocationInput = area + " , " + town;
    this.startLocation = [];
  }

  onSubmit(){
    this.service.searchLocation(this.location.Id).subscribe(data=>{
      this.resultLocation=data;
      //console.log(this.resultLocation);
      //console.log(this.resultLocation[0].Area);
      this.isSearched=false;
      this.searchLocationInput="";
      this.startLocation = [];
    })
  }

  onViewAll(){
    this.isStartSearch=true;
    this.isSearched=!(this.isSearched);
  }

}
