import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from './interceptors/header.interceptor';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { SnomedNavbarComponent } from './components/snomed-navbar/snomed-navbar.component';
import { SnomedFooterComponent } from './components/snomed-footer/snomed-footer.component';
import { AuthenticationService } from './services/authentication/authentication.service';
import { AuthoringService } from './services/authoring/authoring.service';
import {ToastrModule} from 'ngx-toastr';
import {StatusPageService} from './services/statusPage/status-page.service';
import {PathingService} from './services/pathing/pathing.service';
import {AlphabeticalPipe} from './pipes/alphabetical/alphabetical.pipe';
import {BranchPipe} from './pipes/branch/branch.pipe';
import {ProjectPipe} from './pipes/project/project.pipe';
import {AppRoutingModule} from './app-routing.module';
import {ModalService} from './services/modal/modal.service';
import {ModalComponent} from './components/modal/modal.component';
import {TextFilterPipe} from './pipes/text-filter/text-filter.pipe';
import { MainViewComponent } from './components/main-view/main-view.component';
import {EditorModule, TINYMCE_SCRIPT_SRC} from "@tinymce/tinymce-angular";
import {SnowstormService} from "./services/snowstorm/snowstorm.service";
import { GroupPipe } from './pipes/group/group.pipe';
import {DescriptionPipe} from "./pipes/description/description";
import { UngroupPipe } from './pipes/ungroup/ungroup.pipe';

// SERVICE IMPORTS


@NgModule({
    declarations: [
        AppComponent,
        SnomedNavbarComponent,
        SnomedFooterComponent,
        AlphabeticalPipe,
        BranchPipe,
        ProjectPipe,
        ModalComponent,
        TextFilterPipe,
        MainViewComponent,
        DescriptionPipe,
        GroupPipe,
        UngroupPipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NgbTypeaheadModule,
        AppRoutingModule,
        ToastrModule.forRoot(),
        EditorModule
    ],
    providers: [
        AuthenticationService,
        AuthoringService,
        StatusPageService,
        ModalService,
        PathingService,
        SnowstormService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HeaderInterceptor,
            multi: true
        },
        {
            provide: TINYMCE_SCRIPT_SRC,
            useValue: 'tinymce/tinymce.min.js'
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
