import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './cart.html'
})
export class Cart implements OnInit {

  cartItems: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCart();
  }

  // Load cart items
  loadCart(): void {
    const token = localStorage.getItem('token');

    this.http.get<any[]>('http://localhost:5000/api/cart', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe(data => {
      this.cartItems = data;
    });
  }

  // Remove item
  removeItem(id: string): void {
    const token = localStorage.getItem('token');

    this.http.delete(`http://localhost:5000/api/cart/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe(() => {
      alert("Item Removed");
      this.loadCart();
    });
  }

  // ✅ PLACE ORDER FUNCTION (ADD THIS)
  placeOrder(): void {

    const token = localStorage.getItem('token');

    this.http.post('http://localhost:5000/api/orders', {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe(() => {
      alert("Order Placed Successfully!");
      this.loadCart();  // cart becomes empty
    });
  }
}
