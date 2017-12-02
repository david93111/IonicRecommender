import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationServices {

    constructor(public http: Http) {

    }
    

}
