import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public host: string = "https://localhost:8080";
  public token:string;
  public isAuthenticated: boolean;
  public userauthenticated;
  private users = [
    {username: "admin", password: "1234", roles: ['ADMIN', 'USER']},
    {username: "user1", password: "1234", roles: ['USER']},
    {username: "user2", password: "1234", roles: ['USER']}
  ]

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    let user;
    this.users.forEach(u => {
      if (u.username === username && u.password === password) {
        user = u;
        this.token = btoa(JSON.stringify({username: u.username, roles: u.roles}));
      }
    });
    if (user) {
      this.isAuthenticated = true;
      this.userauthenticated = user;
    } else {
      this.isAuthenticated = false;
      this.userauthenticated = undefined;
    }
  }

  public saveAuthenticatedUser() {
    if (this.userauthenticated) {
      localStorage.setItem('authToken', this.token);
    }
  }

  public loadAuthenticatedUserFromLocalStorage() {
    let t = localStorage.getItem('authToken');
    if (t) {
      let user = JSON.parse(atob(t));
      console.log(user);
      this.userauthenticated = {username:user.username, roles: user.roles};
      console.log(this.userauthenticated);
      this.isAuthenticated = true;
      this.token = t;
    }
  }
  public isAdmin() {
      if (this.userauthenticated) {
        if (this.userauthenticated.roles.indexOf("ADMIN") > -1)
        return true;
      }
      return false;
    }
    public removeTokenFromLocalStorage() {
    localStorage.removeItem('authToken');
    this.isAuthenticated = false;
    this.token=undefined;
    this.userauthenticated=undefined;
    }
  }
