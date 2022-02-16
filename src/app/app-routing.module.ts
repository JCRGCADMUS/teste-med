import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EscolasComponent } from './Component/Escolas/Escolas.component';
import { TurmasComponent } from './Component/Turmas/Turmas.component';
const routes: Routes = [
  { path: '', redirectTo: '/Escolas', pathMatch: 'full' },
  { path: 'Escolas', component: EscolasComponent },
  { path: 'Turmas/:id', component: TurmasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
