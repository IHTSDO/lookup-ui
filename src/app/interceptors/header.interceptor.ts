import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export const headerInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {

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

       return next(request);
};

