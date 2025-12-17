import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgbTypeaheadModule } from "@ng-bootstrap/ng-bootstrap";
import { provideToastr } from "ngx-toastr";
import { headerInterceptor } from "./interceptors/header.interceptor";
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
     providers: [
        provideZoneChangeDetection({eventCoalescing: true}),
        importProvidersFrom(BrowserModule, FormsModule, NgbTypeaheadModule),
        provideRouter(routes),
        provideHttpClient(withFetch(), withInterceptors([headerInterceptor])),
        provideToastr()
    ]
};