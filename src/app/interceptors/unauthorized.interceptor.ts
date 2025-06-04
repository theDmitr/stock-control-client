import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { catchError, switchMap, filter, take, finalize } from 'rxjs/operators';
import {AuthService} from "../services/auth/auth.service";

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject = new BehaviorSubject<string | null>(null);

    constructor(private authService: AuthService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError(error => {
                if (
                    error instanceof HttpErrorResponse &&
                    error.status === 401 &&
                    !this.isPublicRequest(request.url)
                ) {
                    return this.handle401Error(request, next);
                }
                return throwError(error);
            })
        );
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.isRefreshing) {
            return this.refreshTokenSubject.pipe(
                filter(token => token !== null),
                take(1),
                switchMap(token => next.handle(this.addToken(request, token!)))
            );
        }

        this.isRefreshing = true;
        this.refreshTokenSubject.next(null);

        return this.authService.refresh().pipe(
            switchMap(response => {
                const newToken = response.accessToken;
                this.refreshTokenSubject.next(newToken);
                return next.handle(this.addToken(request, newToken));
            }),
            catchError(err => {
                this.authService.logout();
                return throwError(err);
            }),
            finalize(() => this.isRefreshing = false)
        );
    }

    private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    private isPublicRequest(url: string): boolean {
        return url.includes('/auth/refresh') || url.includes('/auth/login');
    }
}