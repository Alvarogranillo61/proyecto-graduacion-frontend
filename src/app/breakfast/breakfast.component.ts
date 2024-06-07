import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon'; // Importa MatIconModule
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-breakfast',
  templateUrl: './breakfast.component.html',
  styleUrls: ['./breakfast.component.scss'],
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule, // Agrega MatIconModule a las importaciones
    FormsModule
  ]
})
export class BreakfastComponent {
  displayedColumns: string[] = ['title', 'description', 'calories', 'favorite'];
  dataSource: any[] = [];
  calories: number | undefined;

  constructor(private apiService: ApiService) {}

  getRecipes(): void {
    if (this.calories) {
      this.apiService.getRecipesByMealAndCalories('DES', this.calories).subscribe((data: any[]) => {
        this.dataSource = data;
      }, error => {
        console.error('Error fetching recipes', error);
      });
    } else {
      alert('Please enter a calorie value.');
    }
  }

  toggleFavorite(recipeId: number): void {
    const recipe = this.dataSource.find(r => r.id === recipeId);
    if (recipe) {
      const newFavStatus = recipe.favorite ? 0 : 1;
      this.apiService.updateFav(recipeId, newFavStatus).subscribe((updatedRecipe: any) => {
        recipe.favorite = newFavStatus;
      }, error => {
        console.error('Error updating favorite status', error);
      });
    }
  }
}
