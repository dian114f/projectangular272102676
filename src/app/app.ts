import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular272102676');

  constructor(private router: Router) {
    
    this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      const body = document.body;

      if (body.classList.contains('sidebar-open')) {
        body.classList.remove('sidebar-open');
      }

      document.querySelectorAll('.menu-open').forEach(menu => {
        menu.classList.remove('menu-open');
      });
    }
    });
  }
}
