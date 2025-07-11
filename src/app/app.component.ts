import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthoringService } from './services/authoring/authoring.service';
import { BranchingService } from './services/branching/branching.service';
import { ToastrService } from 'ngx-toastr';
import {StatusPageService} from './services/statusPage/status-page.service';
import {ModalService} from './services/modal/modal.service';
import { SnomedNavbarComponent } from './components/snomed-navbar/snomed-navbar.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import { SnomedFooterComponent } from './components/snomed-footer/snomed-footer.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [SnomedNavbarComponent, MainViewComponent, SnomedFooterComponent]
})
export class AppComponent implements OnInit {

    toastrConfig = {
        closeButton: true
    };

    versions: object;
    environment: string;
    scheduledAlerts: any[] = [];
    @ViewChild('favicon') input: ElementRef<HTMLInputElement>;

    constructor(private authoringService: AuthoringService,
                private branchingService: BranchingService,
                private toastr: ToastrService,
                private titleService: Title,
                private statusService: StatusPageService,
                private modalService: ModalService) {
    }

    ngOnInit() {
        this.titleService.setTitle('SNOMED CT Concept Lookup');
        this.environment = window.location.host.split(/[.]/)[0].split(/[-]/)[0];

        // this.authoringService.getVersions().subscribe(versions => {
        //     this.versions = versions;
        // });

        // this.authoringService.httpGetUIConfiguration().subscribe(config => {
        //     this.authoringService.setUIConfiguration(config);
        //     console.log('config: ', config);
        // });

        this.branchingService.setBranchPath('MAIN');
        this.assignFavicon();

        // this.checkSchedule();
        // setInterval(() => this.checkSchedule(), 60000);
    }

    checkSchedule() {
        this.statusService.getSchedule().subscribe(schedule => {
            this.calculateSchedule(schedule['scheduled_maintenances']);
        });
    }

    calculateSchedule(schedule) {
        const currentTime = new Date().getTime();

        schedule.forEach(item => {
            if (!this.scheduledAlerts.some(storedItem => storedItem.id === item.id)) {
                if (item.status === 'scheduled') {
                    this.toastr.info(item.incident_updates[0].body, 'NEW MAINTENANCE', this.toastrConfig);
                }
            }

            const scheduledTime = new Date(item.scheduled_for).getTime();

            if (this.schedule10minCheck(currentTime, scheduledTime)) {
                this.toastr.warning(item.incident_updates[0].body, '10 MINS', this.toastrConfig);
            }

            if (this.schedule5minCheck(currentTime, scheduledTime)) {
                this.toastr.warning(item.incident_updates[0].body, '5 MINS', this.toastrConfig);
            }

            if (this.schedule1minCheck(currentTime, scheduledTime)) {
                this.toastr.warning(item.incident_updates[0].body, '1 MIN', this.toastrConfig);
            }

            this.scheduledAlerts.forEach(storedAlert => {
                if (storedAlert.id === item.id) {
                    if (storedAlert.status === 'scheduled' && item.status === 'in_progress') {
                        this.toastr.info(item.incident_updates[0].body, 'MAINTENANCE STARTED', this.toastrConfig);
                    }

                    if (storedAlert.status !== 'completed' && item.status === 'completed') {
                        this.toastr.info(item.incident_updates[0].body, 'MAINTENANCE COMPLETE', this.toastrConfig);
                    }
                }
            });
        });

        // this.scheduledAlerts.forEach(storedAlert => {
        //     if (!schedule.some(item => item.id === storedAlert.id)) {
        //         this.toastr.info(storedAlert.incident_updates[0].body, 'CANCELLED', this.toastrConfig);
        //     }
        // });

        if (JSON.stringify(schedule) !== JSON.stringify(this.scheduledAlerts)) {
            this.scheduledAlerts = schedule;
        }
    }

    schedule10minCheck(currentTime, scheduledTime): boolean {
        return currentTime > (scheduledTime - 660000) && currentTime < (scheduledTime - 600000);
    }

    schedule5minCheck(currentTime, scheduledTime): boolean {
        return currentTime > (scheduledTime - 360000) && currentTime < (scheduledTime - 300000);
    }

    schedule1minCheck(currentTime, scheduledTime): boolean {
        return currentTime > (scheduledTime - 120000) && currentTime < (scheduledTime - 60000);
    }



    assignFavicon() {
        const favicon: HTMLLinkElement = document.querySelector('#favicon');

        switch (this.environment) {
            case 'local':
                favicon.href = 'favicon_grey.ico';
                break;
            case 'dev':
                favicon.href = 'favicon_red.ico';
                break;
            case 'uat':
                favicon.href = 'favicon_green.ico';
                break;
            case 'training':
                favicon.href = 'favicon_yellow.ico';
                break;
            default:
                favicon.href = 'favicon.ico';
                break;
        }
    }

    cloneObject(object): any {
        return JSON.parse(JSON.stringify(object));
    }
}
