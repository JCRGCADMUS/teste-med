import { Injectable } from '@angular/core';
import { Escola } from '../Models/escola';
import { EscolaRepository } from '../Repository/escola.repository';

@Injectable({
  providedIn: 'root'
})
export class EscolaService {

escola: Escola | undefined;
escolas: Escola[] = [];

constructor(private escolaRepository: EscolaRepository) { }

getEscolas() {
  this.escolaRepository.getEscolas().subscribe((escolas: Escola[]) => {
    this.escolas = escolas;
  });
}

getEscola(nome: string){
  this.escolaRepository.getEscola(nome).subscribe((escolas: Escola[]) => {
    this.escolas = escolas;
  });

}
addEscola(escola: Escola){
  this.escolaRepository.addEscola(escola).subscribe((escola:Escola)=>{
    this.escola = escola
  })
}
}
