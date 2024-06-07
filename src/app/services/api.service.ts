import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private token = '';
  public jwtToken$ = new BehaviorSubject<string>(this.token);
  private API_URL = 'https://clownfish-app-fa9vg.ondigitalocean.app/api';
  private API = 'https://clownfish-app-fa9vg.ondigitalocean.app/api/auth';

  constructor(private http: HttpClient,
              private router: Router,
              private toast: ToastrService) {
    if (typeof window !== 'undefined' && window.localStorage) {
      const fetchedToken = localStorage.getItem('act');
      if (fetchedToken) {
        this.token = atob(fetchedToken);
        this.jwtToken$.next(this.token);
      }
    }
  }

  get jwtUserToken(): Observable<string> {
    return this.jwtToken$.asObservable();
  }

  getAllTodos(): Observable<any> {
    return this.http.get(`${this.API_URL}/todos`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.API_URL}/auth/login`, { email, password })
      .pipe(
        tap(response => {
          this.token = response.token;
          this.jwtToken$.next(this.token);
          localStorage.setItem('act', btoa(this.token));
        })
      );
  }

  logout() {
    this.token = '';
    this.jwtToken$.next(this.token);
    this.toast.success('Logged out successfully', '', {
      timeOut: 500
    }).onHidden.subscribe(() => {
      localStorage.removeItem('act');
      this.router.navigateByUrl('/login').then();
    });
  }

  createRecipe(title: string, description: string, calories: number, meal: string) {
    return this.http.post(`${this.API_URL}/todos`, { title, description, calories, meal }, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  updateFav(todoId: number, fav: number): Observable<any> {
    return this.http.patch(`${this.API_URL}/todos/${todoId}/fav`, { fav }, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    }).pipe(
      tap(res => {
        if (res) {
          this.toast.success('Favorite status updated successfully', '', {
            timeOut: 1000
          });
        }
      })
    );
  }

  deleteTodo(todoId: number) {
    return this.http.delete(`${this.API_URL}/todos/${todoId}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    }).pipe(
      tap(res => {
        if (res) {
          this.toast.success('Todo deleted successfully');
        }
      })
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    const payload = { username, email, password };
    return this.http.post(`${this.API}/register`, payload);
  }

  getFavRecipes(): Observable<any> {
    return this.http.get(`${this.API_URL}/todos/favorite`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  getRecipesByMealAndCalories(meal: string, calories: number): Observable<any> {
    return this.http.get(`${this.API_URL}/todos/meal/${meal}/calories/${calories}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }
}
