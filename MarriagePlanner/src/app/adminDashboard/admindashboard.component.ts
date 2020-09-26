import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { EnquiryService } from '../services/Enquiry.service.';
import { QuickCodeService } from '../services/QuickCode.Services';

import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import { List } from 'linqts';
//import { Chart } from 'chart.js';
import { Chart, ChartOptions, ChartData } from 'chart.js';
import 'chartjs-plugin-datalabels';
import { Data } from '../models/Data';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
    selector: 'app-admindashboard',
    templateUrl: './admindashboard.component.html',
})
export class AdminDashboardComponent implements OnInit {

  submitted = false;
    UserForm: any;
    data: Data[];
    myPieChart:any;
    chartReservedbyCategory:any;
    chartSpendbyMonth:any;
    chartBudgetbyCategory:any;

    ReqTypeArray=[];
    Linechart = [];

    pieChart = [];
    pieChartAmtSpend = [];
    pieChartCategory = [];

   // chartReservedbyCategory = [];
    ReservedbyCategoryAmtSpend = [];
    ReservedbyCategoryCategory = [];

   // chartBudgetbyCategory = [];
    BudgetbyCategoryBudgetAmt = [];
    BudgetbyCategoryCategory = [];
    BudgetbyCategoryTotalspend = [];

   // chartSpendbyMonth = [];
    SpendbyMonthAmtSpend = [];
    SpendbyMonthMonth = [];





    Pagemode = 'ModeCandidates';

    // TotalRequestPendingApproval: number = 0;
    // TotalRequestApproval: number = 0;
    // TotalRequestRejected: number = 0;
    // TotalRequestCompleted: number = 0;
    // TotalCEOApproval: number = 0;
    // TotalFinanceApproval: number = 0;
    // TotalITApproval: number = 0;
    TotalBudgeted: number = 0;
    TotalUsed: number = 0;
    TotalReserved: number = 0;
    TotalAvailable: number = 0;

    p: number;
    model: any = {};
    SuccessMassage: string;
    errorMessage: string;
    User_ID: string = sessionStorage.getItem("UserID");
    dtOptions: DataTables.Settings = {};
    pagecount: number = 5;

    ItemsArray = [];
    ItemsArrayExcel = [];

    User_Group: string;
    DepartmentArray = [];
    CapexCategoryArray = [];
    YearArray = [];

    // public pieChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
    // public pieChartData = [120, 150, 180, 90];
    // public pieChartType = 'pie';


    constructor(
        private datePipe: DatePipe,
        private router: Router,
        private enquiryService: EnquiryService,
        private QuickCodeService: QuickCodeService,
    ) { }

    get f() {
      return this.UserForm.controls;
  }
    ngOnInit() {

       
        sessionStorage.setItem("ActivePage", 'Dashboard');
      
        Chart.defaults.global.defaultFontFamily = 'Verdana';
        this.UserForm = new FormGroup({
          Title: new FormControl('', Validators.required),
          FullName: new FormControl('', Validators.required),
          Gender: new FormControl('', Validators.required),
          Dob: new FormControl(),
          Email: new FormControl('',[Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
          Phone: new FormControl('', [Validators.required,Validators.pattern(/^[0-9]\d{9}$/)]),
          Status: new FormControl(),
          CreatedBy: new FormControl()
        });

        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 5,
            processing: true
        };

          
    }
   
   
    ResetValues() {
       
        this.TotalBudgeted= 0;
        this.TotalUsed= 0;
        this.TotalReserved= 0;
        this.TotalAvailable = 0;

        this.pieChart = [];
        this.pieChartAmtSpend = [];
        this.pieChartCategory = [];
    
      //  this.chartReservedbyCategory = [];
        this.ReservedbyCategoryAmtSpend = [];
        this.ReservedbyCategoryCategory = [];
    
      //  this.chartBudgetbyCategory = [];
        this.BudgetbyCategoryBudgetAmt = [];
        this.BudgetbyCategoryTotalspend = [];
        this.BudgetbyCategoryCategory = [];
    
        //this.chartSpendbyMonth = [];
        this.SpendbyMonthAmtSpend = [];
        this.SpendbyMonthMonth = [];
    }

    onFormSubmit() {

  
      this.submitted = true;
      this.SuccessMassage = "";
      this.errorMessage = "";
  
      // stop here if form is invalid
      if (this.UserForm.invalid) {
        return;
      }
  
      

      this.UserForm.patchValue({
        CreatedBy:"Admin",
        Status:"A"
      })
      const user = this.UserForm.value;
      this.CreateUser(user);
  
      this.submitted = false;
  
    }

    CreateUser(User: any) {

      //this.UserForm.controls['SetID'].enable();
      const user = this.UserForm.value;
        this.enquiryService.CreateEnquiry(user).subscribe((result) => {
          if (result.status == "success") {
            this.SuccessMassage = result.message;
            this.errorMessage = "";
           
          }
          else {
            this.SuccessMassage = '';
            this.errorMessage = result.message;
          }
        }, error => {
          // this.SuccessMassage = ""
          this.errorMessage = error.message;
        });
     
      }
      
  
}
   
