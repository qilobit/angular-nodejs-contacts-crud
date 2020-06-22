import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {
  public pokemon: Pokemon;
  public areas: any[] = [];
  public loadingAreas: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      if(params.id){
        const url = params.id;
        this.http.get(url)
        .subscribe((resp: any) => {
          
          this.pokemon = new Pokemon( resp );

          this.getLocationAreas(this.pokemon.location_area_encounters);

        }, (err) => {
          alert('Error getting pokemon :(');
          console.log(err);
        });
      }
    });
  }

  getLocationAreas(url: string){
    this.loadingAreas = true;
    this.http.get(url)
    .subscribe((areas: any) => {
      this.areas = areas;
      this.loadingAreas = false;
    }, (err) => {
      alert('Error getting location areas');
      this.loadingAreas = false;
    });
  }

}
