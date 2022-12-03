import { Component, OnInit } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';
import { environment } from 'src/environments/environment';
import { MenuService } from '../menu.service'

interface menu {
  id: string;
  recipe_name: string;
  ingredients: number;
  description: string;
  status: string;
  image: string;
  price: number;
}

const Get_myData = gql`
  query {
    GetAllRecipes {
      data_recipes {
        id
        recipe_name
        ingredients{ids 
          {id 
            name 
            stock 
            status
          } 
          stock_used}
        description
        status
        image
        price
      }
    }
  }
`;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  menus: menu[] = [];
  // tes : any[] = [];
  constructor(private menuService: MenuService) {
  }

  ngOnInit(): void {
    this.menuService.getAllMenu().subscribe((res) => {
      this.menus = res;
      console.log(this.menus);
    })

    // this.menuService.getMenuById().subscribe((res) => {
    //   // tes = res;
    //   console.log(res);
    // })
  }
  
}