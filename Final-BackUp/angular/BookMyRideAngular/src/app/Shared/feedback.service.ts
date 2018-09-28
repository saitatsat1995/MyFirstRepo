import { Injectable } from '@angular/core';
import {Http,Response,Headers,RequestOptions,RequestMethod} from '@angular/http';
import {Observable} from 'rxjs';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserRating } from "src/app/Shared/user-rating";
import { Global } from 'src/app/Shared/global';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  constructor(private http : Http, private global:Global) { }

  UserId=+localStorage.getItem("User_Details");
 
  submitReviwOnHost(review,rating,hostid){
    return this.http.get(this.global.WebApiPath+'/UserRating/Review?UserId='+this.UserId+"&reveiw="+review+"&rating="+rating+"&hostId="+hostid).pipe(map(x=>x));
  }

}
