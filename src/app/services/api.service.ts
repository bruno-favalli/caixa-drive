import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Veiculo } from '../models/veiculo.interface';
import { Usuario } from '../models/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private http = inject(HttpClient);

  
  getEstoque(): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>('assets/estoque.json').pipe(
      catchError(error => {
        console.error('Erro ao carregar estoque:', error);
        return of([]); 
      })
    );
  }

  
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>('assets/usuarios.json').pipe(
      catchError(error => {
        console.error('Erro ao carregar usuários:', error);
        return of([]);
      })
    );
  }
}