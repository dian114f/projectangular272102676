import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const otentikasiGuard: CanActivateFn = (route, state) => {
  console.log("Otentikasi dimulai");

  var userId = inject(CookieService).get("userId");
  console.log("userId : " + userId);

  // Diperbaiki tetapi tetap seperti struktur asli
  if (userId == null) {
    // Kosong → gagal
  } 
  else if (userId === undefined) {
    // undefined asli → gagal
  }
  else if (userId === "undefined") {
    // undefined dalam bentuk string → gagal
  }
  else if (userId == "") {
    // string kosong → gagal
  } 
  else {
    return true;  // Jika semua oke
  }

  inject(Router).navigate(["/login"]);
  return false;
};
