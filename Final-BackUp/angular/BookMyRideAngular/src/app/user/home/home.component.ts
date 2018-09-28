import { Component, OnInit } from '@angular/core';
import { SearchResultService } from "../../Shared/search-result.service";
import {UserService} from 'src/app/Shared/user.service';
import {ContactUs} from 'src/app/Shared/contact-us';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public usercount:any;
  public vehiclecount:any;
  public postedRidesCount:any;
  public CompletedRidesCount:any;

  public details:ContactUs=new ContactUs();
  public objDate:any;
  

  hide = false;

  constructor(public searchService: SearchResultService, private userService:UserService ) { }

  ngOnInit() {
    this.searchService.searchstart = "";
    this.searchService.searchend = "";

    this.userService.getUserCountService().subscribe(data => {
      this.usercount =JSON.parse(data['count']);
      //console.log(JSON.parse(data['count']));
    });
    this.userService.getVehicleCountService().subscribe(data => {
      this.vehiclecount = JSON.parse(data['count']);
      //console.log(data);
    });
    this.userService.getPostedRidesCountService().subscribe(data => {
      this.postedRidesCount = JSON.parse(data['count']);
    });
    this.userService.getSucceededRidesCountService().subscribe(data => {
      this.CompletedRidesCount =JSON.parse(data['count']);
    });

    
   

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

  // start_scroll_down() {
  //   // var scroll = setInterval(function () { window.scrollBy(0, 600); console.log('start'); }, 15);
  //   window.scrollBy(0,400);
  // }

  SubmitContactUs(event)
  {
   var currentdate = new Date();
   this.objDate = currentdate.getHours() + ":" + currentdate.getMinutes();
   this.details.date=currentdate.toLocaleDateString();
   this.details.time=this.objDate;
   console.log(this.details);
    this.userService.PostContactUs(this.details).subscribe(data=>{
      //console.log(this.details);
      alert("Query Successfully submited, We will get back to you as soon as possible...");
      event.reset();
    });
  }

}
