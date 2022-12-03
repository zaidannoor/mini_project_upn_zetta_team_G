import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'mini_project_upn_zetta_team_G';
  constructor(private router: Router) { }
  inHomePage(){
    return this.router.url === '/home' ? true : false;
  }
}
