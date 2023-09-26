import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  //loading all the categories
  public categories(){
    return this.http.get(`${baseUrl}/category/`);
  }
  public addCategories(category){
    return this.http.post(`${baseUrl}/category/`,category);
  }

  public deleteCategory(categoryId:number){
    return this.http.delete(`${baseUrl}/category/${categoryId}`);
  }

  public updateCategory(category){
    return this.http.put(`${baseUrl}/category/`,category);
  }
}
