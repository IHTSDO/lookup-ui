import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgbTypeaheadModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastrModule } from "ngx-toastr";
import { AuthenticationService } from "./services/authentication/authentication.service";
import { AuthoringService } from "./services/authoring/authoring.service";
import { StatusPageService } from "./services/statusPage/status-page.service";
import { ModalService } from "./services/modal/modal.service";
import { PathingService } from "./services/pathing/pathing.service";
import { SnowstormService } from "./services/snowstorm/snowstorm.service";
import { HeaderInterceptor } from "./interceptors/header.interceptor";
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { provideRouter } from "@angular/router";
import { provideAnimations } from "@angular/platform-browser/animations";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
     providers: [
        importProvidersFrom(BrowserModule, FormsModule, NgbTypeaheadModule, ToastrModule.forRoot()),
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
        provideRouter(routes),
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations()
    ]
};