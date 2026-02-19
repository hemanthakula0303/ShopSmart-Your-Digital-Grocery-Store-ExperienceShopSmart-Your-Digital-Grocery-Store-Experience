import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './orders.html'
})
export class Orders implements OnInit {

  orders: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    const token = localStorage.getItem('token');

    this.http.get<any[]>('http://localhost:5000/api/orders', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe(data => {
      this.orders = data;
    });
  }
}
