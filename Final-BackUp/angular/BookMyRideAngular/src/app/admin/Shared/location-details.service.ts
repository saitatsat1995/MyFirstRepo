import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from 'src/app/Shared/location';
import {Global} from 'src/app/Shared/global';

const httpOptions = { headers: new HttpHeaders({
  'Content-Type': 'application/json'
  }),
  };   


@Injectable({
  providedIn: 'root'
})
export class LocationDetailsService {

  constructor(private http: HttpClient, private global:Global) { }

  getCities(): Observable<Location[]>{
    return this.http.get<Location[]>(this.global.WebApiPath+'/api/Locations/getLocationDetailsAdmin', httpOptions);
  }

  addCity(location : Location): Observable<any> {
      console.log(location);
    return this.http.post<any>(this.global.WebApiPath+'/api/Locations/PostLocationAdmin', location, httpOptions );
  }

  deleteCity(id):Observable<any> {
    return this.http.delete<any>(this.global.WebApiPath+'/api/Locations/DeleteLocationAdmin/' + id, httpOptions);
  }

  searchLocation(id){
    return this.http.get(this.global.WebApiPath+'/api/Locations/searchLocation/'+id);
  }

}
