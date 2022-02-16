import { Injectable } from '@angular/core';
import { Turma } from '../Models/turma';
import { TurmaRepository } from '../Repository/turma.repository';

@Injectable({
  providedIn: 'root'
})
export class TurmaService {

  turma = {} as Turma;
  turmas!: Turma[];

  constructor(private turmaRepository: TurmaRepository) { }

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

}
