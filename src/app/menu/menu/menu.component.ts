import { Component, OnInit } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuService } from '../menu.service'
import { CartService } from '../../cart/cart.service'
import { SubSink } from 'subsink';

interface Menu {
  id: string;
  recipe_name: string;
  ingredients: number;
  description: string;
  status: string;
  image: string;
  price: number;
}

interface Order{
  id: string,
  amount: number,
  note: string
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  private subs = new SubSink();
  menus: Menu[] = [];
  cartForm: FormGroup = this.initFormGroup();

  constructor(private menuService: MenuService, 
    private cartService: CartService,
    private fb: FormBuilder
    ) {
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
  }

  initFormGroup() {
    return this.fb.group({
      amount: [1],
      note: ['-'],
    });
  }

  add(event: any){
    const order: Order = this.cartForm.value;
    this.subs.sink = this.cartService
      .addToCart(event.target.id, order.amount, order.note)
      .subscribe((resp) => {
        console.log(resp);
      });
    // this.cartService.addToCart(event.target.id).subscribe((res) => {
    //   console.log(res);
    // })
    console.log(event.target.id);
  }
  
}