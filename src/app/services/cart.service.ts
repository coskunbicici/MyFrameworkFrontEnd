import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from '../models/cartItem';
import { CartItems } from '../models/cartItems';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private toastrService: ToastrService) { }

  addToCart(product: Product) {
    let item = CartItems.find(c => c.product.productId === product.productId);
    if (item) {
      if (item.quantity < product.unitsInStock) {
        item.quantity += 1;
        this.toastrService.success(product.productName, 'Sepete eklendi');
      }
      else {
        this.toastrService.warning('Stok adedi geçilemez', 'Sepete eklenemedi');
      }

    }
    else {
      let cartItem = new CartItem();
      cartItem.product = product;
      cartItem.quantity = 1;
      this.toastrService.success(product.productName, 'Sepete eklendi');

      CartItems.push(cartItem);
    }
  }

  removeFromCart(product: Product) {
    let item = CartItems.find(c => c.product.productId === product.productId);
    if (item) {
      CartItems.splice(CartItems.indexOf(item), 1);
      this.toastrService.info('', 'Ürün sepetten silindi');
    }
  }

  list(): CartItem[] {
    return CartItems;
  }

}
