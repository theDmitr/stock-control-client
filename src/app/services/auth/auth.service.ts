import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Observable, tap, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "../../models/auth/login-request.model";
import {AuthResponse} from "../../models/auth/auth-response.model";
import {AuthUser} from "../../models/auth/auth-user.model";
import {StorageService} from "../storage/storage.service";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";

@Injectable()
export class AuthService {
    private readonly SERVICE_URL = environment.AUTH_URL + '/auth';
    private readonly REFRESH_TOKEN_KEY = 'refreshToken';

    private accessToken: string | null = null;
    private authUser: AuthUser | null = null;

    constructor(private httpClient: HttpClient,
                private storageService: StorageService,
                private router: Router) {}

    public initAuth() {
        const refreshToken = this.storageService.getItem<string>(this.REFRESH_TOKEN_KEY);
        if (refreshToken) {
            this.refresh().subscribe();
        }
    }

    public login(loginRequest: LoginRequest): Observable<AuthResponse> {
        return this.httpClient.post<AuthResponse>(
            `${this.SERVICE_URL}/login`,
            loginRequest
        ).pipe(
            tap(response => {
                this.saveTokens(response);
                this.fetchCurrentAuthUser();
            })
        );
    }

    public refresh(): Observable<AuthResponse> {
        const refreshToken = this.storageService.getItem<string>(this.REFRESH_TOKEN_KEY);

        if (!refreshToken) {
            this.logout();
            return throwError(() => 'No refresh token');
        }

        return this.httpClient.post<AuthResponse>(
            `${this.SERVICE_URL}/refresh`,
            { refreshToken }
        ).pipe(
            tap(response => {
                this.saveTokens(response);
                this.fetchCurrentAuthUser();
            }),
            catchError(error => {
                this.logout();
                return throwError(error);
            })
        );
    }

    private saveTokens(response: AuthResponse): void {
        this.accessToken = response.accessToken;
        this.storageService.setItem(this.REFRESH_TOKEN_KEY, response.refreshToken);
    }

    private fetchCurrentAuthUser(): void {
        this.httpClient.get<AuthUser>(
            this.SERVICE_URL + '/user'
        ).subscribe(response => this.authUser = response);
    }

    public logout() {
        this.clearAuthData();
        this.redirectToLogin();
    }

    private clearAuthData() {
        this.accessToken = null;
        this.authUser = null;
        this.storageService.removeItem(this.REFRESH_TOKEN_KEY);
    }

    private redirectToLogin() {
        this.router.navigate(['/login']);
    }

    getAccessToken(): string | null {
        return this.accessToken;
    }

    getAuthUser(): AuthUser | null {
        return this.authUser;
    }

    isAuthenticated(): boolean {
        return this.authUser !== null;
    }
}