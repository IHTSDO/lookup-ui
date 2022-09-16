import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user';
import {Subject, Subscription} from 'rxjs';
import { AuthoringService } from '../authoring/authoring.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private user = new Subject<User>();
    private configuration: any;
    private configurationSubscription: Subscription;

    constructor(private http: HttpClient,
                private authoringService: AuthoringService) {
        this.configurationSubscription = this.authoringService.getUIConfiguration().subscribe(data => this.configuration = data);
    }

    setUser() {
        this.http.get<User>('/auth').subscribe(user => {
            this.user.next(user);
        });
    }

    getUser() {
        return this.user.asObservable();
    }

    logout() {
        window.location.href = this.configuration.endpoints.imsEndpoint + 'logout?serviceReferer=' + window.location.href;
    }
}
