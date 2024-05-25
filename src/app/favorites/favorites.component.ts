import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit, AfterViewInit {
  favorites: any[] = [];
  displayedColumns: string[] = ['title', 'description', 'calories', 'actions'];
  dataSource = new MatTableDataSource<any>();

  constructor(private apiService: ApiService, private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getFavorites();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getFavorites(): void {
    this.apiService.getFavRecipes().subscribe((data: any[]) => {
      this.favorites = data;
      this.dataSource.data = data;
    }, error => {
      console.error('Error fetching favorite recipes', error);
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
