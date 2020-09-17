import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { AuthenticationService } from '@app/services';

const TOKEN_HEADER_KEY = 'x-access-token';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to the api url
    const currentUser = this.authenticationService.currentUserValue;
    const isLoggedIn = currentUser && currentUser.token;
    const isApiUrl = request.url.startsWith(environment.apiBaseUri);

    if (isLoggedIn && isApiUrl) {
      const headers = new HttpHeaders({
        'x-access-token': currentUser.token,
        'Content-Type': 'application/json'
      });
      const cloneReq = request.clone({headers});
      return next.handle(cloneReq);
    }

    return next.handle(request);
  }
}
