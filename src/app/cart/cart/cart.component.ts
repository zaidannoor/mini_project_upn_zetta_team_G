import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: 'Are you sure want to delete ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.deleteCart(event.target.id).subscribe((res) => {
          location.reload();
        })
        
      }
    })      
  }

  checkout(event: any){
    Swal.fire({
      title: 'Are you sure want to checkout ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.OrderNow(event.target.id).subscribe((res) => {
          this.router.navigate(['/menu']);
        })
        
      }
    })
        
  }

  nullCart(){
    return this.cartItems?.length ? false : true
  }

}
