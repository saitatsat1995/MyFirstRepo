import { Injectable } from '@angular/core';
import { Global } from 'src/app/Shared/global';
import { VechileLog } from 'src/app/Shared/vechile-log';
import {Http,Response,Headers,RequestOptions,RequestMethod} from '@angular/http';
import {Observable} from 'rxjs';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class VeichleLogService {

  constructor(private http:Http,private global :Global) { }
  /////////////////////////////////////Updating Vechile Details///////////////////////////////////////////////////////////
  updateVeichleDetails(vechileLog:VechileLog){
    document.getElementById("loading_text").innerHTML="Initiating Updation...";
    document.getElementById("loading_div").style.display="block";
    var body=JSON.stringify(vechileLog);
    var headerOptions=new Headers({'Content-Type':'application/json'});
    var requestionOptions=new RequestOptions({method:RequestMethod.Post,headers:headerOptions});
    return this.http.post(this.global.WebApiPath+'/Vehicle/UserVeichleUpdate',body, requestionOptions).pipe(map(x=>x));
  }
  //////////////////////////////////////End Of Updating Vechile Details/////////////////////////////////////////////////
  /////////////////////////////////////Fetching Vechile Details////////////////////////////////////////////////////////
  getVeichleDetails(id:number){
    var headerOptions=new Headers({'Content-Type':'application/json'});
    return this.http.get(this.global.WebApiPath+'/Vehicle/getVeichleDetails/'+id).pipe(map(x=>x));
  }
  ////////////////////////////////////End OF Fetching Vechile Details/////////////////////////////////////////////////
  ////////////////////////////////////Uploading Vechile Picture//////////////////////////////////////////////////////
  postFile( fileToUpload: File,userId:string) {
    const endpoint = this.global.WebApiPath+'/api/VechileLogs/PostVechileImage';
    const formData: FormData = new FormData();
    formData.append('Image', fileToUpload, fileToUpload.name);
    formData.append('UserId',userId);
    return this.http
      .post(endpoint, formData);
  }
  ////////////////////////////////////End Of Uploading PRofile Picture///////////////////////////////////////////////
}
