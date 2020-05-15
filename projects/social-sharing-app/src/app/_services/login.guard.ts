import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private tokenStorageService: TokenStorageService,
    private __router: Router
  ) {}

  canActivate(): boolean {
    if (!!this.tokenStorageService.getToken()) {
      return true;
    } else {
      return false;
    }
  }
}
