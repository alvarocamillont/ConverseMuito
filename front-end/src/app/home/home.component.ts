import { Component, OnInit } from '@angular/core';
import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  logo = '/assets/imgs/logo.png';
  title = 'Converse Muito Simulation';
  menu!: Array<PoMenuItem>;

  constructor() {}
  // Teste
  ngOnInit(): void {
    this.setHomeInfo();
  }
  // Teste
  setHomeInfo(): void {
    this.menu = this.getMenus();
  }

  getMenus(): Array<PoMenuItem> {
    return [
      {
        label: 'Simulação',
        link: 'simulation',
      },
    ];
  }
}
