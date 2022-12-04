import { Injectable } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private apollo: Apollo) { }

  addToCart(id: any, amount: number, note: string){
    return this.apollo.mutate<any>(
      {mutation: gql`
        mutation{
          addCart(
            input:{
              recipe_id: "${id}"
              amount: ${amount}
              note: "${note}"
            }
            
          ){
            id
            order_status
            order_date
            status
            total_price
          }
        }
      `
      }).pipe(map(data => data));
  }

  deleteCart(id: any){
    return this.apollo.mutate<any>(
      {mutation: gql`
        mutation{
          deleteCart(
            id: "${id}"
          ){
            id
            order_date
            status
            total_price
          }
        }
      `
      }).pipe(map(data => data.data['deleteCart']));
  }

  getAllTransaction(){
    return this.apollo.query<any>(
      {query: gql`
        query{
          GetAllTransactions{
            data {
              id
              status
              total_price
            }
          }
        }
      `
      }).pipe(map(data => data.data['GetAllTransactions'].data));
  }

  getOrder(){
    return this.apollo.query<any>(
      {query: gql`
        query{
          GetOrder {
            id
            menu{
              id
              recipe_id{
                id
                recipe_name
                price
              }
              amount
              note
            }
            total_price
          }
        }
      `
      }).pipe(map(data => data.data['GetOrder']));
  }

  OrderNow(id: any){
    return this.apollo.mutate<any>(
      {mutation: gql`
        mutation{
          OrderNow(
            id: "${id}"
          ){
            id
            user_id{
              email
            }
            menu{
              recipe_id{
                recipe_name
              }
              amount
            }
            order_date
            status
            total_price
          }
        }
      `
      }).pipe(map(data => data.data['OrderNow']));
  }
}
