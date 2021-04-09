import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productAddForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private productService: ProductService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createProductAddForm();
  }

  createProductAddForm() {
    this.productAddForm = this.formBuilder.group({
      productName: ["", Validators.required],
      unitPrice: ["", Validators.required],
      unitsInStock: ["", Validators.required],
      categoryId: ["", Validators.required]
    });
  }

  add() {
    if (this.productAddForm.valid) {
      let productModel = Object.assign({}, this.productAddForm.value);
      this.productService.add(productModel).subscribe(response => {
        console.log(response);
        if (response.success) {
          this.toastrService.success(response.message, "Başarılı");
        } else {
          this.toastrService.error(response.message, "Hatalı");
        }
      }, responseError => {
        console.log(responseError);
        
        if (responseError.error.ValidationErrors?.length > 0) {
          console.log(responseError.error.ValidationErrors);
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama Hatası");
          }

        }
        else if(responseError.error){
          this.toastrService.error(responseError.error.Message, "Hata");
        }

      });
    }
    else {
      this.toastrService.error("Form alanlarını doğru şekilde doldurunuz", "Dikkat");
    }
    //console.log(productModel);
  }

}
