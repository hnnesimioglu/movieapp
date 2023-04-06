import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((response: HttpErrorResponse) => {
                let message = "Hata Oluştu";

                if (!navigator.onLine) {
                    message = "check your internet connection";
                    return throwError(message);
                }

                if (response.error.error) {
                    if (response.status === 401) {
                        message = "you don't have permission";
                        console.log(message);
                        return throwError(message);
                    }
                }

                if (response.error) {
                    switch (response.error.error.message) {
                        case "EMAIL_EXISTS":
                            message = "mail is already registered";
                            break;
                        case "EMAIL_NOT_FOUND":
                            message = "email not found";
                            break;
                        case "INVALID_PASSWORD":
                            message = "invalid password";
                            break;
                    }
                }

                return throwError(message);
            }),
        );

    }

}