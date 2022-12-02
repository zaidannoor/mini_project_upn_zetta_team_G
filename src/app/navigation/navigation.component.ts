import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  isHidden = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toggleButton(element : any){
    this.isHidden = !this.isHidden;
  }

  isAuthed(){
    return localStorage.getItem("token") ? true : false;
  }

  logout(){
    localStorage.removeItem("token");
    this.router.navigate(['/home']);
  }

}
