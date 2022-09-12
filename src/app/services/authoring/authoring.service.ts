import { Injectable } from '@angular/core';
import { UIConfiguration } from '../../models/uiConfiguration';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { Versions } from '../../models/versions';

@Injectable({
    providedIn: 'root'
})
export class AuthoringService {

    public environmentEndpoint: string;
    private uiConfiguration = new Subject<any>();

    constructor(private http: HttpClient) {
        this.environmentEndpoint = window.location.origin + '/';
    }

    setUIConfiguration(config) {
        this.uiConfiguration.next(config);
    }

    getUIConfiguration() {
        return this.uiConfiguration.asObservable();
    }

    httpGetUIConfiguration(): Observable<UIConfiguration> {
        return this.http.get<UIConfiguration>('https://dev-browser.ihtsdotools.org/authoring-services/ui-configuration');
    }

    getVersions(): Observable<Versions> {
        return this.http.get<Versions>('/config/versions.json');
    }
}
