import { Component } from '@angular/core';
import { UserService } from '../services/User.service'
import { LoginService } from '../services/login.service'
import { User } from '../User';
import { QuickCodeService } from '../services/QuickCode.Services'
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { Router } from '@angular/router';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv'
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-NewQuestion',
  templateUrl: './user.component.html'

})
export class UserComponent {

  
  dtOptions: DataTables.Settings = {};

  submitted = false;

  PageTitle: string;
  data = false;
  UserForm: any;
  SuccessMassage: string;
  errorMessage: string;
  User_ID: string;
  enableEdit = false;
  enableEditIndex = null;
  ItemsArray = [];
  userGroup=[];
  UserStatus=[];
  p: number = 1;
  pagecount: number = 5;
  mode: string;
  SetCategory = [];
  UserSearchForm: FormGroup;
  //UserStatus: string = "A";
  User: User[] = [];
  editIndex: number = null;
  ItemsArrayExcel = [];

  //public UserStatus = [{ name: 'Active', value: 'A' }, { name: 'In-Active', value: 'I' }];

  // public SetCategory = [{ name: 'Cat1', value:'Cat1' }, { name: 'Cat2', value:'Cat2' }, { name: 'Cat3', value:'Cat3' }];

  // public CandidateUserGroup = [{ name: 'Admin' }, { name: 'Client' }]; 

  constructor(
    private datePipe: DatePipe, 
    private router: Router, 
    private UserService: UserService, 
    private QuickCodeService:QuickCodeService,
    private loginService: LoginService) {
  //  this.getUserStatus();
    this.PageTitle = "New User";
  }

  csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'User Report :',
    useBom: true,
    noDownload: false,
    headers: ["User Id","User No", "User Name","User SAP Code", "Status", "Created By", "Created Date", "Modify By", "Modifiy Date"]
  };


  get f() { return this.UserForm.controls; }
  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    this.ItemsArrayExcel = [];
    this.mode = "new";
    this.User_ID = sessionStorage.getItem("UserName");

    this.UserForm = new FormGroup({
      UserID: new FormControl(),
      UserName: new FormControl('', Validators.required),
      Password:  new FormControl('', Validators.required),
      UserGroup:  new FormControl('', Validators.required),
      Status: new FormControl('A', Validators.required),
      CreatedBy: new FormControl(this.User_ID),
      CreatedDate: new FormControl(),
      ModifiedBy: new FormControl(this.User_ID),
      ModifiedDate: new FormControl()
    });

    this.getUserGroup()
    this.getStatus();
    this.UserSearchForm = new FormGroup({

      SearchValue: new FormControl(''),
    });

    this.GetUser();
    this.UserForm.patchValue({
      Status: "A"

    });

  }

  onUserSearch() {

    this.UserSearchForm.get("SearchValue").valueChanges.subscribe(selectedValue => {
      selectedValue = selectedValue == "" ? null : selectedValue;
      this.getUserData(selectedValue)                           //latest value of firstname
    })

  }


  getUserData(selectedValue) {

    this.UserService.GetUsers(selectedValue).subscribe((result: any) => {

      if (result.status == "success") {
        result.data.forEach(element => {

          if (element.Status != null && element.Status == "A")
            element.Status = "Active"
          else if (element.Status != null && element.Status == "I")
            element.Status = "In-Active"
          if (element.CreatedDate != null)
            element.CreatedDate = this.datePipe.transform(element.CreatedDate, 'dd-MMM-yyyy');

          if (element.ModifiedDate != null)
            element.ModifiedDate = this.datePipe.transform(element.ModifiedDate, 'dd-MMM-yyyy');

        });

        this.ItemsArray = result.data;
        this.p = 1;
      }
      else {
        this.SuccessMassage = '';
        this.errorMessage = result.message;
      }
    })
  }


  onFormSubmit() {

    this.submitted = true;
    this.SuccessMassage = "";
    this.errorMessage = "";

    // stop here if form is invalid
    if (this.UserForm.invalid) {
      return;
    }

    const user = this.UserForm.value;
    this.CreateUser(user);

    this.submitted = false;
  }

  downloadCSV() {
    this.ItemsArrayExcel = this.ItemsArray;
    this.ItemsArrayExcel.forEach(item => delete item.RecID);

    const newData = JSON.parse(JSON.stringify(this.ItemsArrayExcel, (key, value) =>
      value === null || value === undefined
        ? ''    // return empty string for null or undefined
        : value // return everything else unchanged
    ));

    new AngularCsv(newData, "User Report", this.csvOptions);
    return false;
  }

  CreateUser(User: User) {

    this.UserForm.patchValue({
      CreatedBy: this.User_ID,
      ModifiedBy: this.User_ID,
    });

    //this.UserForm.controls['SetID'].enable();
    const user = this.UserForm.value;
    if (this.PageTitle == "New User") {
      this.UserService.CreateUser(user).subscribe((result) => {
        if (result.status == "success") {
          this.data = true;
          this.SuccessMassage = result.message;
          this.errorMessage = "";
          this.UserForm.reset();
          this.UserForm.patchValue({ Status: "A" });
          this.PageTitle = "New User";
          // this.errorMessage = "";
          this.mode = "new";
          this.GetUser();
        }
        else {
          this.SuccessMassage = '';
          this.errorMessage = result.message;
        }
      }, error => {
        this.data = true;
        // this.SuccessMassage = ""
        this.errorMessage = error.message;
      });
    }
    else {
      this.UserService.UpdateUser(user).subscribe((result) => {
        if (result.status == "success") {
          this.data = true;
          this.SuccessMassage = result.message;
          this.errorMessage = "";
          this.UserForm.reset();
          this.UserForm.patchValue({ Status: "A" });
          this.UserSearchForm.reset();
          this.PageTitle = "New User";
          // this.errorMessage = "";
          this.mode = "new";
          this.GetUser();
        }
        else {
          this.SuccessMassage = '';
          this.errorMessage = result.message;
        }
      }, error => {
        this.data = true;
        //this.SuccessMassage = "";
        this.errorMessage = error.message;
      });
    }

  }

  onBack() {
    this.router.navigate(['/AdminDashboard']);
  }

  GetUser() {
    this.UserService.GetUsers(null).subscribe((result: any) => {

      if (result.status == "success") {
        result.data.forEach(element => {

          if (element.Status != null && element.Status == "A")
            element.Status = "Active"
          else if (element.Status != null && element.Status == "I")
            element.Status = "In-Active"

          if (element.CreatedDate != null)
            element.CreatedDate = this.datePipe.transform(element.CreatedDate, 'dd-MMM-yyyy');

          if (element.ModifiedDate != null)
            element.ModifiedDate = this.datePipe.transform(element.ModifiedDate, 'dd-MMM-yyyy');
        });
        this.ItemsArray = result.data;
      }
      else {
        this.SuccessMassage = '';
        this.errorMessage = result.message;
      }

    })
  }


  onEditClick(event, index: number) {
    this.errorMessage = "";
    this.SuccessMassage = "";

    if (this.PageTitle == "Update User")
      this.errorMessage = "Page already in edit mode.";
    else {
      this.mode = "edit";
      this.ItemsArray[index].inedit = true;

      this.UserForm.patchValue({
        UserID: this.ItemsArray[index].UserId,
        UserName: this.ItemsArray[index].UserName,
        Password: this.ItemsArray[index].Password,
        UserGroup: this.ItemsArray[index].UserGroup,
        Status: this.ItemsArray[index].Status == "Active" ? "A" : "I",
        
      });

      this.PageTitle = "Update User";
    }
  }

  getUserGroup() {
    this.QuickCodeService.GetByType("USER_GROUP").subscribe((result: any) => {

      if (result.status == "success") {
        this.userGroup = result.data;
      }
      else {
        this.SuccessMassage = '';
        this.errorMessage = result.message;
      }

    })
  }
  getStatus() {
    this.QuickCodeService.GetByType("STATUS").subscribe((result: any) => {

      if (result.status == "success") {
        this.UserStatus = result.data;
      }
      else {
        this.SuccessMassage = '';
        this.errorMessage = result.message;
      }

    })
  }

  onCancelClick(index: number) {

    this.UserForm.reset();

    this.PageTitle = "New User";
    this.errorMessage = ""
    this.mode = "new";
    this.ItemsArray[index].inedit = false;
    this.UserForm.patchValue({
      Status: "A",
    });


  }


}
