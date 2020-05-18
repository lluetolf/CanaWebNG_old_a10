import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { first } from 'rxjs/operators'

import { AuthenticationService } from '@app/services'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    error = ''
    username: string
    password: string
    returnUrl: string
    loading = false;

    constructor(private router: Router, 
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService  ) { 
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/dashboard']);
        }
    }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.authenticationService.login(this.username, this.password)
            .pipe(first())
            .subscribe(
                data => {
                    if(this.returnUrl === null || this.returnUrl === '/')
                        this.router.navigate(['/dashboard']);
                    else
                        this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }
}

