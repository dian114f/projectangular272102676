import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import moment from 'moment';

declare const $: any;
declare const L: any;

@Component({
  selector: 'app-cuaca',
  standalone: true,
  imports: [Header, Sidebar, RouterModule, CommonModule],
  templateUrl: './cuaca.html',
  styles: [`
    #map { 
      height: 300px; 
      width: 100%; 
      border-radius: 8px; 
      margin-top: 15px; 
      z-index: 1;
      border: 1px solid #ddd;
    }
    .text-orange { color: #fd7e14 !important; }
    
    /* GAYA KARTU STANDAR */
    .card-weather { 
      border-radius: 15px; 
      box-shadow: 0 4px 15px rgba(0,0,0,0.1); 
      background-color: #ffffff;
      color: #333; /* Tulisan default hitam */
      max-width: 550px;
      margin: 0 auto;
    }

    /* PERBAIKAN UNTUK DARK MODE */
    :host-context(body.dark-mode) .card-weather {
      background-color: #343a40 !important; /* Background abu gelap */
      color: #ffffff !important; /* Tulisan dipaksa putih */
      border: 1px solid #4b545c;
    }

    :host-context(body.dark-mode) .card-weather .text-muted {
      color: #adb5bd !important; /* Text muted menjadi abu terang */
    }

    :host-context(body.dark-mode) #map {
      border: 1px solid #4b545c;
      filter: brightness(0.8) contrast(1.2); /* Sedikit menggelapkan peta agar senada */
    }
  `]
})
export class Cuaca implements AfterViewInit {
  private table1: any;
  private map: any;
  public currentWeather: any = null;
  public todayDate: string = "";
  private apiKey = '09453d494575f01b8459e60f1736227c';

  constructor(private renderer: Renderer2, private http: HttpClient) {
    this.renderer.removeClass(document.body, 'sidebar-open');
    this.renderer.addClass(document.body, 'sidebar-closed');
  }

  ngAfterViewInit(): void {
    this.initTable();
    this.getData('Jakarta');
  }

  initTable(): void {
    setTimeout(() => {
      this.table1 = $('#table1').DataTable({
        destroy: true,
        columnDefs: [
          { targets: 0, render: (data: any) => moment(data).format('YYYY-MM-DD HH:mm') + ' WIB' },
          { targets: 1, render: (data: any) => `<img src="${data}" />` },
          { targets: 2, render: (data: any) => `<strong>${data.split('|')[0]}</strong><br/>${data.split('|')[1]}` }
        ],
      });
    });
  }

  initMap(lat: number, lon: number, cityName: string): void {
    setTimeout(() => {
      if (this.map) { this.map.remove(); }
      this.map = L.map('map').setView([lat, lon], 12);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
      L.marker([lat, lon]).addTo(this.map).bindPopup(cityName).openPopup();
      setTimeout(() => { this.map.invalidateSize(); }, 200);
    }, 300);
  }

  getData(city: string): void {
    if (!city) return;
    this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`).subscribe({
      next: (res: any) => {
        this.currentWeather = res;
        this.todayDate = moment().format('MMM D, hh:mm a');
        this.initMap(res.coord.lat, res.coord.lon, res.name);
      }
    });

    this.http.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.apiKey}`).subscribe({
      next: (data: any) => {
        if (this.table1) {
          this.table1.clear();
          data.list.forEach((el: any) => {
            this.table1.row.add([
              el.dt_txt,
              `https://openweathermap.org/img/wn/${el.weather[0].icon}.png`,
              `${el.weather[0].main}|${el.weather[0].description}`,
              `${this.kelvinToCelcius(el.main.temp)}°C`
            ]);
          });
          this.table1.draw(false);
        }
      }
    });
  }

  kelvinToCelcius(k: number): number { return Math.round(k - 273.15); }

  handleEnter(event: any): void {
    const city = event?.target?.value?.trim();
    if (city) this.getData(city);
  }
}