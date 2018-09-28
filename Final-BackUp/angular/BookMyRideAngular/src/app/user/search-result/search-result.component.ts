import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { SearchResultService } from "../../Shared/search-result.service";
import { Global } from "src/app/Shared/global";
import { Router } from "@angular/router";
import { Pipe } from "@angular/core";
import { PipeTransform } from "@angular/core";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})



export class SearchResultComponent implements OnInit {


  starReview: number[] = [1, 2, 3, 4, 5];
  travelDate: Date;

  todayDate: string;

  constructor(private http: HttpClient, public searchService: SearchResultService, private global: Global, private router: Router) { }

  priceSort() {
    this.searchService.priceSort();
  }


  departureSort() {
    this.searchService.departureSort();
  }

  dateFilter() {
    this.searchService.dateFilterSearch(this.travelDate);
  }

  resetClick() {
    this.travelDate = undefined;
    this.searchService.resetClick();
  }

  searchButton() {
    this.searchService.searchLocButton();
  }

  getLocStart() {
    this.searchService.getLocationStart();
  }

  getLocEnd() {
    this.searchService.getLocationEnd();
  }

  selectStartLoc(loc: string) {
    this.searchService.selectStartLocation(loc);
  }

  selectEndLoc(loc: string) {
    this.searchService.selectEndLocation(loc);
  }

  locationClicked(str: string) {
    this.searchService.locationClick(str);
  }

  requestRide(rideLogId: number, RideHostId: number) {
    var ridersLog: RiderLog;
    if (RideHostId == parseInt(localStorage.getItem("User_Details"))) {
      alert("you cannot request Ride which you host");
      document.getElementById("" + rideLogId).style.display = "none";
      return;
    }
    if (localStorage.getItem("User_Details") == null) {
      //co("entering the if");
      this.router.navigate(['/User/Login']);
      return;
    }
    //co("Entering the API");


    this.http.get(this.global.WebApiPath+'/api/Users/RidersLog/' + parseInt(localStorage.getItem("User_Details"))).subscribe(data => {
      var temp: any = data;
      var flag:boolean = false;
      temp.forEach(element => {
        if (element.RideLogId == rideLogId && element.Status != "Complete") {
          // document.getElementById("msg_container").innerHTML = "You have already requested this ride";
          // document.getElementById("msg_modal").style.display = "block";
          // document.getElementById("loading_div").style.display = "block";
          // setTimeout(() => {
          //   document.getElementById("msg_modal").style.display = "none";
          //   document.getElementById("loading_div").style.display = "none";
          // }, 1500);
          
          flag=true;
          return;
          
        }
      });
      if (flag) {
        alert("You have already requested this ride");
        document.getElementById("" + rideLogId).innerHTML = "Requested";
        // document.getElementById("" + rideLogId).setAttribute. = "none";
        return;
      }
      // alert("You have already requested this ride2");
      ridersLog = {
        Id: null,
        Status: "Requested",
        Rating: 0,
        Remark: "Added",
        RideLogId: rideLogId,
        RiderId: parseInt(localStorage.getItem("User_Details"))
      };

      
      this.http.post(this.global.WebApiPath + '/RidersLog/RequestRide', ridersLog, httpOptions)
        .subscribe(d => {
          //co(d);
          this.router.navigate(['/User/Account']);
        });
    })


  }


  ngOnInit() {
    var month = new Date().getMonth() + 1 < 10 ? "0" + (new Date().getMonth() + 1) : new Date().getMonth() + 1;
    var day = new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate();
    this.todayDate = new Date().getFullYear() + '-' + month + '-' + day;
    //co(this.todayDate);
    if (this.searchService.searchend.length && this.searchService.searchstart.length)
      this.searchButton();

    // document.getElementById("calender-icon").style.display = "none";
  }



  // ///////////////posting data/////////////////////////////////////



}

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {
  transform(items: any[], start: string): any[] {
    return items.filter(it => {
      if (start != it)
        return it;
    });
  }


}


interface RiderLog {
  Id: number;
  RiderId: number;
  RideLogId: number;
  Status: string;
  Remark: string;
  Rating: number;
}

interface Locate {
  id: number;
  area: string;
  town: string;
}


