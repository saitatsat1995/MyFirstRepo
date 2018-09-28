import { Injectable } from '@angular/core';
import {Http,Response,Headers,RequestOptions,RequestMethod} from '@angular/http';
import {Observable} from 'rxjs';
import { Global } from 'src/app/Shared/global';

import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import {RideLog} from 'src/app/Shared/ride-log';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FeedbackDetails } from 'src/app/admin/Shared/FeedbackDetails';

const httpOptions = {
  headers : new HttpHeaders({
  'Content-Type': 'application/json',
  
  })
};


@Injectable({
  providedIn: 'root'
})
export class FeedbackManagementService {

  constructor(private global :Global,private http1: HttpClient) { }
  getFeedbackDetailsService(): Observable<any>
  {
    return this.http1.get<any>(this.global.WebApiPath+'/api/UserRatings/GetFeedBacks', httpOptions);
  
  }
  getFeedbackbyId(Fid):Observable<any>
  {
    return this.http1.get<any>(this.global.WebApiPath+'/api/UserRatings/getFeedbackDetailsById/'+Fid, httpOptions);
    
  }
  UpdateFeedbacks(editablefd):Observable<any>
  {
    console.log(editablefd);
     
    return this.http1.post<any>(this.global.WebApiPath+'/api/UserRatings/FeedbackDetailsUpdate',editablefd, httpOptions);
    
    
  }
  DeleteFeedbacks(Fid):Observable<any>
  {
    return this.http1.delete<any>(this.global.WebApiPath+'/api/UserRatings/DeleteFeedbacks/'+Fid, httpOptions);
    
  }

}
