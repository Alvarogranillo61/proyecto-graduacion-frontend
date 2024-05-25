import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-breakfast',
  templateUrl: './breakfast.component.html',
  styleUrls: ['./breakfast.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule]
})
export class BreakfastComponent {
  displayedColumns: string[] = ['title', 'description', 'calories'];
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
}
