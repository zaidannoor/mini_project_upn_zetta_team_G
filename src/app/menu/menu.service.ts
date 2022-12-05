import { Injectable } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';

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

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private apollo: Apollo) { }
  getAllMenu(){
    return this.apollo.query<any>({query: Get_myData}).pipe(map(data => data.data['GetAllRecipes'].data_recipes ));
  }

  getMenuById(id : any){
    return this.apollo.query<any>({query: gql`
    query{
      GetOneRecipes(id: "${id}"){
        id
        recipe_name
        ingredients{
          ids{
            name
            stock
            status
          }
          stock_used
        }
        status
        description
        image
        price
      }
    }
    `
  }).pipe(map(data => data.data['GetOneRecipes']));
  }
}
