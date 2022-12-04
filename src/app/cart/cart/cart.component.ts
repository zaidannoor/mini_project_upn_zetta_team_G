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
  constructor(private cartService: CartService,
    private router: Router) { }

  ngOnInit(): void {
    this.cartService.getOrder().subscribe((res) => {
      this.carts = res;
      this.cartItems = res.menu
      this.total_price = res.total_price;
      this.orderId = res.id;
      console.log(this.carts);
      console.log(this.cartItems);
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

}
