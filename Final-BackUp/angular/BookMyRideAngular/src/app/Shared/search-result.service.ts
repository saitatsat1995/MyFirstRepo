import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { Global } from "src/app/Shared/global";
import { Router } from "@angular/router";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class SearchResultService {
  isFilterOn: boolean = false;
  startLoc: string;
  ListOfLocations: any[] = [];
  searchstart: string;
  searchend: string;
  ListOfStartLocations: any[] = [];
  ListOfEndLocations: any[] = [];
  selectedEnd: number = 0;
  selectedStart: number = 0;
  hoverActive: boolean[] = [false, false, false, false, false];
  hoverActiveStart: boolean[] = [false, false, false, false, false];
  hoverActiveEnd: boolean[] = [false, false, false, false, false];
  PostRideDetail: any[] = [];
  starReview: number[] = [1, 2, 3, 4, 5];
  RideDummy: any[] = [];

  //validating search bar
  startbool: boolean = false;
  endbool: boolean = false;

  private startHomeLoc = new BehaviorSubject('');
  private endHomeLoc = new BehaviorSubject('');
  currentStart = this.startHomeLoc.asObservable();
  currentEnd = this.endHomeLoc.asObservable();

  constructor(private http: HttpClient, private global: Global, private router: Router) { }

  changeStart(Loc: string) {
    this.startHomeLoc.next(Loc);
  }

  changeEnd(Loc: string) {
    this.endHomeLoc.next(Loc);
  }

  searchLocButton() {
    this.isFilterOn = true;
    this.PostRideDetail = [];
    var temp = this.searchstart.split(",");
    var startArea = temp[0];
    var startTown = temp[1];
    var startId: number;
    temp = this.searchend.split(",");
    var endArea = temp[0];
    var endTown = temp[1];
    var endId: number;
    document.getElementById("loading_div").style.display = "block";
    document.getElementById("loading_text").innerHTML="Searching....";
    this.http.get(this.global.WebApiPath + '/api/Locations/' + startArea).subscribe(response => {
      var tmp: any = response;
      tmp.forEach(element => {
        if (element.Town.includes(startTown)) {
          startId = element.Id;
        }
      }); //cog(response + " " + startId);
      this.http.get(this.global.WebApiPath + '/api/Locations/' + endArea).subscribe(resp => {
        var temps: any = resp;
        temps.forEach(element => {
          if (element.Town.includes(endTown)) {
            endId = element.Id;
          }
        });

        this.http.get(this.global.WebApiPath + '/api/Users/RideLog/' + startId).subscribe(data => {
          var tmp: any = data;
          //cog(data);
          tmp.forEach(element => {
            //cog(element);
            this.http.get(this.global.WebApiPath + '/api/Users/SearchResult/' + element.RideHostId).subscribe(d => {
              var t: any = d;
              //cog(t[0]);
              //cog(t);
              t.forEach(elm => {
                let posts: any;
                if (endId == element.EndPointLocationId && element.RideHostId != parseInt(localStorage.getItem("User_Details"))) {
                  posts = {
                    Id: element.Id,
                    Fname: elm.Fname,
                    Lname: elm.Lname,
                    IsVerified: false,
                    Profile_pic: elm.Profile_pic,
                    Rating: elm.Rating,
                    RideHostId: element.RideHostId,
                    StartTime: element.StartTime,
                    StartDate: element.StartDate,
                    StartPointLocation: this.searchstart,
                    EndPointLocation: this.searchend,
                    PriceForRide: element.PriceForRide,
                    TotalSeatAvailable: element.TotalSeatAvailable,
                    VacantSeats: element.TotalSeatAvailable - element.VacantSeats,
                    Status: element.Status,
                    VehicleNumber: elm.VechileRegNumber,
                    VechileImage: elm.VechileImage
                  };
                  if (posts.VacantSeats != 0)
                    this.PostRideDetail.push(posts);
                  //cog(this.PostRideDetail);
                }
              });
            })

          });
        });
        //cog(this.PostRideDetail);
        document.getElementById("loading_div").style.display = "none";
        this.RideDummy = this.PostRideDetail;

      })
    })

  }

  selectStartLocation(loc: string) {
    //cog(loc);
    // document.getElementById("start").style.display = "hidden";

    this.startbool = true;

    var temp = loc.split(",");
    var area: string = temp[0];
    var town: string = temp[1];
    // //cog(area+town);
    this.searchstart = loc;
    this.selectedStart = 1;
    this.hoverActiveStart = [false, false, false, false, false];
    // this.startHide=1;   
    //cog(this.searchstart);

  }

  selectEndLocation(loc: string) {

    this.endbool = true;

    var temp = loc.split(",");
    var area: string = temp[0];
    var town: string = temp[1];
    // //cog(area+town);
    this.searchend = loc;
    this.selectedEnd = 1;
    this.hoverActiveEnd = [false, false, false, false, false];
    // this.endHide=1;
  }

  getLocationStart() {
    this.selectedStart = 0;
    this.startbool = false;
    this.isFilterOn = false;
    if (this.searchstart.length == 0) { this.ListOfStartLocations = [] }
    else {
      //cog(this.searchstart);
      this.http.get(this.global.WebApiPath + '/api/Locations/' + this.searchstart).subscribe(data => {
        let temp: any = data;
        this.ListOfStartLocations = [];
        //cog(this.ListOfStartLocations + "first");
        var i: number = 1;
        temp.forEach(element => {
          if (i++ >= 6) return;
          let elem: Locate = { area: element.Area, town: element.Town, id: element.Id };//||elem.area.includes("B.O")||elem.area.includes("H.O"))
          if (elem.area.includes("S.O")) {
            elem.area = elem.area.replace("S.O", "");
          }
          if (elem.area.includes("B.O")) {
            elem.area = elem.area.replace("B.O", "");
          }
          if (elem.area.includes("H.O")) {
            elem.area = elem.area.replace("H.O", "");
          }
          if (elem.area.includes("(")) {
            let y: number = elem.area.indexOf("(");
            let x: number = elem.area.indexOf(")");
            var z = elem.area.substring(y, x + 1);
            elem.area = elem.area.replace(z, "");
          }
          if (elem.town.includes("(")) {
            let y: number = elem.town.indexOf("(");
            let x: number = elem.town.indexOf(")");
            var z = elem.town.substring(y, x + 1);
            elem.town = elem.town.replace(z, "");
          }
          if (elem.area.length>20) {
            elem.area = elem.area.slice(0,15);
          }
          if (elem.area.length + elem.town.length > 25) {
            elem.town = elem.town.slice(0, 25 - elem.area.length);
          }

          this.ListOfStartLocations.push(elem.area + "," + elem.town);
          //cog(this.ListOfStartLocations + "second");
        });
        //cog(this.ListOfStartLocations + "third");
      })
    }
  }

  getLocationEnd() {
    this.selectedEnd = 0;
    this.endbool = false;
    this.isFilterOn = false;
    if (this.searchend.length == 0) { this.ListOfEndLocations = [] }
    else {
      // //cog(this.searchend);
      this.http.get(this.global.WebApiPath + '/api/Locations/' + this.searchend).subscribe(data => {
        let temp: any = data;
        this.ListOfEndLocations = [];
        //cog(this.ListOfEndLocations + "first");
        var i: number = 1;
        temp.forEach(element => {
          if (i++ >= 6) return;
          let elem: Locate = { area: element.Area, town: element.Town, id: element.Id };//||elem.area.includes("B.O")||elem.area.includes("H.O"))
          if (elem.area.includes("S.O")) {
            elem.area = elem.area.replace("S.O", "");
          }
          if (elem.area.includes("B.O")) {
            elem.area = elem.area.replace("B.O", "");
          }
          if (elem.area.includes("H.O")) {
            elem.area = elem.area.replace("H.O", "");
          }
          if (elem.area.includes("(")) {
            let y: number = elem.area.indexOf("(");
            let x: number = elem.area.indexOf(")");
            var z = elem.area.substring(y, x + 1);
            elem.area = elem.area.replace(z, "");
          }
          if (elem.town.includes("(")) {
            let y: number = elem.town.indexOf("(");
            let x: number = elem.town.indexOf(")");
            var z = elem.town.substring(y, x + 1);
            elem.town = elem.town.replace(z, "");
          }
          if (elem.area.length + elem.town.length > 25) {
            elem.town = elem.town.slice(0, 30 - elem.area.length);
          }

          this.ListOfEndLocations.push(elem.area + "," + elem.town);
          // //cog(this.ListOfEndLocations + "second");
        });
        // //cog(this.ListOfEndLocations + "third");
      })
    }
  }

  locationClick(str: string) {
    this.startLoc = str;
  }

  dateFilterSearch(travelDate: any): any {
    if(travelDate == undefined) return;
    //cog(travelDate);
    this.RideDummy = [];
    this.PostRideDetail.forEach(element => {
      //cog(element.StartDate);

      if (travelDate == element.StartDate) {
        this.RideDummy.push(element);
      }
    });

  }

  homeSearch() {
    // this.endbool=false;
    // this.startbool=false;
    this.router.navigate(['/User/SearchResult']);
  }

  priceSort() {
    document.getElementById("priceSort").style.backgroundColor = "blue";
    this.RideDummy = this.PostRideDetail.sort((e1, e2) => e1.PriceForRide - e2.PriceForRide);
  }
  departureSort() {
    this.RideDummy = this.PostRideDetail.sort((e1, e2) => {
      return e1.StartTime - e2.StartTime
    });
  }

  resetClick(){
    this.RideDummy = this.PostRideDetail;
    // this.dateFilterSearch(undefined);
    

  }

}


interface Locate {
  id: number;
  area: string;
  town: string;
}
