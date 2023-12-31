import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product';
import {catchError, pipe, tap, throwError} from "rxjs";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  http: any;
  products: unknown;
  refreshProducts() {
    throw new Error('Method not implemented.');
  }

  baseUrl = "https://ecom-backend-s4x8.onrender.com"
  // baseUrl = "http://localhost:8080"
  

  constructor(private httpClient: HttpClient) { }

  public addProduct1(productObject: any) {
    return this.httpClient.post<Product>(this.baseUrl + "/add", productObject);
  }

  public getProductById(pid:any){
    return this.httpClient.get<Product>(this.baseUrl + "/get/by/pid/"+ pid)
  }

  public getAllProduct(){
    return this.httpClient.get<Product[]>(this.baseUrl + "/all")
  }

  public updateProduct(pid:any){
    return this.httpClient.put<Product>(this.baseUrl + "/update/"+ pid, this.products)
  }

  public deleteProduct(pid: any) {
    return this.httpClient.delete(`${this.baseUrl}/delete/${pid}`)
      .pipe(
        catchError((error) => {
          console.error('Error deleting product:', error);
          return throwError(error);
        })
      );
  }

}
