import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "../../models/auth/login-request.model";
import {AuthResponse} from "../../models/auth/auth-response.model";
import {RefreshRequest} from "../../models/auth/refresh-request.model";
import {AuthUser} from "../../models/auth/auth-user.model";

@Injectable()
export class AuthService {
    private readonly SERVICE_URL = environment.AUTH_URL + '/auth';

    private accessToken: string | null = null;
    private authUser: AuthUser | null = null;

    constructor(private httpClient: HttpClient) {}

    login(loginRequest: LoginRequest): Observable<AuthResponse> {
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

    private saveTokens(response: AuthResponse): void {
        this.accessToken = response.accessToken;
    }

    private fetchCurrentAuthUser(): void {
        this.httpClient.get<AuthUser>(
            this.SERVICE_URL + '/user'
        ).subscribe(response => this.authUser = response);
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

    refresh(refreshRequest: RefreshRequest): Observable<AuthResponse> {
        return this.httpClient.post<AuthResponse>(
            `${this.SERVICE_URL}/refresh`,
            refreshRequest
            //todo
            // {},
            // { withCredentials: true }
        );
    }
}