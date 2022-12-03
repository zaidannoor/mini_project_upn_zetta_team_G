import { Injectable } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private apollo: Apollo) { }

  addToCart(id: any){
    return this.apollo.mutate<any>(
      {mutation: gql`
        mutation{
          addCart(
            input:{
              recipe_id: "${id}"
              amount: 1
              note: "dibungkus"
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
}
