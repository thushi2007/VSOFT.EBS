import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route, UrlSegment} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {
  constructor(private router: Router,
              private authService: AuthService) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const roles = route.data?.roles as Array<string>;
    const isInRole = await this.authService.userInRole(roles);

    if (isInRole) {
      return isInRole;
    } else {
      await this.router.navigate(['anmelden'], {queryParams: {retUrl: state.url}});
      return false;
    }
  }

  async canLoad(route: Route, segments: UrlSegment[]): Promise<boolean> {
    const roles = route.data?.roles as Array<string>;
    return await this.authService.userInRole(roles);
  }
}
