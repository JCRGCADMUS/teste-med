import { Turma } from './../../Models/turma';
import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { TurmaService } from 'src/app/Service/turma.service';
import { TurmaRepository } from 'src/app/Repository/turma.repository';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-Turmas',
  templateUrl: './Turmas.component.html',
  styleUrls: ['./Turmas.component.scss']
})
export class TurmasComponent implements OnInit {

  turma = {} as Turma;
  turmas: Turma[] = [];
  idEscola = 0

  headers = ["ID", "periodo", "Capacidade"];

  constructor(private turmaRepository: TurmaRepository, private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.idEscola = Number(params['id']));
  }

  ngOnInit() {
    this.GetTurmasPorEscola(this.idEscola);
  }

  getTurmas() {
    this.turmaRepository.getAllTurmas().subscribe((turmas: Turma[]) => {
      this.turmas = turmas;
    });
  }

  GetTurmasPorEscola(idEscola:number){
    this.turmaRepository.getTurmasPorEscola(idEscola).subscribe((turmas:Turma[])=>{
      this.turmas = turmas
    })
  }

  addTurma(turma: Turma){
    this.turmaRepository.addTurma(turma).subscribe((turma:Turma)=>{
      this.turma = turma
    })
  }

  deleteTurma(id: number){
    this.turmaRepository.deleteTurma(id).subscribe((turma:Turma)=>{
      this.turma = turma
    })
  }

onClickSubmit(turma: Turma) {
  this.addTurma(turma);
  this.getTurmas();
}

onClickDelete(id: number){
  this.deleteTurma(id);
  this.getTurmas();

}


}
