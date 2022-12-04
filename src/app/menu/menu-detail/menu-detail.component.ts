import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu-detail',
  templateUrl: './menu-detail.component.html',
  styleUrls: ['./menu-detail.component.css']
})
export class MenuDetailComponent implements OnInit {
  param: any;
  detailMenu: any;
  
  constructor(private menuService: MenuService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.param = this.route.snapshot.params['id'];
    this.menuService.getMenuById(this.param).subscribe((res) => {
      this.detailMenu = res
      console.log(this.detailMenu)
    })
  }

}
