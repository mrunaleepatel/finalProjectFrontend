import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../service/product.service';
import {Observable, Subscriber} from 'rxjs';
import {Product} from "../model/product";


export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.css']
})
export class RegisterProductComponent implements OnInit {
  productForm: FormGroup;
  productObj: Product = new Product();
  file = [];
  image: string = '';
  base64code: string = '';

  constructor(private _snackBar: MatSnackBar, private productService: ProductService) {
    this.productForm = new FormGroup({
      pcategory: new FormControl('', [Validators.required]),
      pname: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      pcoin: new FormControl('', [Validators.required]),
      pcity: new FormControl('', [Validators.required]),
      image: new FormControl(null, Validators.required),
    });
  }

  ngOnInit() {
    // Initialize any required data or settings when the component is initialized.
  }

  // handleFileInput(files: FileList) {
  //   this.prepareFilesList(files);
  // }
  //
  // prepareFilesList(files: FileList) {
  //   // @ts-ignore
  //   for (const item of files) {
  //     item.progress = 0; // Assuming the 'progress' property exists on the 'File' type
  //     // @ts-ignore
  //     this.file.push(item);
  //   }
  //   this.uploadFilesSimulator(0);
  // }
  //
  // uploadFilesSimulator(index: number) {
  //   setTimeout(() => {
  //     if (index === this.file.length) {
  //       return;
  //     } else {
  //       const progressInterval = setInterval(() => {
  //         // @ts-ignore
  //         if (this.file[index].progress === 100) {
  //           clearInterval(progressInterval);
  //           this.uploadFilesSimulator(index + 1);
  //         } else {
  //           // @ts-ignore
  //           this.file[index].progress += 5;
  //         }
  //       }, 200);
  //     }
  //   }, 1000);
  // }


  onClickSubmitForm() {
    if (this.productForm.valid) {
      this.productObj = {
        pcategory: this.productForm.value.pcategory,
        pname: this.productForm.value.pname,
        description: this.productForm.value.description,
        pcity: this.productForm.value.pcity,
        pcoin: this.productForm.value.pcoin,
        image: this.base64code,
      };

      this.productService.addProduct1(this.productObj).subscribe((data) => {
        console.log(data);
        // To reset the form
        this.productForm.reset();
      });
    } else {
      this.popup('Input error', 'Retry');
    }
  }

  popup(var1: string, var2: string) {
    this._snackBar.open(var1, var2, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  myImage: string | undefined;

  onChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.convertToBase64(file);
  }

  convertToBase64(file: File) {
    const observable = new Observable<string>((subscriber) => {
      this.readFile(file, subscriber);
    });

    observable.subscribe((base64Data) => {
      this.myImage = base64Data;
      this.base64code = base64Data;
    });
  }

  readFile(file: File, subscriber: Subscriber<string>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      subscriber.next(filereader.result as string);
      subscriber.complete();
    };
    filereader.onerror = () => {
      subscriber.error();
      subscriber.complete();
    };
  }
}
