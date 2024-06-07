import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  recipes: any = [];
  newRecipe = {
    title: '',
    description: '',
    calories: 0,
    meal: ''
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Si deseas obtener todas las recetas al iniciar, descomenta la siguiente línea
    // this.loadAllRecipes();
  }

  // Método opcional para cargar todas las recetas al iniciar
  /*loadAllRecipes(): void {
    this.apiService.getAllRecipes().subscribe((recipes) => {
      this.recipes = recipes;
    });
  }*/

  createRecipe(): void {
    this.apiService.createRecipe(
      this.newRecipe.title,
      this.newRecipe.description,
      this.newRecipe.calories,
      this.newRecipe.meal
    ).subscribe((result: any) => {
      console.log(result);
      this.recipes.push(result);
      this.newRecipe = {
        title: '',
        description: '',
        calories: 0,
        meal: ''
      };
    });
  }
}
