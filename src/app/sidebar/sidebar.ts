import { Component, Input, input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar implements OnInit {
  @Input() modulName: string = "";
  username: string = "";

  constructor(private cookieService: CookieService, private router: Router) {}

  ngOnInit(): void {
    this.username = this.cookieService.get("userId");
  }

  // ✔ FIX ERROR: Tambahkan method ini karena dipanggil di sidebar.html
  toggleTheme() {
    document.body.classList.toggle('dark-mode');
  }
}
