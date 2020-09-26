import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from "src/app/user";
import { RouterModule, Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment'



@Injectable({
    providedIn: 'root'
})
export class EnquiryService {

    private userLoggedIn = new Subject<boolean>();

    baseUrl = environment.baseUrl;
    headerAuthorization = environment.headerAuthorization;

    Url: string;
    UrlUserDept: string;
    UrlUserAppr: string;
    token: string;
    header: any;
    router: Router
    headerSettings: { [name: string]: string | string[]; } = {};
    constructor(private http: HttpClient) {
        //   this.Url = 'http://www.pearltechservices.com/SRQuizApi/Question';
        //   this.UrlAnswer = 'http://www.pearltechservices.com/SRQuizApi/Answer';

        this.userLoggedIn.next(false);

        this.Url = this.baseUrl + 'Enquiry';
       
        this.headerSettings['Authorization'] = 'Basic ' + btoa(this.headerAuthorization);
        this.headerSettings['Content-Type'] = 'application/json';
    }

    setUserLoggedIn(userLoggedIn: boolean) {
        this.userLoggedIn.next(userLoggedIn);
    }

    getUserLoggedIn(): Observable<boolean> {
        return this.userLoggedIn.asObservable();
    }

    GetEnquiryListAll(Enquiry: any) {
        // debugger;
        const httpOptions = { headers: this.headerSettings };
        return this.http.post<any>(this.Url + '/getEnquiryListAll/', Enquiry, httpOptions);
    }


   
    CreateEnquiry(Enquiry: User) {
        const httpOptions = { headers: this.headerSettings };
        return this.http.post<any>(this.Url + '/add/', Enquiry, httpOptions).pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            // localStorage.setItem('currentUser', JSON.stringify(user));

            return user;
        }));
    }

}
