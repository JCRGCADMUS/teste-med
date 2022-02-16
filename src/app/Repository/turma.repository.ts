import { Escola } from '../Models/escola';

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Turma } from '../Models/turma';


@Injectable({
  providedIn: 'root'
})
export class TurmaRepository {

  url = 'http://localhost:3000/Turmas';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getAllTurmas(): Observable<Turma[]> {
    return this.httpClient.get<Turma[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError)
        )
  }

  getTurmasPorEscola(idEscola: number): Observable<Turma[]> {
    return this.httpClient.get<Turma[]>(this.url, {
      params:{
        idEscola,
      }
    })
      .pipe(
        retry(2),
        catchError(this.handleError)
        )
  }

  addTurma(turma: Turma): Observable<Turma>{
    return this.httpClient.post<Turma>(this.url, JSON.stringify(turma), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
      )
  }

  deleteTurma(id: number): Observable<Turma> {
    return this.httpClient.delete<Turma>(this.url + '/' + id )
      .pipe(
        retry(2),
        catchError(this.handleError)
        )
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
