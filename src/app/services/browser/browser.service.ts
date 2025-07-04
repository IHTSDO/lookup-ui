import {Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class BrowserService {

    constructor(private http: HttpClient) {
    }

    getConfig() {
        return this.http.get('/assets/config.json');
    }
}
