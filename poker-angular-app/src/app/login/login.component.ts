﻿import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '@app/_services';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    queryParam: string = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) { 
        // redirect to home if already logged in
        
        // if (this.authenticationService.currentUserValue) { 
        //     this.router.navigate(['/']);
        // }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.route.queryParams.subscribe(params => {
            this.queryParam = params['token'];
            console.log(this.queryParam);
        });
          

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }


    test(){
        // console.log("test function called");
        // this.authenticationService.loginx("naredra@narendra.com","narendra").pipe(first())
        // .pipe(first())
        // .subscribe(
        //     data => {
        //         console.log("data called");
        //         console.log(data);
        //     },
        //     error => {
        //         console.log("error called");
        //         console.log(error);
        //     });
    }



    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            // .pipe(first())
            .subscribe(
                data => {
                    console.log(data);
                    localStorage.setItem('currentUser', JSON.stringify(data));
                    // this.authenticationService.setUser(data);
                    this.loading=false;
                    // this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }
}
