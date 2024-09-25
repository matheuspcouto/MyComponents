import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SiteAtivoGuard } from './guards/site-ativo.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: AppComponent, canActivate: [SiteAtivoGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
