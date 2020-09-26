import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Supplier } from "src/app/Supplier";
import { RouterModule, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment'


@Injectable({
    providedIn: 'root'
})
export class SupplierService {

    baseUrl = environment.baseUrl;
    headerAuthorization = environment.headerAuthorization;

    Url: string;
    token: string;
    header: any;
    router: Router
    headerSettings: { [name: string]: string | string[]; } = {};
    constructor(private http: HttpClient) {
      
       // this.Url = 'http://www.pearltechservices.com/SRQuizApi/QuickCode/';

        this.Url = this.baseUrl + 'Supplier/';

        this.headerSettings['Authorization'] = 'Basic ' + btoa(this.headerAuthorization);
        this.headerSettings['Content-Type'] = 'application/json';

    }
 

    GetSupplier(selectedValue: string) {
       // debugger;
       const httpOptions = { headers: this.headerSettings };
        return this.http.post<any>(this.Url + 'GetAll/'+selectedValue, "", httpOptions);
    }

    GetAllSugg(columnname: string) {
        // debugger;
        const httpOptions = { headers: this.headerSettings };
         return this.http.post<any>(this.Url + 'GetAllSugg/'+columnname, "", httpOptions);
     }
    CreateSupplier(supplier: Supplier) {
        const httpOptions = { headers: this.headerSettings };
        return this.http.post<any>(this.Url + 'add/', supplier, httpOptions).pipe(map(user => {
            return user;
        }));
    }

    UpdateSupplier(supplier: Supplier) {
        const httpOptions = { headers: this.headerSettings };
        return this.http.post<any>(this.Url + 'update/', supplier, httpOptions).pipe(map(user => {
            return user;
        }));
    }

   

   
}
