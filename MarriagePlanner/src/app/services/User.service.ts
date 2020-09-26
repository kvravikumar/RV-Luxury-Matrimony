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
export class UserService {

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

        this.Url = this.baseUrl + 'User';
        this.UrlUserDept = this.baseUrl + 'UserDept';
        this.UrlUserAppr = this.baseUrl + 'UserAppr';


        this.headerSettings['Authorization'] = 'Basic ' + btoa(this.headerAuthorization);
        this.headerSettings['Content-Type'] = 'application/json';
    }

    setUserLoggedIn(userLoggedIn: boolean) {
        this.userLoggedIn.next(userLoggedIn);
    }

    getUserLoggedIn(): Observable<boolean> {
        return this.userLoggedIn.asObservable();
    }

    GetUsers(SearchValue: string) {
        // debugger;
        const httpOptions = { headers: this.headerSettings };
        return this.http.post<any>(this.Url + '/getuser/' + SearchValue, "", httpOptions);
    }

    GetUserByID(id: string) {
        // debugger;
        const httpOptions = { headers: this.headerSettings };
        return this.http.post<any>(this.Url + '/getuserid/' + id, "", httpOptions);
    }

    GetUserRoles(id: string, apprtype: string) {
        // debugger;
        const httpOptions = { headers: this.headerSettings };
        return this.http.post<any>(this.Url + '/getuserroles/' + id + '/' + apprtype, "", httpOptions);
    }


    CreateUser(user: User) {
        const httpOptions = { headers: this.headerSettings };
        return this.http.post<any>(this.Url + '/add/', user, httpOptions).pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            // localStorage.setItem('currentUser', JSON.stringify(user));

            return user;
        }));
    }

    UpdateUser(user: User) {
        const httpOptions = { headers: this.headerSettings };
        return this.http.post<any>(this.Url + '/update/', user, httpOptions).pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            sessionStorage.setItem('currentUser', JSON.stringify(user));

            return user;
        }));
    }
    DeleteUserDept(option: User) {
        const httpOptions = { headers: this.headerSettings };
        return this.http.post<any>(this.UrlUserDept + '/remove/', option, httpOptions).pipe(map(user => {
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            return user;
        }));
    }
    DeleteApprDept(option: User) {
        const httpOptions = { headers: this.headerSettings };
        return this.http.post<any>(this.UrlUserAppr + '/remove/', option, httpOptions).pipe(map(user => {
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            return user;
        }));
    }
    DeleteUser(question: User) {
        const httpOptions = { headers: this.headerSettings };
        return this.http.post<any>(this.Url + '/remove/', question, httpOptions).pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            sessionStorage.setItem('currentUser', JSON.stringify(user));

            return user;
        }));
    }

}
