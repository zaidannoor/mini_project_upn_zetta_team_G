import { Component, OnInit } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';
import { environment } from 'src/environments/environment';
import { MenuService } from '../menu.service'
import { CartService } from '../../cart/cart.service'

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
  constructor(private menuService: MenuService, private cartService: CartService) {
  }

  ngOnInit(): void {
    this.menuService.getAllMenu().subscribe((res) => {
      this.menus = res;
      console.log(this.menus);
    })

    // this.cartService.addToCart("6385bdd35ecfcf2c9ffeb6c3").subscribe((res) => {
    //   console.log(res);
    // })

    this.cartService.getAllTransaction().subscribe((res) => {
      console.log(res);
    })

    // this.menuService.getMenuById("6385babf5ecfcf2c9ffeb676").subscribe((res) => {
    //   console.log(res);
    // })
  }

  cek(event: any){
    this.cartService.addToCart(event.target.id).subscribe((res) => {
      console.log(res);
    })
    console.log(event.target.id);
  }
  
}