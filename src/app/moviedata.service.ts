import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MoviedataService {

  constructor(public _http: Http) { }

  public movieURL = "https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&language=en-US&api_key=8ebc1de21c763057f4f48114ac4062cd";

  getMovieList() {
    return this._http.get(this.movieURL).map(response => response.json()).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
