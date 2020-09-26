import { Component, ViewChild, TemplateRef, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/User.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";




@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

  

    submitted = false;
    LoginCounter = new Date();
    model: any = {};
    logincounter: number = 0;
    errorMessage: string;
    angForm: FormGroup;



    constructor(
        private SpinnerService: NgxSpinnerService,
        private router: Router,
        private LoginService: LoginService,
        private UserService:UserService,
        private fb: FormBuilder) {
        this.createForm();

        if (this.LoginService.currentUserValue) {
            this.router.navigate(['/AdminDashboard']);
        }
    }

    get f() {
        return this.angForm.controls;
    }
    createForm() {
        this.angForm = this.fb.group({
            UserName: ['', [Validators.required, Validators.minLength(3)]],
            Passward: ['', [Validators.required, Validators.minLength(3)]]
        });
    }

    ngOnInit() {
        // sessionStorage.removeItem('UserName');
        sessionStorage.clear();

        // this.LoginService.connect().subscribe(
        //     result => {
        //     },
        //     error => {
        //         this.errorMessage = error.message;
        //     });
    }
    login() {
        this.submitted = true;
        //  debugger;
        this.SpinnerService.show();
        this.LoginService.Login(this.model).subscribe(
            result => {

                if (result.status == "success") {

                    this.LoginCounter = new Date();
                    this.UserService.setUserLoggedIn(true);
                    sessionStorage.setItem("LoginCounter", this.LoginCounter.toISOString());
                    sessionStorage.setItem("UserID", result.data[0].UserID);
                    sessionStorage.setItem("UserName", result.data[0].UserName);
                    sessionStorage.setItem("UserGroup", result.data[0].UserGroup);
                    
                    this.router.navigate(['/AdminDashboard']);

                    // if (result.data[0].UserGroup == "PREPARER")
                    //     this.router.navigate(['/RequestPreparer']);
                    // else
                    //     this.router.navigate(['/RequestOthers']);

                    this.submitted = false;
                }
                else {
                   
                    this.errorMessage = result.message;
                    this.submitted = false;
                }
                this.SpinnerService.hide();

            },
            error => {
                this.errorMessage = error.message;
                this.SpinnerService.hide();
              
            });
    };
   

}
