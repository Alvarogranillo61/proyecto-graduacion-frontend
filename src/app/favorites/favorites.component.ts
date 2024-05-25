import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../services/api.service';

export interface FavoriteRecipe {
  title: string;
  description: string;
  calories: number;
}

@Component({
  selector: 'app-favorites',
  styleUrls: ['favorites.component.scss'],
  templateUrl: 'favorites.component.html',
  standalone: true,
  imports: [MatButtonModule, MatTableModule],
})
export class FavoritesComponent implements OnInit {
  displayedColumns: string[] = ['title', 'description', 'calories'];
  dataSource: FavoriteRecipe[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getFavorites();
  }

  getFavorites(): void {
    this.apiService.getFavRecipes().subscribe((data: FavoriteRecipe[]) => {
      this.dataSource = data;
    }, error => {
      console.error('Error fetching favorite recipes', error);
    });
  }
}
