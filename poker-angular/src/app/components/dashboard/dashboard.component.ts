import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private userAuth: UserAuthService, private router: Router) { }

  ngOnInit(): void {
  }

  signOut(){
    this.userAuth.signOut();
    this.router.navigate(['/login']);
  }

}
