import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '@app/services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public readonly loginFormGroup: FormGroup;
    error = '';
    returnUrl: string;
    loading = false;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                private authenticationService: AuthenticationService) {
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/dashboard']);
        }

        this.loginFormGroup = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
          });
    }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    }

    login() {
        this.loading = true;
        console.warn(this.loginFormGroup.value);
        this.authenticationService.login(this.loginFormGroup.get('username').value, this.loginFormGroup.get('password').value)
            .pipe(first())
            .subscribe(
                data => {
                    if (this.returnUrl === null || this.returnUrl === '/') {
                        this.router.navigate(['/dashboard']);
                    }
                    else {
                        this.router.navigate([this.returnUrl]);
                    }
                },
                error => {
                    this.loginFormGroup.controls.password.setValue('');
                    this.error = error;
                    this.loading = false;
                });
    }
}

