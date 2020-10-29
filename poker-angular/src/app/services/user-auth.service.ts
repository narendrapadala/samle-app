import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(){
    let token = localStorage.getItem('user');
    if(token)
      return true;

    this.router.navigate(['/login']);
    return false;
  }

  isSignedIn(){
    let token = localStorage.getItem('user');
    if(token)
      return true;

    return false;
  }

  signIn(user){
    localStorage.setItem('user', user);
  }

  signOut(){
    localStorage.removeItem('user');
  }
}
