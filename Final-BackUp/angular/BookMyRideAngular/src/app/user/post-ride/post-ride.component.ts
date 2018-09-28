import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Shared/user';
import { RideLog } from 'src/app/Shared/ride-log';
import { UserService } from 'src/app/Shared/user.service';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
@Component({
  selector: 'app-post-ride',
  templateUrl: './post-ride.component.html',
  styleUrls: ['./post-ride.component.css']
})
export class PostRideComponent implements OnInit {
  Postride: RideLog = new RideLog();
  constructor(private userService: UserService, private http: HttpClient, private router: Router) { }
  startingLocationInput: string;
  endingLocationInput: string;
  startLocation: string[] = [];
  endLocation: string[] = [];
  today; dd; mm; yyyy;
  StartDate;
  intrestedPeople = [];
  CURRTIME;
  EndDateMax: Date;
  startcount: number = 0;
  endcount: number = 0;
  isStartOpen: boolean = false;
  isEndOpen: boolean = false;

  isStartLocationPostRide=true;
  isEndLocationPostRide=true;
  ngOnInit() {
    //////////=====================================================================
    this.startcount = 0;
    document.addEventListener("keydown", (e) => {
      var kerPress = e.keyCode;

      if (kerPress === 40 && this.isStartOpen) {
        if (this.startcount > this.startLocation.length - 1) {
          this.startcount = 0;
        }
        for (var i = 0; i < this.startLocation.length; i++) {
          var id = "start_location_suggetion_" + this.startLocation[i]['Id'];
          document.getElementById(id).style.backgroundColor = "white";
        }
        if (this.startcount == 0) {
          var id = "start_location_suggetion_" + this.startLocation[this.startcount++]['Id'];
        } else if (this.startcount == 1) {
          var id = "start_location_suggetion_" + this.startLocation[this.startcount++]['Id'];
        } else if (this.startcount == 2) {
          var id = "start_location_suggetion_" + this.startLocation[this.startcount++]['Id'];
        } else if (this.startcount == 3) {
          var id = "start_location_suggetion_" + this.startLocation[this.startcount++]['Id'];
        } else if (this.startcount == 4) {
          var id = "start_location_suggetion_" + this.startLocation[this.startcount]['Id'];
        }
        document.getElementById(id).style.backgroundColor = "#ccc";
        console.log(id);
      } else if (kerPress === 38 && this.isStartOpen) {
        if (this.startcount < 0) {
          this.startcount = this.startLocation.length - 1;
        }
        for (var i = 0; i < this.startLocation.length; i++) {
          var id = "start_location_suggetion_" + this.startLocation[i]['Id'];
          document.getElementById(id).style.backgroundColor = "white";
        }
        if (this.startcount == 0) {

        } else {
          --this.startcount;
        }
        var id = "start_location_suggetion_" + this.startLocation[this.startcount]['Id'];
        document.getElementById(id).style.backgroundColor = "#ccc";
        console.log(id);
      } else if (kerPress === 13 && this.isStartOpen) {
        //console.log("Count:==>"+this.startcount+",Array Lenth:"+this.startLocation.length);
        this.Postride.StartPointLocationId = this.startLocation[this.startcount - 1]['Id'];
        document.getElementById("startLocation_result").style.display = "none";
        this.startingLocationInput = this.startLocation[this.startcount - 1]['Area'] + " , " + this.startLocation[this.startcount - 1]['Town'];
      }

      if (kerPress === 40 && this.isEndOpen) {
        //alert("end Open Down...");
        console.log(this.endLocation);
        if (this.endcount > this.endLocation.length - 1) {
          this.endcount = 0;
        }
        for (var i = 0; i < this.endLocation.length; i++) {
          var id = "end_location_suggetion_" + this.endLocation[i]['Id'];
          document.getElementById(id).style.backgroundColor = "white";
        }
        if (this.endcount == 0) {
          var id = "end_location_suggetion_" + this.endLocation[this.endcount++]['Id'];
        } else if (this.endcount == 1) {
          var id = "end_location_suggetion_" + this.endLocation[this.endcount++]['Id'];
        } else if (this.endcount == 2) {
          var id = "end_location_suggetion_" + this.endLocation[this.endcount++]['Id'];
        } else if (this.endcount == 3) {
          var id = "end_location_suggetion_" + this.endLocation[this.endcount++]['Id'];
        } else if (this.endcount == 4) {
          var id = "end_location_suggetion_" + this.endLocation[this.endcount]['Id'];
        }
        document.getElementById(id).style.backgroundColor = "#ccc";
        console.log(this.endcount);
        console.log(id);
      } else if (kerPress === 38 && this.isEndOpen) {
        if (this.endcount < 0) {
          this.endcount = this.endLocation.length - 1;
        }
        for (var i = 0; i < this.endLocation.length; i++) {
          var id = "end_location_suggetion_" + this.endLocation[i]['Id'];
          document.getElementById(id).style.backgroundColor = "white";
        }
        if (this.endcount == 0) {

        } else {
          --this.endcount;
        }
        var id = "end_location_suggetion_" + this.endLocation[this.endcount - 1]['Id'];
        document.getElementById(id).style.backgroundColor = "#ccc";
        console.log(this.endcount);
        console.log(id);
      } else if (kerPress === 13 && this.isEndOpen) {
        //console.log("Count:==>"+this.startcount+",Array Lenth:"+this.startLocation.length);
        this.Postride.EndPointLocationId = this.endLocation[this.endcount - 1]['Id'];
        document.getElementById("endLocation_result").style.display = "none";
        this.endingLocationInput = this.endLocation[this.endcount - 1]['Area'] + " , " + this.endLocation[this.endcount - 1]['Town'];
      }

    });
    /////////======================================================================
    this.isLoggedIn();
    this.today = new Date();
    this.dd = this.today.getDate();
    this.mm = this.today.getMonth() + 1; //January is 0!
    this.yyyy = this.today.getFullYear();

    if (this.dd < 10) {
      this.dd = '0' + this.dd
    }

    if (this.mm < 10) {
      this.mm = '0' + this.mm
    }

    this.today = this.yyyy + '-' + this.mm + '-' + this.dd;
    this.StartDate = this.today;
    document.addEventListener("click", () => {
      document.getElementById("startLocation_result").style.display = "none";
      document.getElementById("endLocation_result").style.display = "none";
    });

    var currentdate = new Date();
    this.CURRTIME = currentdate.getHours() + ":" + currentdate.getMinutes();
    //alert(this.CURRTIME);                
  }
  datestart() {
    var data: string[] = this.Postride.StartDate.split("-");
    console.log(data[0] + " " + data[1] + " " + data[2]);
    var y: Date = new Date(+data[0], +data[1] - 1, +data[2]);
    console.log(y);
    var todayDate = this.convertdate(this.today,this.CURRTIME);
    console.log(todayDate);
    
    

    this.userService.getUserAsHostRideLogService(parseInt(localStorage.getItem("User_Details")),
      5).subscribe(datas => {
        var temp: any = JSON.parse(datas["_body"]);
        var result = temp[1];
        console.log(result[0]+"result[0]");
        result.forEach(element => {
          var start: number = this.convertdate(element[1], element[3]);
          console.log(start + "start");
          var end: number = this.convertdate(element[2], element[4]);
          console.log(end + "end");
          var current: number = this.convertdate(this.Postride.StartDate, this.Postride.StartTime);
          console.log(current + "cur");

          if(current <todayDate){
            alert("you cannot select time before current time");
            this.Postride.StartTime = undefined;
            
            return;          
            
          }

         else  if (current > start && current < end) {
            // console.log(current);
            alert("you are hosting a ride in the same date as you already posted, please give some other day.");
            this.Postride.EndTime = undefined;
            return;
          }
          
        });
      });
    var x = new Date(y.getFullYear(), y.getMonth(), y.getDate() + 10);
    this.EndDateMax = x;
    console.log(x);
  }

  convertdate(dateInput: any, timeInput: any):
    number {
    var result: number = 1;
    if (dateInput != undefined) {
      var temp = dateInput.split("-");
      result = +temp[0];
      result = result * 100000000;
      var month = +temp[1];
      month = month * 1000000;
      result = result + month;
      var day = +temp[2];
      day = day * 10000;
      result = result + day;
      var tmp = timeInput.split(":");
      var hour = +tmp[0];
      var min = +tmp[1];
      hour = hour * 100;
      result = result + hour + min;
      // console.log(result);
    }
    return result;
  }



  dateend() {
    this.userService.getUserAsHostRideLogService(parseInt(localStorage.getItem("User_Details")),
      5).subscribe(datas => {
        var temp: any = JSON.parse(datas["_body"]);
        var result = temp[1];
        console.log(result[0]);
        result.forEach(element => {
          var start: number = this.convertdate(element[1], element[3]);
          console.log(start + "start");
          var currentStart: number = this.convertdate(this.Postride.StartDate, this.Postride.StartTime);
          console.log(currentStart + "cur");
          var currentEnd: number = this.convertdate(this.Postride.EndDate, this.Postride.EndTime);
          if (start > currentStart && start < currentEnd) {
            console.log(currentEnd);
            document.getElementById("post_ride_error").innerHTML="* You are hosting a ride in the same date as you already posted, please give some other day.";
            //alert("");
            this.Postride.EndDate = undefined;
            return;
          }
          else if(currentStart>currentEnd){   /// i changed atul it if 
            document.getElementById("post_ride_error").innerHTML="* Please provide proper time and date. start date/time is after end date/time";
            this.Postride.EndTime= undefined;
            return;
          }
        });
      });
  }



  dateToTimeStamp(date) {
    return (new Date(date)).getTime();;
  }
  getTimeAsNumberOfMinutes(time) {
    var timeParts = time.split(":");

    var timeInMinutes = (timeParts[0] * 60) + timeParts[1];

    return timeInMinutes;
  }
  submitForm() {
    console.log("Start Date :" + this.dateToTimeStamp(this.Postride.StartDate));
    console.log("End Date :" + this.dateToTimeStamp(this.Postride.EndDate));
    if (this.Postride.StartPointLocationId != null && this.Postride.EndPointLocationId != null && this.Postride.StartPointLocationId != this.Postride.EndPointLocationId) {

      if (this.dateToTimeStamp(this.Postride.StartDate) <= this.dateToTimeStamp(this.Postride.EndDate)) {
        this.Postride.RideHostId = parseInt(localStorage.getItem("User_Details"));
        document.getElementById("loading_div").style.display = "block";
        document.getElementById("loading_text").innerHTML = "Intiating your ride...";
        this.userService.postRide(this.Postride).subscribe(data => {
          console.log(JSON.parse(data["_body"]));
          //console.log(data["_body"]);
          //console.log(JSON.parse(data));
          document.getElementById("loading_text").innerHTML = JSON.parse(data["_body"]);
          setTimeout(() => {
            if (JSON.parse(data["_body"]) == "Slot is Alloted...") {
              document.getElementById("loading_div").style.display = "none";
            } else {
              this.router.navigate(['User/Account']);
            }
          }, 1500);
        });
        console.log("No need to check time...");
      } else if (this.dateToTimeStamp(this.Postride.StartDate) == this.dateToTimeStamp(this.Postride.EndDate)) {
        console.log("Need to check time, START TIME:" + this.Postride.StartTime + "===>ENDTIME" + this.Postride.EndTime + "==>CURRENT TIME==>" + this.CURRTIME);
        var tempStartTime = parseInt(this.Postride.StartTime.replace(':', ''));
        var tempEndTime = parseInt(this.Postride.EndTime.replace(':', ''));
        var tempCurrTime = parseInt(this.CURRTIME.replace(':', ''));
        if (tempStartTime < tempEndTime && tempCurrTime <= tempStartTime) {
          //console.log("Testttt");
          this.Postride.RideHostId = parseInt(localStorage.getItem("User_Details"));
          document.getElementById("loading_div").style.display = "block";
          document.getElementById("loading_text").innerHTML = "Intiating your ride...";
          this.userService.postRide(this.Postride).subscribe(data => {
            console.log(JSON.parse(data["_body"]));
            document.getElementById("loading_text").innerHTML = JSON.parse(data["_body"]);
            setTimeout(() => {
              if (JSON.parse(data["_body"]) == "Slot is Alloted...") {
                document.getElementById("loading_div").style.display = "none";
              } else {
                this.router.navigate(['User/Account']);
              }
            }, 1500);
          });
        } else {
          alert("Please select future Date & time...");
        }

      } else {
        alert("Start Date must be same or greater than end date...");
      }

    } else {
      alert("Select Valid Start Location & End Location OR Start Location and End Location can not be same...");
    }
  }
  /////////////////////////////Start Of Search Start Location//////////////////////////////////////////
  startLocationInput() {
    this.isStartLocationPostRide=true;
    let promise = new Promise((resolve, reject) => {
      var inputVal = this.startingLocationInput;
      //console.log("Searching For:--->"+inputVal);
      inputVal = inputVal.trim();
      var flag = true;
      if (inputVal != "" && flag == true) {
        flag = false;
        this.startLocation = [];
        this.startcount = 0;
        this.isStartOpen = false;
        document.getElementById("startLocation_result_loading").style.display = "block";
        document.getElementById("startLocation_result").style.display = "none";
        this.userService.getStartLocation(inputVal).toPromise().then(data => {
          var result = JSON.parse(data["_body"]);
          //console.log("Search Result:-->"+inputVal);
          //console.log(result);
          document.getElementById("startLocation_result_loading").style.display = "none";
          var inputVal = this.startingLocationInput;
          inputVal = inputVal.trim();
          if (inputVal.length != 0) {
            document.getElementById("startLocation_result").style.display = "block";
          }
          this.startLocation = result;
          this.isStartOpen = true;
          flag = true;
          resolve();
        });
      } else {
        this.startLocation = [];
        this.isStartOpen = false;
        this.Postride.EndPointLocationId = null;
      }
      return promise;
    });
  }
  setStartLocation(id, area, town) {
    this.isStartLocationPostRide=false;
    this.Postride.StartPointLocationId = id;
    document.getElementById("startLocation_result").style.display = "none";
    this.startingLocationInput = area + " , " + town;
  }
  /////////////////////////////End Of Search Start Location////////////////////////////////////////////
  /////////////////////////////Start Of Search End Location//////////////////////////////////////////
  endLocationInput() {
    this.isEndLocationPostRide=true;
    let promise = new Promise((resolve, reject) => {
      var inputVal1 = this.endingLocationInput;
      //console.log("Searching For:--->"+inputVal1);
      inputVal1 = inputVal1.trim();
      var flag = true;
      if (inputVal1 != "" && flag == true) {
        flag = false;
        this.endLocation = [];
        this.isEndOpen = false;
        document.getElementById("endLocation_result_loading").style.display = "block";
        document.getElementById("endLocation_result").style.display = "none";
        this.userService.getStartLocation(inputVal1).toPromise().then(data => {
          var result = JSON.parse(data["_body"]);
          //console.log("Search Result:-->"+inputVal1);
          //console.log(result);
          document.getElementById("endLocation_result_loading").style.display = "none";
          var inputVal1 = this.endingLocationInput;
          inputVal1 = inputVal1.trim();
          if (inputVal1.length != 0) {
            document.getElementById("endLocation_result").style.display = "block";
          }
          this.endLocation = result;
          this.isEndOpen = true;
          flag = true;
          resolve();
        });
      } else {
        this.endLocation = [];
        this.isEndOpen = false;
        this.Postride.EndPointLocationId = null;
      }
      return promise;
    });
  }
  setEndLocation(id, area, town) {
    this.isEndLocationPostRide=false;
    this.Postride.EndPointLocationId = id;
    document.getElementById("endLocation_result").style.display = "none";
    this.endingLocationInput = area + " , " + town;
  }
  /////////////////////////////End Of Search Start Location///////////////////////////////////////////////////////
  /////////////////////////////Start check of islogged in/////////////////////////////////////////////////////////
  isLoggedIn() {
    if (localStorage.getItem("User_Details") == null) {
      document.getElementById("msg_container").innerHTML = "Your are not Logged in....<br/>Redirecting yout to Login...";
      document.getElementById("msg_modal").style.display = "block";
      document.getElementById("loading_div").style.display = "block";
      setTimeout(() => {
        document.getElementById("msg_modal").style.display = "none";
        document.getElementById("loading_div").style.display = "none";
        this.router.navigate(['User/Login']);
      }, 1500);
    }
  }
  ////////////////////////////End check of islogged in//////////////////////////////////////////////////////////////


  //////////////////////////////////////Keydown Event////////////////////////////////////////////////////////////////
  //////////////////////////////////////End OF Key Down Event////////////////////////////////////////////////////////
}
