import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  carts: any;
  cartItems: any;
  total_price: any;
  orderId: any;
  loading: boolean = false;
  constructor(private cartService: CartService,
    private router: Router) { }

  ngOnInit(): void {
    this.loading = true
    this.cartService.getOrder().subscribe((res) => {
      if (res) {
        this.carts = res;
        this.cartItems = res.menu
        this.total_price = res.total_price;
        this.orderId = res.id;
        console.log(this.carts);
        console.log(this.cartItems);
        this.loading = false
      } else {
        this.cartItems = []
        this.loading = false
      }
    },(error) => {
      console.log(error.message)
      this.loading = false
    })
  }

  deleteCart(event: any){
    let isConfirm = confirm('Are you sure want to delete ? ')
    if (isConfirm) {
      this.cartService.deleteCart(event.target.id).subscribe((res) => {
      console.log(res);
      location.reload()
      })
    }
    
  }

  checkout(event: any){
    let isConfirm = confirm('Are you sure want to checkout ? ')
    if (isConfirm) {
        this.cartService.OrderNow(event.target.id).subscribe((res) => {
        console.log(res);
        console.log(event.target.id);
        this.router.navigate(['/menu']);
        })
    }
  }

  nullCart(){
    return this.cartItems?.length ? false : true
  }

}
