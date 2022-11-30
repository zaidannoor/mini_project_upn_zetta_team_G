import { Component, OnInit } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';
interface menu {
  id: string;
  name: string;
  stock: number;
  status: string;
  
}

const Get_myData = gql`
  query {
    GetAllIngredients {
      data {
        id
        name
        stock
        status
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
  alldata: menu[] = [];
  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery<any>({
        query: Get_myData,
      })
      .valueChanges.subscribe((response) => {
        console.log(response);
        if (response) {
          this.alldata = response.data.GetAllIngredients.data;
          console.log(this.alldata);
        }
      });
  }
}