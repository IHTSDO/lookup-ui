import {Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {AuthoringService} from "../authoring/authoring.service";
import {Subscription} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SnowstormService {

    private configuration: any;
    private configurationSubscription: Subscription;

    constructor(private http: HttpClient,
                private authoringService: AuthoringService) {
        this.configurationSubscription = this.authoringService.getUIConfiguration().subscribe(data => this.configuration = data);
    }

    getMultiSearchPath(id) {
        return this.http.get('/snowstorm/snomed-ct/multisearch/concepts?conceptIds=' + id);
    }

    getConcept(id, path) {
        return this.http.get('/snowstorm/snomed-ct/browser/' + path + '/concepts/' + id);
    }

    getChildren(id, path) {
        return this.http.get('/snowstorm/snomed-ct/browser/' + path + '/concepts/' + id + '/children');
    }

    getParents(id, path) {
        return this.http.get('/snowstorm/snomed-ct/browser/' + path + '/concepts/' + id + '/parents');
    }
}
