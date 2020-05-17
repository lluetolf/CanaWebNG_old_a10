import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AuthenticationService } from '@app/services'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router, 
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService  ) { 
    if (this.authenticationService.currentUserValue) { 
        this.router.navigate(['/']);
    }
}

  logoutUser() {
    this.authenticationService.logout()
    this.router.navigate(['/login']);
  }
}
