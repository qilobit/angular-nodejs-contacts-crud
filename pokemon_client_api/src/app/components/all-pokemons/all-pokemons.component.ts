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
  public nextUrl: string = '';
  public previousUrl: string = '';
  public loading: boolean;

  constructor(
    private httpService: HttpClient
  ) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  next(){
    this.getPokemons(this.nextUrl);
  }

  back(){
    this.getPokemons(this.previousUrl);
  }

  getPokemons(url: string = environment.baseApiUrl){
    this.loading = true;
    this.pokemons = [];
    this.httpService.get(url)
    .subscribe((response: any)=>{

      this.pokemons = response.results;
      this.nextUrl = response.next;
      this.previousUrl = response.previous;
      this.loading = false;

    }, (err) => {
      console.log('Err ',err);
      alert('Error al obtener pokemons');
      this.loading = false;
    });
  }

}
