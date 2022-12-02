import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): 
    Observable<boolean | UrlTree> 
    | Promise<boolean | UrlTree> 
    | boolean | UrlTree {
  
      const userToken = localStorage.getItem('token');

      if (userToken) {
        this.router.navigate(['/home']);
        return false
      } else {        
        return true
      }
    }
}