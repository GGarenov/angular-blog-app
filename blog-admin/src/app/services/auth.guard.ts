import { Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
constructor (private authService: AuthService) {}

export const authGuard: CanActivateFn = (route, state) => {
  

  return true;
  
};
