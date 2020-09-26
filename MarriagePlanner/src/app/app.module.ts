import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { DatePipe, DecimalPipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CountdownTimerModule } from 'ngx-countdown-timer';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { NgxMaskModule, IConfig } from 'ngx-mask'


import { AppComponent } from './app.component';
import { NavAdminMenuComponent } from './nav-AdminMenu/nav-Adminmenu.component'
import { AdminDashboardComponent } from './adminDashboard/admindashboard.component';
import { LoginComponent } from './Login/login.component';



import { NavLoginMenuComponent } from './nav-login-menu/nav-login-menu.component';
import { QuickCodeComponent } from './quick-code/quick-code.component';
import { NavFooterComponent } from './nav-footer/nav-footer.component';



import { UserComponent } from './user/user.component';




import {
  SessionExpirationAlert,
  SessionInteruptService,
} from 'session-expiration-alert';
import { AppSessionInteruptService } from './services/app-session-interupt.service';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { MemberSearchComponent } from './member-search/member-search.component';
import { MemberFormComponent } from './member-form/member-form.component';
import { EnquirySearchComponent } from './enquiry-search/enquiry-search.component'

export const options: Partial<IConfig> = {
  thousandSeparator: "'"
};

@NgModule({
  declarations: [
    AppComponent,
    NavAdminMenuComponent,
    AdminDashboardComponent,
    LoginComponent,

    NavLoginMenuComponent,
    QuickCodeComponent,
    NavFooterComponent,
    UserComponent,
    AboutUsComponent,
    ContactUsComponent,
    MemberSearchComponent,
    MemberFormComponent,
    EnquirySearchComponent


  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    DataTablesModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    FormsModule, ReactiveFormsModule, NgxPaginationModule,
    CountdownTimerModule.forRoot(),
    SessionExpirationAlert.forRoot({ totalMinutes: 20 }),
    NgxMaskModule.forRoot(options),
    RouterModule.forRoot([
      { path: '', component: AdminDashboardComponent, pathMatch: 'full' },
      { path: 'Login', component: LoginComponent },
      { path: 'AdminDashboard', component: AdminDashboardComponent },
      { path: 'AboutUs', component: AboutUsComponent },
      { path: 'QuickCode', component: QuickCodeComponent },
      { path: 'User', component: UserComponent },
      { path: 'ContactUs', component: ContactUsComponent },
      { path: 'MemberForm', component: MemberFormComponent },
      { path: 'MemberSearch', component: MemberSearchComponent },
      { path: 'EnquirySearch', component: EnquirySearchComponent },

    ])
  ],
  providers: [AdminDashboardComponent, DatePipe, DecimalPipe, NgxSpinnerModule, [
    {
      provide: SessionInteruptService,
      useClass: AppSessionInteruptService
    }
  ]],
  bootstrap: [AppComponent]
})
export class AppModule {

}
