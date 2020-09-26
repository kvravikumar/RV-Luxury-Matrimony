import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QuickCodeService } from '../services/QuickCode.Services';
import { UserService } from '../services/User.Service';
import { MemberService } from '../services/Member.service'
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner"
import { List } from 'linqts';

@Component({
  selector: 'app-member-search',
  templateUrl: './member-search.component.html',
  styleUrls: ['./member-search.component.css']
})
export class MemberSearchComponent implements OnInit {

  UserForm: any;
  User_ID: string;
  PageTitle: string;
  SuccessMassage: string;
  errorMessage: string;
  PageMode:string;
  ItemsArray = [];
  CapexCategoryArray = [];
  DepartmentArray = [];
  dtOptions: DataTables.Settings = {};
  ID: string
  p: number = 1;
  pagecount: number = 5;
  UserStatus=[];
  ZodiacArray=[];
  CasteArray=[];
  ReligionArray=[];
  SexArray=[];
  userRole=[]
  ItemsArrayExcel = [];
  ReqTypeArray = [];
  CostCentreArray=[];
  isOpen=false;
  isSubmitted=false;
  isOnApproval=false;
  isToBeApproved=false;
  isOnReview=false;
  isToBeReview=false;
  isAccept=false;
  isReject=false;
  isCompleted=false;
  isDownload = false;
  MemberType:string="";



  public Indicators = [{ name: 'Yes', value: 'Y' }, { name: 'No', value: 'N' }];

  constructor(
    private SpinnerService: NgxSpinnerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
   private memberService:MemberService,
    private QuickCodeService: QuickCodeService,
    private UserService:UserService,
    public datepipe: DatePipe
  ) {
    
   }
   csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Member Report :',
    useBom: true,
    noDownload: false,
    headers: [ "Member No"," Member Type", "Member Date", "Business Area","Cost Centre","Category", "Budget Indicator",  "Req Reason","Amount LC","Req Status"]
  };

    ngOnInit() {

      this.PageTitle="Member Search";

    this.UserForm = new FormGroup({
      Name: new FormControl(),
      Sex: new FormControl(),
      Religion: new FormControl(),
      Caste: new FormControl(),
      Phone: new FormControl(),
      Zodiac: new FormControl(),
      Status: new FormControl(),
    });

    this.User_ID = sessionStorage.getItem("UserName");

    this.getStatus();
    this.getSex();
    this.getReligion();
    this.getCaste();
    this.getZodiac();
   

    this.PageMode="ASSIGNED_OPEN";
    this.UserForm.patchValue({
      ReqStatus:this.PageMode,
      UserID:this.User_ID
    });

    var request=this.UserForm.value;
    this.GetMember(request);


    this.getREQType();

  }


  getREQType() {
    this.QuickCodeService.GetByType("REQ_TYPE").subscribe((result: any) => {

      if (result.status == "success") {
        this.ReqTypeArray = result.data;
      }
      else {
        this.SuccessMassage = '';
        this.errorMessage = result.message;
      }

    })
  }
 

  onFormSubmit(){}
  onSearch(){
    var request=this.UserForm.value;
    this.GetMember(request);

    
  }
  onBack() { 
    this.router.navigate(['/AdminDashboard']);
   }

  downloadCSV(){
    this.ItemsArrayExcel = this.ItemsArray;
  // this.ItemsArrayExcel.forEach(item => delete item.RecID);

for (let index = 0; index < this.ItemsArrayExcel.length; index++) {
  delete  this.ItemsArrayExcel[index].ReqID;
  delete  this.ItemsArrayExcel[index].ReqReasonTemp;

  this.ItemsArrayExcel[index].ReqDate= this.datepipe.transform(this.ItemsArrayExcel[index].ReqDate, 'dd/MM/yyyy')
  
}

    const newData = JSON.parse(JSON.stringify(this.ItemsArrayExcel, (key, value) =>
      value === null || value === undefined
        ? ''    // return empty string for null or undefined
        : value // return everything else unchanged
    ));

    new AngularCsv(newData, "Member Report", this.csvOptions);
    return false;
  }

  onOpenNew() {
    this.router.navigate(['/MemberForm'], { queryParams: { ID: this.ID }});
  }
  
 
  GetMember(request:any) {
    this.SpinnerService.show();
    this.p=1;
    this.memberService.GetMemberListAll(request).subscribe((result: any) => {

      if (result.status == "success") {

        result.data.forEach(element => {

          if (element.CAPEXAmtLC == null)
            element.CAPEXAmtLC = 0

        });
        this.ItemsArray = result.data;

        if (this.ItemsArray.length > 0)
          this.isDownload = true;
        else
          this.isDownload = false;
      }
      else {
        this.SuccessMassage = '';
        this.errorMessage = result.message;
      }
      this.SpinnerService.hide();

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

  onEditClick(event, indexNumber: number) {
  
    this.ID= this.ItemsArray[indexNumber].Id;
      
    this.router.navigate(['/MemberForm'], { queryParams: { ID: this.ID }});

  }
  
}
