import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  baseUrl = environment.baseUrl;
  headerAuthorization = environment.headerAuthorization;

  Url: string;
  token: string;
  header: any;
  router: Router
  headerSettings: { [name: string]: string | string[]; } = {};
  constructor(private httpClient: HttpClient) {

    this.Url = this.baseUrl;
    //this.headerSettings['Authorization'] = 'Basic ' + btoa(this.headerAuthorization);
    //this.headerSettings['Content-Type'] = 'application/json';
  }

  upload(formData) {
    const httpOptions = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(this.headerAuthorization),
    });
    return this.httpClient.post<any>(this.Url + "request/UploadFile", formData, {
      reportProgress: true,
      observe: 'events',
      headers: httpOptions
    }).pipe(map((event) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: 'Progress ' + progress + '%' };

        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    })
    );
  }

  uploadTransfer(formData) {
    const httpOptions = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(this.headerAuthorization),
    });
    return this.httpClient.post<any>(this.Url + "transfer/UploadFile", formData, {
      reportProgress: true,
      observe: 'events',
      headers: httpOptions
    }).pipe(map((event) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: 'Progress ' + progress + '%' };

        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    })
    );
  }

  public downloadFile(ReqNo: number, SeqNo: number): Observable<Blob> {
    const headers = new HttpHeaders().set('content-type', 'multipart/form-data');

    const httpOptions = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(this.headerAuthorization),
      'content-type': 'multipart/form-data',
    });

    return this.httpClient.get(this.Url + "request/DownloadFile/" + ReqNo + "/" + SeqNo,
      { headers: httpOptions, responseType: 'blob' });
  }

  public downloadTransferFile(ReqNo: number, SeqNo: number): Observable<Blob> {
    const headers = new HttpHeaders().set('content-type', 'multipart/form-data');

    const httpOptions = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(this.headerAuthorization),
      'content-type': 'multipart/form-data',
    });

    return this.httpClient.get(this.Url + "transfer/DownloadFile/" + ReqNo + "/" + SeqNo,
      { headers: httpOptions, responseType: 'blob' });
  }
  public deleteTransferFile(ReqNo: number, SeqNo: number) {

    const httpOptons = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(this.headerAuthorization),
      'content-type': 'application/json',
    });
    return this.httpClient.post(this.Url + "transfer/DeleteFile/" + ReqNo + "/" + SeqNo, "",
      { headers: httpOptons });
  }
  public deleteFile(ReqNo: number, SeqNo: number) {

    const httpOptons = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(this.headerAuthorization),
      'content-type': 'application/json',
    });
    return this.httpClient.post(this.Url + "request/DeleteFile/" + ReqNo + "/" + SeqNo, "",
      { headers: httpOptons });
  }


  uploadDisposal(formData) {
    const httpOptions = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(this.headerAuthorization),
    });
    return this.httpClient.post<any>(this.Url + "disposal/UploadFile", formData, {
      reportProgress: true,
      observe: 'events',
      headers: httpOptions
    }).pipe(map((event) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: 'Progress ' + progress + '%' };

        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    })
    );
  }

  public downloadDisposalFile(ReqNo: number, SeqNo: number): Observable<Blob> {
    const headers = new HttpHeaders().set('content-type', 'multipart/form-data');

    const httpOptions = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(this.headerAuthorization),
      'content-type': 'multipart/form-data',
    });

    return this.httpClient.get(this.Url + "disposal/DownloadFile/" + ReqNo + "/" + SeqNo,
      { headers: httpOptions, responseType: 'blob' });
  }

  public deleteDisposalFile(ReqNo: number, SeqNo: number) {

    const httpOptons = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(this.headerAuthorization),
      'content-type': 'application/json',
    });
    return this.httpClient.post(this.Url + "disposal/DeleteFile/" + ReqNo + "/" + SeqNo, "",
      { headers: httpOptons });
  }
}
