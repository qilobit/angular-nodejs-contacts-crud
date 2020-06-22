import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllPokemonsComponent } from './components/all-pokemons/all-pokemons.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';


const routes: Routes = [
  { path: 'all-pokemons', component: AllPokemonsComponent, },
  { path: 'pokemon-detail/:id', component: PokemonDetailComponent, },
  { path: '**', redirectTo: 'all-pokemons' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
