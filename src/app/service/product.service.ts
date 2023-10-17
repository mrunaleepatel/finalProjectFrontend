import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product';
import {catchError, pipe, throwError} from "rxjs";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://spring-budgetbazaar-env.eba-k2c9g4qc.us-east-2.elasticbeanstalk.com/"

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

  updateProduct(product: Product) {
    return this.httpClient.put<Product>(this.baseUrl + "/update", product);

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
