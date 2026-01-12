import { Component, Renderer2 } from '@angular/core';
import { Header } from "../header/header";
import { Sidebar } from "../sidebar/sidebar";
import { Content } from "../content/content";
import { Footer } from "../footer/footer";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [Header, Sidebar, Content, Footer, RouterModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {

  constructor(private renderer: Renderer2) {
    this.renderer.addClass(document.body, "sidebar-mini");
    this.renderer.addClass(document.body, "layout-fixed");
  }

}
