import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { ProductsService } from '../../shared/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: any;
  quantity = 1;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductsService, private firestore: AngularFirestore, private activatedRote: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.getProduct()
  }



  getProduct(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('prodID');
    this.firestore.collection('products').doc(id).ref.get().then((product) => {
      if (product.exists) {
        this.product = product.data()
        console.log(this.product);

      } else {
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }
  quantityIncrement(): void {
    if (this.quantity < 99)
      this.quantity++
  }
  quantityDecrement(): void {
    if (this.quantity > 1) {

      this.quantity--
    }

  }

}