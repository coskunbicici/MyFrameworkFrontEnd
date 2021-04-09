import { Component } from '@angular/core';

//* Attribute yapısı ile AppComponente Component özelliklerini yüklemiş oluyoruz
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'My Angular Project';
  user: string = "Coşkun Biçici";

}
