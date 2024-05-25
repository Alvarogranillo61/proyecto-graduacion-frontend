import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  menuItems = [
    { label: 'Home', icon: 'home', link: '/home' },
    { label: 'Todos', icon: 'list', link: '/todos' },
    { label: 'Favorites', icon: 'favorite', link: '/' },
    // Añade más elementos del menú según sea necesario
  ];
}
