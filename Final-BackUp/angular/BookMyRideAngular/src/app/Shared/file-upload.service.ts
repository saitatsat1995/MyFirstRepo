import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private httpClient:HttpClient) { }
}
