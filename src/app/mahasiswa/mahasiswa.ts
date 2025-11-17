import { AfterViewInit, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Header } from "../header/header";
import { Sidebar } from "../sidebar/sidebar";
import { Footer } from "../footer/footer";

declare const $: any;

@Component({
  selector: 'app-mahasiswa',
  standalone: true,
  imports: [Header, Sidebar, Footer],
  templateUrl: './mahasiswa.html',
  styleUrls: ['./mahasiswa.css']
})
export class Mahasiswa implements AfterViewInit {

  table1: any;

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    // beri delay agar HTML table benar-benar ter-render
    setTimeout(() => {

      // Inisialisasi DataTable TANPA render.html()
      this.table1 = $('#datatable-mahasiswa').DataTable({
        responsive: true,
        lengthChange: true,
        autoWidth: false
      });

      // load data dari API
      this.bindMahasiswa();
    }, 300);
  }

  bindMahasiswa(): void {
    this.http
      .get("https://stmikpontianak.cloud/011100862/tampilMahasiswa.php")
      .subscribe((data: any) => {

        this.table1.clear();

        data.forEach((mhs: any) => {

          const tempatTanggalLahir = `${mhs.TempatLahir}, ${mhs.TanggalLahir}`;

          const jenisKelaminFormatted = `
            ${mhs.JenisKelamin}
            ${
              mhs.JenisKelamin.toLowerCase() === 'perempuan'
                ? "<i class='fas fa-venus text-danger'></i>"
                : "<i class='fas fa-mars text-primary'></i>"
            }
          `;

          this.table1.row.add([
            mhs.NIM,
            mhs.Nama,
            jenisKelaminFormatted,
            tempatTanggalLahir,
            mhs.JP,
            mhs.Alamat,
            mhs.StatusNikah,
            mhs.TahunMasuk
          ]);
        });

        this.table1.draw();
      });
  }
}
