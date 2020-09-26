import { Injectable } from '@angular/core';
import { SessionInteruptService, SessionTimerService } from 'session-expiration-alert'
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { observable } from 'rxjs';


@Injectable()
export class AppSessionInteruptService extends SessionInteruptService {
  constructor(private readonly httpClient: HttpClient, private router: Router,
    private LoginService: LoginService,

 
   // private sessionInterupter: SessionInteruptService,
    public sessionTimer: SessionTimerService
  ) {
    super();
  }
  continueSession() {
    console.log(`I issue an API request to server.`);
   // this.sessionInterupter.continueSession();
    this.sessionTimer.resetTimer();

  }
  stopSession() {
    console.log(`I logout.`);
    this.LoginService.logout();
    this.sessionTimer.stopTimer();

   // this.sessionInterupter.stopSession();
    this.router.navigate(['/login']);
  }
}
