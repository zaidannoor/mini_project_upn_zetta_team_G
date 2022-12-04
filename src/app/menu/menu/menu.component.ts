import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuService } from '../menu.service'
import { CartService } from '../../cart/cart.service'
import { SubSink } from 'subsink';
import Swal from 'sweetalert2'

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
  loading: boolean = false;

  constructor(private menuService: MenuService, 
    private cartService: CartService,
    private fb: FormBuilder,
    ) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.menuService.getAllMenu().subscribe((res) => {
      this.menus = res;
      console.log(this.menus);
      this.loading = false;
    })
    
    
  }

  initFormGroup() {
    return this.fb.group({
      amount: [1],
      note: [''],
    });
  }

  add(event: any){
    const order: Order = this.cartForm.value;
    this.subs.sink = this.cartService
      .addToCart(event.target.id, order.amount, order.note)
      .subscribe((resp) => {
          Swal.fire(
            'Good job!',
            'Your product has been added to cart',
            'success'
          )
      }, (error) => {
        Swal.fire(
          'Oops!',
          `${error.message}`,
          'error'
        )
        console.log(error.message)
      });
  }
  
}