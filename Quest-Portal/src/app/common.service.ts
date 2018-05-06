import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';




@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: Http) { }

  saveQuest(quest) {
    return this.http.post('http://localhost:8080/api/saveQuest/', quest)
      .map((response: Response) => response.json());
  }
  GetQuest() {
    return this.http.get('http://localhost:8080/api/getQuest/')
      .map((response: Response) => response.json());
  }
  deleteQuest(id) {
    return this.http.post('http://localhost:8080/api/deleteQuest/', {'id': id})
      .map((response: Response) => response.json());
  }

  saveTask(task) {
    return this.http.post('http://localhost:8080/api/saveTask/', task)
      .map((response: Response) => response.json());
  }
  GetTask() {
    return this.http.get('http://localhost:8080/api/getTask/')
      .map((response: Response) => response.json());
  }
  deleteTask(id) {
    return this.http.post('http://localhost:8080/api/deleteTask/', {'id': id})
      .map((response: Response) => response.json());
  }

  saveList(list) {
    return this.http.post('http://localhost:8080/api/saveList/', list)
      .map((response: Response) => response.json());
  }
  GetList() {
    return this.http.get('http://localhost:8080/api/getList/')
      .map((response: Response) => response.json());
  }
  deleteList(id) {
    return this.http.post('http://localhost:8080/api/deleteList/', {'id': id})
      .map((response: Response) => response.json());
  }

  saveItem(item) {
    return this.http.post('http://localhost:8080/api/saveItem/', item)
      .map((response: Response) => response.json());
  }
  GetItem() {
    return this.http.get('http://localhost:8080/api/getItem/')
      .map((response: Response) => response.json());
  }
  deleteItem(id) {
    return this.http.post('http://localhost:8080/api/deleteItem/', {'id': id})
      .map((response: Response) => response.json());
  }

  saveUser(user) {
    return this.http.post('http://localhost:8080/api/saveUser/', user)
      .map((response: Response) => response.json());
  }
  GetUser() {
    return this.http.get('http://localhost:8080/api/getUser/')
      .map((response: Response) => response.json());
  }
  deleteUser(id) {
    return this.http.post('http://localhost:8080/api/deleteUser/', {'id': id})
      .map((response: Response) => response.json());
  }

}
