import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
  })
export class Global {
    ///////Web Api Path For Online DEV API SERVER
    //WebApiPath : string ="https://bookmyridedotnetdevjuly2018.azurewebsites.net";
    ///////Web Api Path For Online QA API SERVER
    // WebApiPath : string ="https://bookmyridedotnetqajuly2018.azurewebsites.net";
    ///////Web Api Path For Local API SERVER
    WebApiPath : string ="http://localhost:61494";
}
