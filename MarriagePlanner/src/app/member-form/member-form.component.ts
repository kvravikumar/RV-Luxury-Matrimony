import { Component } from '@angular/core';
import { MemberService } from '../services/Member.service'
import { LoginService } from '../services/login.service'
import { User } from '../User';
import { List } from 'linqts';
import { QuickCodeService } from '../services/QuickCode.Services';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner"
import { Router ,ActivatedRoute, Params } from '@angular/router';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent {

  
  
  dtOptions: DataTables.Settings = {};

  submitted = false;
  UserPresent=[];
  UserStatus=[];
  ZodiacArray=[];
  CasteArray=[];
  ReligionArray=[];
  SexArray=[];
  PageTitle: string;
  data = false;
  UserForm: any;
  SuccessMassage: string;
  errorMessage: string;
  User_ID: string;
  ID:string;
  enableEdit = false;
  enableEditIndex = null;
  ItemsArray = [];
  MemberZodiac=[];
  MemberPresent=[];
  MemberHoroscope=[];
  MemberSex=[];
  MemberBloodGroup=[];
  SupplierStatus=[];
  BloodGroupArray=[];
  StarArray=[];
  p: number = 1;
  pagecount: number = 5;
  mode: string;
  SetCategory = [];
  UserSearchForm: FormGroup;
  //UserStatus: string = "A";
  User: User[] = [];
  editIndex: number = null;
  ItemsArrayExcel = [];

  constructor(
    private SpinnerService: NgxSpinnerService,
    private datePipe: DatePipe, 
    private router: Router,
    private activatedRoute: ActivatedRoute,
     private MemberService: MemberService,
     private QuickCodeService: QuickCodeService,
      private loginService: LoginService) {
    this.getStatus();
    this.getSex();
    this.getReligion();
    this.getCaste();
    this.getZodiac();
    this.getPresent();
    this.getBloodGroup();
    this.PageTitle = "New Member";
  }

  get f() { return this.UserForm.controls; }
  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    this.ItemsArrayExcel = [];
    this.mode = "new";
    this.User_ID = sessionStorage.getItem("UserID");

    this.UserForm = new FormGroup({
      Id: new FormControl(''),
      Name: new FormControl('', Validators.required),
      Sex: new FormControl('', Validators.required),
      Dob: new FormControl('', Validators.required),
      Height: new FormControl(),
      Weight: new FormControl(),
      Education: new FormControl(),
      Profession: new FormControl(),
      Religion: new FormControl(),
      Caste: new FormControl(),
      Place: new FormControl(),
      Phone1: new FormControl('', [Validators.required,Validators.pattern(/^[0-9]\d{9}$/)]),
      Phone2: new FormControl('',[Validators.pattern(/^[0-9]\d{9}$/)]),
      Email: new FormControl('',[Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      Address: new FormControl(),
      Pincode: new FormControl('',[Validators.pattern(/^[0-9]\d{5}$/)]),
      BloodGroup: new FormControl(),
      Zodiac: new FormControl(),
      Star: new FormControl(),
      FName: new FormControl(),
      FOccupation: new FormControl(),
      FPhone: new FormControl('',[Validators.pattern(/^[0-9]\d{9}$/)]),
      FPresent: new FormControl(),
      MName: new FormControl(),
      MOccupation: new FormControl(),
      MPhone: new FormControl('',[Validators.pattern(/^[0-9]\d{9}$/)]),
      MPresent: new FormControl(),
      Brothers: new FormControl(),
      BMarried: new FormControl(),
      Sisters: new FormControl(),
      SMarried: new FormControl(),
      Status: new FormControl('', Validators.required),
      CreatedBy: new FormControl(),
      CreatedDate: new FormControl(),
      ModifiedBy: new FormControl(),
      ModifiedDate: new FormControl(),
      Photo: new FormControl(),
      Horoscope: new FormControl(),
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.ID = params['ID'];
      if (this.ID == undefined) {
        this.PageTitle = "New Member";
        this.mode = "New";
        // this.controlButtons();
        // this.isButtonUpload = false;
      }
      else if (this.ID.length > 0) {

        this.GetMemberById(this.ID);
        // this.ButtonTitle = "Update";
         this.PageTitle = "Update Member";
        this.mode = "edit";
        this.SuccessMassage = '';
        this.errorMessage = "";
        this.enableEdit = false;

      }
      else {
        this.PageTitle = "New Member";
        this.mode = "New";
       // this.controlButtons();
       
      }
    });

  }

  GetMemberById(id) {
    this.SpinnerService.show();
    this.MemberService.GetMemberByID(id).subscribe((result: any) => {

      if (result.status == "success") {

        this.GetRequest(result.data);
        this.SpinnerService.hide();

      }
      else {
        this.SuccessMassage = '';
        this.errorMessage = result.message;
        this.SpinnerService.hide();
      }
      // this.SpinnerService.hide();
      // this.controlButtons();
    })
  }

  GetRequest(data: any) {

    this.ItemsArray = data;

    this.UserForm.patchValue({
      Id:  this.ItemsArray[0].Id,
      Name: this.ItemsArray[0].Name,
      Sex: this.ItemsArray[0].Sex,
      Dob: this.datePipe.transform(this.ItemsArray[0].Dob, "yyyy-MM-dd"),
      Height: this.ItemsArray[0].Height,
      Weight: this.ItemsArray[0].Weight,
      Education: this.ItemsArray[0].Education,
      Profession: this.ItemsArray[0].Profession,
      Religion: this.ItemsArray[0].Religion,
      Caste: this.ItemsArray[0].Caste,
      Place: this.ItemsArray[0].Place,
      Phone1:this.ItemsArray[0].Phone1,
      Phone2: this.ItemsArray[0].Phone2,
      Email: this.ItemsArray[0].Email,
      Address: this.ItemsArray[0].Address,
      Pincode: this.ItemsArray[0].Pincode,
      BloodGroup: this.ItemsArray[0].BloodGroup,
      Zodiac: this.ItemsArray[0].Zodiac,
      FName: this.ItemsArray[0].FName,
      FOccupation: this.ItemsArray[0].FOccupation,
      FPhone: this.ItemsArray[0].FPhone,
      FPresent: this.ItemsArray[0].FPresent,
      MName: this.ItemsArray[0].MName,
      MOccupation: this.ItemsArray[0].MOccupation,
      MPhone: this.ItemsArray[0].MPhone,
      MPresent: this.ItemsArray[0].MPresent,
      Brothers: this.ItemsArray[0].Brothers,
      BMarried: this.ItemsArray[0].BMarried,
      Sisters: this.ItemsArray[0].Sisters,
      SMarried: this.ItemsArray[0].SMarried,
      Status: this.ItemsArray[0].Status,
      CreatedBy: this.ItemsArray[0].CreatedBy,
      CreatedDate: this.ItemsArray[0].CreatedDate,
      ModifiedBy: this.ItemsArray[0].ModifiedBy,
      ModifiedDate: this.ItemsArray[0].ModifiedDate,
      Photo: this.ItemsArray[0].Photo,
      Horoscope: this.ItemsArray[0].Horoscope,
      
    
    });
  }

  getUserStatus() {

    return this.UserStatus;
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

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  CreateUser(User: User) {

    this.UserForm.patchValue({
      CreatedBy: this.User_ID,
      ModifiedBy: this.User_ID,
    });

    //this.UserForm.controls['SetID'].enable();
    const user = this.UserForm.value;
    if (this.PageTitle == "New Member") {
      this.SpinnerService.show();
      this.MemberService.CreateMember(user).subscribe((result) => {
        if (result.status == "success") {
          this.gotoTop();
          this.data = true;
          this.SuccessMassage = result.message;
          this.errorMessage = "";
          this.UserForm.reset();
          this.UserForm.patchValue({ Status: "A" });
          this.PageTitle = "New Member";
          // this.errorMessage = "";
          this.mode = "new";
         
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
      this.SpinnerService.hide();
    }
    else {
      this.MemberService.UpdateMember(user).subscribe((result) => {
        if (result.status == "success") {
          this.gotoTop();
          this.data = true;
          this.SuccessMassage = result.message;
          this.errorMessage = "";
          this.UserForm.reset();
          this.UserForm.patchValue({ Status: "A" });
          this.UserSearchForm.reset();
          this.PageTitle = "New Member";
          // this.errorMessage = "";
          this.mode = "new";
   
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

 

  getPresent() {
    this.QuickCodeService.GetByType("PRESENT").subscribe((result: any) => {

      if (result.status == "success") {
        this.UserPresent = result.data;
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
  getSex() {
    this.QuickCodeService.GetByType("SEX").subscribe((result: any) => {

      if (result.status == "success") {
        this.SexArray = result.data;
      }
      else {
        this.SuccessMassage = '';
        this.errorMessage = result.message;
      }

    })
  }

  getBloodGroup() {
    this.QuickCodeService.GetByType("BLOODGROUP").subscribe((result: any) => {

      if (result.status == "success") {
        this.BloodGroupArray = result.data;
      }
      else {
        this.SuccessMassage = '';
        this.errorMessage = result.message;
      }

    })
  }

  getStar(zodia:string) {
    this.QuickCodeService.GetByType("STAR").subscribe((result: any) => {

      if (result.status == "success") {
       const arr = new List<any>(result.data).Where(x => x.Remarks == this.UserForm.value.Zodiac)

        this.StarArray=arr.ToArray();
      }
      else {
        this.SuccessMassage = '';
        this.errorMessage = result.message;
      }

    })
  }

  getReligion() {
    this.QuickCodeService.GetByType("RELIGION").subscribe((result: any) => {

      if (result.status == "success") {
        this.ReligionArray = result.data;
      }
      else {
        this.SuccessMassage = '';
        this.errorMessage = result.message;
      }

    })
  }
  getCaste() {
    this.QuickCodeService.GetByType("CASTE").subscribe((result: any) => {

      if (result.status == "success") {
        this.CasteArray = result.data;
      }
      else {
        this.SuccessMassage = '';
        this.errorMessage = result.message;
      }

    })
  }
  getZodiac() {
    this.QuickCodeService.GetByType("Zodiac").subscribe((result: any) => {

      if (result.status == "success") {
        this.ZodiacArray = result.data;
      }
      else {
        this.SuccessMassage = '';
        this.errorMessage = result.message;
      }

    })
  }
  ChangeZodia()
  {
    this.getStar(this.UserForm.value.Zodiac);
  }
}
