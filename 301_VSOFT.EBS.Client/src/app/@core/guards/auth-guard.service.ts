import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean | UrlTree {

    if (this.authService.isUserLoggedIn()) {
      const roles = route.data.roles as Array<string>;
      return (roles !== null && this.authService.userInRole(roles));
    }

    this.router.navigate(['anmelden'], {queryParams: {retUrl: state.url}});
    return false;
  }
}
