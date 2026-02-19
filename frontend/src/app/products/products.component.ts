import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, HttpClientModule],   // ✅ VERY IMPORTANT
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

  products: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getProducts();
  }

  // ✅ Get all products from backend
  getProducts(): void {
    this.http.get<any[]>('http://localhost:5000/api/products')
      .subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (err) => {
          console.error("Error loading products:", err);
        }
      });
  }

  // ✅ Add product to cart
  addToCart(productId: string): void {

    console.log("Clicked Product:", productId);

    const token = localStorage.getItem('token');

    if (!token) {
      alert("Please login first");
      return;
    }

    this.http.post('http://localhost:5000/api/cart',
      {
        productId: productId,
        quantity: 1
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).subscribe({
      next: () => {
        alert("✅ Product Added To Cart!");
      },
      error: (err) => {
        console.error("Cart Error:", err);
        alert("❌ Failed to add to cart");
      }
    });
  }
}
