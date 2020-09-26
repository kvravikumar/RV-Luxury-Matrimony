import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { EnquiryService } from '../services/Enquiry.service'
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner"
import { List } from 'linqts';

@Component({
  selector: 'app-enquiry-search',
  templateUrl: './enquiry-search.component.html',
  styleUrls: ['./enquiry-search.component.css']
})
export class EnquirySearchComponent implements OnInit {

  UserForm: any;
  User_ID: string;
  PageTitle: string;
  SuccessMassage: string;
  errorMessage: string;
  PageMode: string;
  ItemsArray = [];
  CapexCategoryArray = [];
  DepartmentArray = [];
  dtOptions: DataTables.Settings = {};
  ID: string
  p: number = 1;
  pagecount: number = 5;
  UserStatus = [];
  ItemsArrayExcel = [];
  ReqTypeArray = [];
  CostCentreArray = [];
  isOpen = false;
  isDownload = false;
  
  public Indicators = [{ name: 'Yes', value: 'Y' }, { name: 'No', value: 'N' }];

  constructor(
    private SpinnerService: NgxSpinnerService,
    private router: Router,
    private enquiryService: EnquiryService,
    public datepipe: DatePipe
  ) {

  }
  csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Enquiry Report :',
    useBom: true,
    noDownload: false,
    headers: ["Enquiry Id", " Title", "Fullname", "Gender", "DOB", "Email", "Phone","User Group","Status", "Created By", "Created Date"]
  };

  ngOnInit() {

    this.PageTitle = "Enquiry Search";

    this.UserForm = new FormGroup({
      Title: new FormControl(),
      FullName: new FormControl(),
      Gender: new FormControl(),
      Email: new FormControl(),
      Phone: new FormControl(),
      
    });

    this.User_ID = sessionStorage.getItem("UserName");

    this.UserForm.patchValue({
      ReqStatus: this.PageMode,
      UserID: this.User_ID
    });

    var request = this.UserForm.value;
    this.GetEnquiry(request);
  }




  onFormSubmit() { }
  onSearch() {
    var request = this.UserForm.value;
    this.GetEnquiry(request);


  }
  onBack() {
    this.router.navigate(['/AdminDashboard']);
  }

  downloadCSV() {
    this.ItemsArrayExcel = this.ItemsArray;
    // this.ItemsArrayExcel.forEach(item => delete item.RecID);

    for (let index = 0; index < this.ItemsArrayExcel.length; index++) {
      delete this.ItemsArrayExcel[index].ReqID;
      delete this.ItemsArrayExcel[index].ReqReasonTemp;

      this.ItemsArrayExcel[index].ReqDate = this.datepipe.transform(this.ItemsArrayExcel[index].ReqDate, 'dd/MM/yyyy')

    }

    const newData = JSON.parse(JSON.stringify(this.ItemsArrayExcel, (key, value) =>
      value === null || value === undefined
        ? ''    // return empty string for null or undefined
        : value // return everything else unchanged
    ));

    new AngularCsv(newData, "Enquiry Report", this.csvOptions);
    return false;
  }

  GetEnquiry(Enquiry: any) {
    this.SpinnerService.show();
    this.p = 1;
    this.enquiryService.GetEnquiryListAll(Enquiry).subscribe((result: any) => {

      if (result.status == "success") {
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



}

