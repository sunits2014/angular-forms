import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ModalTextService {

  public URL = "assets/modaltext.json";
  constructor(public _http: Http) { }

  public getModalText() {
    return this._http.get(this.URL).map(response => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
