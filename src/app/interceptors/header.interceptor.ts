import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
    constructor() {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!request.headers.has('Content-Type')) {
            request = request.clone({
                headers: request.headers.set('Content-Type', 'application/json')
            });
        }

        // This is a hack, and needs to be fixed in Snowstorm - pduff
        if (request.url.includes('SNOMEDCT-AR') || request.url.includes('SNOMEDCT-UY')) {
            request = request.clone({
                headers: request.headers.set('Accept-Language', 'es,en')
            });
        }

        return next.handle(request);
    }
}
