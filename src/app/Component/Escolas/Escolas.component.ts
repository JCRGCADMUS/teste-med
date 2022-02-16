import { Component, OnInit } from '@angular/core';
import { EscolaRepository } from 'src/app/Repository/escola.repository';
import { EscolaService } from 'src/app/Service/escola.service';
import { Escola } from './../../Models/escola';

@Component({
  selector: 'app-Escolas',
  templateUrl: './Escolas.component.html',
  styleUrls: ['./Escolas.component.scss']
})
export class EscolasComponent implements OnInit {

escola: Escola | undefined;
escolas: Escola[] = [];

headers = ["ID", "Nome", "Endereço", "capacidade","Turma", "Deletar"];

constructor(private escolaRepository: EscolaRepository) { }
ngOnInit() {
this.getEscolas();
}

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

deleteEscola(id: number){
  this.escolaRepository.deleteEscola(id).subscribe((escola:Escola)=>{
    this.escola = escola
  })
}


onClickDelete(id: number){
  this.deleteEscola(id);
  this.getEscolas();

}

onClickSubmit(escola: Escola) {
  this.addEscola(escola)
}

}
