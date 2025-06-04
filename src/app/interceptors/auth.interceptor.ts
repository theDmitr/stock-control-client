import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth/auth.service";
import {Observable} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private readonly publicEndpoints = [
        '/auth/login',
        '/auth/refresh',
    ];

    constructor(private authService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.isPublicRequest(request.url)) {
            return next.handle(request);
        }

        const accessToken = this.authService.getAccessToken();
        if (accessToken) {
            request = this.addToken(request, accessToken);
        }

        return next.handle(request);
    }

    private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    private isPublicRequest(url: string): boolean {
        return this.publicEndpoints.some(endpoint => url.includes(endpoint));
    }
}