import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-all-pokemons',
  templateUrl: './all-pokemons.component.html',
  styleUrls: ['./all-pokemons.component.css']
})
export class AllPokemonsComponent implements OnInit {

  public pokemons: any[] = [];

  constructor(
    private httpService: HttpClient
  ) { }

  ngOnInit(): void {

    this.httpService.get(environment.baseApiUrl)
    .subscribe((response: any)=>{

      this.pokemons = response.results;

    }, (err) => {
      console.log('Err ',err);
      alert('Error al obtener pokemons');
    });
  }

}
