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
  private jwtToken$ = new BehaviorSubject<string>(this.token);
  private API_URL = 'http://localhost:3000/api';

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

  /* Getting All Todos */
  getAllTodos(): Observable<any> {
    return this.http.get(`${this.API_URL}/todos`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  login(email: string, password: string) {
    this.http.post<{ token: string }>(`${this.API_URL}/auth/login`, { email, password })
      .subscribe((res) => {
        this.token = res.token;

        if (this.token) {
          this.toast.success('Login successful, redirecting now...', '', {
            timeOut: 700,
            positionClass: 'toast-top-center'
          }).onHidden.toPromise().then(() => {
            this.jwtToken$.next(this.token);
            localStorage.setItem('act', btoa(this.token));
            this.router.navigateByUrl('/').then();
          });
        }
      }, (err: HttpErrorResponse) => {
        this.toast.error('Login failed', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
        console.log(err.message);
      });
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
    return '';
  }

  createRecipe(title: string, description: string, calories: number, meal: string) {
    return this.http.post(`${this.API_URL}/todos`, { title, description,calories, meal }, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  updateStatus(statusValue: string, todoId: number) {
    return this.http.patch(`${this.API_URL}/todos/${todoId}`, { status: statusValue }, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    }).pipe(
      tap(res => {
        if (res) {
          this.toast.success('Status updated successfully', '', {
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

  register(username: string, email:string, password: string) {

    return this.http.post(`${this.API_URL}/auth/register`, {username, email, password}).pipe(
      // @ts-ignore
      catchError((err: HttpErrorResponse) => {
        this.toast.error(err.error.message, '', {
          timeOut: 1000
        });
      })
    );
  }
}

