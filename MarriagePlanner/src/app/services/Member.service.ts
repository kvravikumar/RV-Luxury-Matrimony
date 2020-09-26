import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment'



@Injectable({
    providedIn: 'root'
})
export class MemberService {

    private userLoggedIn = new Subject<boolean>();

    baseUrl = environment.baseUrl;
    headerAuthorization = environment.headerAuthorization;

    Url: string;
    token: string;
    header: any;
    router: Router
    headerSettings: { [name: string]: string | string[]; } = {};
    constructor(private http: HttpClient) {
       
        this.Url = this.baseUrl + 'Member';

        this.headerSettings['Authorization'] = 'Basic ' + btoa(this.headerAuthorization);
        this.headerSettings['Content-Type'] = 'application/json';
    }


    GetMember(SearchValue: string) {
        // debugger;
        const httpOptions = { headers: this.headerSettings };
        return this.http.post<any>(this.Url + '/getMember/' + SearchValue, "", httpOptions);
    }

    GetMemberListAll(Member: any) {
        // debugger;
        const httpOptions = { headers: this.headerSettings };
        return this.http.post<any>(this.Url + '/getMemberListAll/', Member, httpOptions);
    }

    GetMemberByID(id: string) {
        // debugger;
        const httpOptions = { headers: this.headerSettings };
        return this.http.post<any>(this.Url + '/getMemberid/' + id, "", httpOptions);
    }

  
    CreateMember(Member: any) {
        const httpOptions = { headers: this.headerSettings };
        return this.http.post<any>(this.Url + '/add/', Member, httpOptions).pipe(map(member => {
            // store Member details and jwt token in local storage to keep Member logged in between page refreshes
            // localStorage.setItem('currentMember', JSON.stringify(Member));

            return member;
        }));
    }

    UpdateMember(Member: any) {
        const httpOptions = { headers: this.headerSettings };
        return this.http.post<any>(this.Url + '/update/', Member, httpOptions).pipe(map(member => {
            // store Member details and jwt token in local storage to keep Member logged in between page refreshes
            return member;
        }));
    }
  
    DeleteMember(Member: any) {
        const httpOptions = { headers: this.headerSettings };
        return this.http.post<any>(this.Url + '/remove/', Member, httpOptions).pipe(map(member => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            return member;
        }));
    }

}
