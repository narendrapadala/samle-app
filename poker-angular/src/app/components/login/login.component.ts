import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackService } from 'src/app/services/back.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    'email': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required)
  })

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

  constructor(private userAuth: UserAuthService, private back: BackService, private route: ActivatedRoute, private router: Router) {
    if (this.userAuth.isSignedIn()) { 
        this.router.navigate(['/dashboard']);
    }
   }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      let token = params['token'];
      if(token){
        this.userAuth.signIn(JSON.stringify({'accessToken': token}));
        this.router.navigate(['/dashboard']);
      }
  });
  }

  login(){
    this.loginForm.markAllAsTouched();
    if(this.loginForm.valid){
      this.back.login(this.loginForm.value).subscribe(user=>{
        console.log(user);
        this.userAuth.signIn(JSON.stringify(user));
        
        this.router.navigate(['/dashboard']);
      },
      err=>{
        console.log('error');
        alert("Invalid username and/or password");
        this.loginForm.reset();
      }
      );
    }
  }

}
