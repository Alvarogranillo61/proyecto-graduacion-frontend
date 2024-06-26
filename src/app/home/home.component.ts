import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { ApiService } from '../services/api.service';
import { RecipesComponent } from '../recipes/recipes.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  todos: any = [];
  filteredTodos: any[] = [{ title: 'Test', description: 'Test description', status: 'OPEN' }];

  constructor(private apiService: ApiService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    /* this.apiService.getAllTodos().subscribe((todos) => {
       this.todos = todos;
       this.filteredTodos = this.todos;
     })*/
  }

  filterChanged(ev: MatSelectChange): void {
    const value = ev.value;
    this.filteredTodos = this.todos;
    if (value) {
      this.filteredTodos = this.filteredTodos.filter(t => t.status === value);
      console.log(this.filteredTodos);
    } else {
      this.filteredTodos = this.todos;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RecipesComponent, {
      width: '500px',
      hasBackdrop: true,
      role: 'dialog',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe(data => {
      /*this.apiService.createTodo(data.title, data.description).subscribe((result: any) => {
        console.log(result);
        this.todos.push(result);
        this.filteredTodos = this.todos;
      })*/
    });
  }

  statusChanged(ev: MatSelectChange, todoId: number, index: number): void {
    const value = ev.value;
    /*this.apiService.updateStatus(value, taskId).subscribe(todo => {
      this.todos[index] = todo;
      this.filteredTodos = this.todos;
    });*/
  }

  delete(id: number): void {
    if (confirm('Do you want to remove the Todo?')) {
      /*this.apiService.deleteTodo(id).subscribe(res => {
        if (res.success) {
          this.todos = this.todos.filter((t: any) => t.id !== id);
          this.filteredTodos = this.todos;
        }
      });*/
    }
  }
}
