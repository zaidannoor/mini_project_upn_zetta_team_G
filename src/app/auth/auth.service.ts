import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apollo: Apollo) {}

  loginUser(email: string, password: string): Observable<any> {
    return this.apollo
      .mutate({
        mutation: gql`
        mutation {
          Login(email: "${email}", password: "${password}") {
            token
          }
        }
      `,
      })
      .pipe(
        map((resp) => {
          this.userLogin(resp.data);
          return resp;
        })
      );
  }

  userLogin(data: any) {
    console.log(data);
    localStorage.setItem(
      environment.tokenKey,
      JSON.stringify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoiJDJiJDA1JEpzSmdqWERCeE16RHJEelQxU2J3T3VaRy5xWHQvbko3NURiaFJoTktFT3Fqc3VzMkZrNE1DIiwicm9sZSI6ImFkbWluIiwidXNlcl9pZCI6IjYzN2VkM2QyNWVjZmNmMmM5ZmZlYjYwZiIsImlhdCI6MTY2OTg4NzE1MiwiZXhwIjoxNjY5OTczNTUyfQ.BK49TlfDUqeN2JBuZsCVbTaqJys6gzIuAdPuE6-LzYU')
    );
  }

  logOut() {
    localStorage.removeItem(environment.tokenKey);
  }
}
