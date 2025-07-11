import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgbTypeaheadModule } from "@ng-bootstrap/ng-bootstrap";
import { provideToastr } from "ngx-toastr";
import { AuthenticationService } from "./services/authentication/authentication.service";
import { AuthoringService } from "./services/authoring/authoring.service";
import { StatusPageService } from "./services/statusPage/status-page.service";
import { ModalService } from "./services/modal/modal.service";
import { PathingService } from "./services/pathing/pathing.service";
import { SnowstormService } from "./services/snowstorm/snowstorm.service";
import { headerInterceptor } from "./interceptors/header.interceptor";
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { provideRouter } from "@angular/router";
import { provideAnimations } from "@angular/platform-browser/animations";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
     providers: [
        importProvidersFrom(BrowserModule, FormsModule, NgbTypeaheadModule),
        AuthenticationService,
        AuthoringService,
        StatusPageService,
        ModalService,
        PathingService,
        SnowstormService,
        provideRouter(routes),
        provideHttpClient(withFetch(), withInterceptors([headerInterceptor])),
        provideAnimations(),
        provideToastr()
    ]
};