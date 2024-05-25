import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];
  displayedColumns: string[] = ['title', 'description', 'calories', 'actions'];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getFavorites();
  }

  getFavorites(): void {
    this.apiService.getFavRecipes().subscribe((data: any[]) => {
      this.favorites = data;
    }, error => {
      console.error('Error fetching favorite recipes', error);
    });
  }
}
