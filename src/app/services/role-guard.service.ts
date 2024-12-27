import { routes } from './../app.routes';
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable()
export class RoleGuardService {
  constructor(private authService: AuthService, private router : Router ){}

  // canActivate(route:ActivatedRouteSnapshot ) : boolean {
  //       const userRole =  this.authService.getRole();
  // }
}


