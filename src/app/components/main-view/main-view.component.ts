import {Component, OnInit} from '@angular/core';
import {SnowstormService} from "../../services/snowstorm/snowstorm.service";
import {BrowserService} from "../../services/browser/browser.service";
import {Location} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
    selector: 'app-main-view',
    templateUrl: './main-view.component.html',
    styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

    loading: boolean = false;
    textField: string;
    // textField: string = '318351000221106';
    path: string;
    concept: any;
    children: any;
    parents: any;

    config: any;

    constructor(private snowstorm: SnowstormService,
                private browser: BrowserService,
                private location: Location,
                private toastr: ToastrService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.browser.getConfig().subscribe(data => this.config = data);

        let path = this.location.path().replace('/', '');

        if (path) {
            this.searchConcept(path);
        }
    }

    searchConcept(id) {
        this.loading = true;
        this.concept = null;
        this.children = null;
        this.parents = null;

        this.snowstorm.getMultiSearchPath(id).subscribe(multi => {
            if (multi['items'].length) {
                this.path = multi['items'][0].branch;
                this.snowstorm.getConcept(id, this.path).subscribe(data => {
                    this.concept = data;
                    this.finishedLoading();
                });

                this.snowstorm.getChildren(id, this.path).subscribe(data => {
                    this.children = data;
                    this.finishedLoading();
                },
                error => {});

                this.snowstorm.getParents(id, this.path).subscribe(data => {
                    this.parents = data;
                    this.finishedLoading();
                },
                error => {});
            } else {
                this.loading = false;
                this.toastr.error('Cannot find concept. The concept may be in an extension or edition not hosted on <a href="https://browser.ihtsdotools.org/">this server</a>.', 'ERROR', {enableHtml: true});
            }
        });
    }

    finishedLoading() {
        if ((this.concept && this.children && this.parents) || (this.concept && this.concept.active === false)) {
            if (this.textField) {
                this.router.navigateByUrl('/' + this.textField);
            }
            this.loading = false;
        }
    }

    calculateTotalGroups(relationships): number {
        let total = 0;

        relationships.forEach(relationship => {
            if (relationship.groupId > total) {
                total = relationship.groupId;
            }
        });

        return total;
    }

    findFlag(id): string {
        return this.config?.countryIcons[id];
    }

    findEditionOrExtension(id): string {
        return this.config?.editionExtensionName[id];
    }

    counter(i: number) {
        return new Array(i);
    }

    browserLink() {
        // This is a hack, and needs to be fixed in Snowstorm - pduff
        if (this.path.includes('SNOMEDCT-AR') || this.path.includes('SNOMEDCT-UY')) {
            window.open('https://browser.ihtsdotools.org/?perspective=full&conceptId1=' + this.concept.conceptId + '&edition=' + this.path + '&languages=es,en', '_blank').focus();
        } else {
            window.open('https://browser.ihtsdotools.org/?perspective=full&conceptId1=' + this.concept.conceptId + '&edition=' + this.path, '_blank').focus();
        }
    }
}
