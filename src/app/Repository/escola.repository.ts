import { Escola } from '../Models/escola';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class EscolaRepository {

url = 'http://localhost:3000/Escolas';

constructor(private httpClient: HttpClient) { }

httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

getEscolas(): Observable<Escola[]> {
  return this.httpClient.get<Escola[]>(this.url)
  .pipe(
    retry(2),
    catchError(this.handleError)
    )
}
getEscola(nome: string): Observable<Escola[]> {
  return this.httpClient.get<Escola[]>(this.url, {
    params:{
      nome
    }
  })
  .pipe(
    retry(2),
    catchError(this.handleError)
    )
}

addEscola(escola: Escola): Observable<Escola>{
  return this.httpClient.post<Escola>(this.url, JSON.stringify(escola), this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError)
    )
}

deleteEscola(id: number): Observable<Escola> {
  return this.httpClient.delete<Escola>(this.url + '/' + id )
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
