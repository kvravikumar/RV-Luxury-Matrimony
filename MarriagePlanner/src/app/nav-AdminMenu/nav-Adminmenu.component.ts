import { Component, OnInit, ViewChild, NgModule, TemplateRef } from '@angular/core';
import { LoginService } from '../services/login.service';
import { RouterModule, Router } from '@angular/router';
import { Candidate } from "src/app/candidate";
import { SessionTimerService } from 'session-expiration-alert';
import { UserService } from 'src/app/services/User.service';


@Component({
    selector: 'app-nav-Adminmenu',
    templateUrl: './nav-Adminmenu.component.html',
    styleUrls: ['./nav-Adminmenu.component.css']
})
export class NavAdminMenuComponent {

    alertAt = 180;
    startTimer = true;
 
    date = new Date('2019-01-26T00:00:00');
    currentUser: Candidate;
    CandidateArray = [];

    ActivePage = ""
    DashboardMenuActive = ""

    constructor(

        public sessionTimer: SessionTimerService,
        private router: Router,
        private LoginService: LoginService,
        private UserService: UserService
    ) {
        this.LoginService.currentUser.subscribe(x => this.currentUser = x);

        
    }

    userTypeAdmin: boolean;
    userTypeClient: boolean;

    LoginCounter: string = sessionStorage.getItem("LoginCounter");
    User_ID: string = sessionStorage.getItem("UserName");
    User_Name: string = sessionStorage.getItem("UserName");
    UserGroup: string = sessionStorage.getItem("User_Group");


    
    ngOnInit() {

        this.UserGroup = sessionStorage.getItem("UserGroup")==null?"LOGIN": sessionStorage.getItem("UserGroup");
        this.ActivePage = sessionStorage.getItem("ActivePage");
        this.ClearActiveMenus();

        if (this.ActivePage == "Dashboard")
            this.DashboardMenuActive = "active";


        // if (this.LoginService.currentUserValue == null)
        //     this.logout();
        // else {
        // }

    }

    OnHome() {

    }

    logout() {
        this.LoginService.logout();
        this.router.navigate(['/Login']);
    }
    ClearActiveMenus() {

        this.DashboardMenuActive = "";

    }
}
