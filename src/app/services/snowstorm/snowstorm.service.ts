import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class SnowstormService {

    constructor(private http: HttpClient) {
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
