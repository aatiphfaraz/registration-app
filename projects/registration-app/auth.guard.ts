import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '././src/app/_services/auth.service';
// import { AppComponent } from '././src/app/'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authservice: AuthService,
    private __router: Router) {}

    canActivate(): boolean{
      if(this._authservice.isAdmin()){
        return true;
      }
      else{
        return false;
      }
    }

  
}
