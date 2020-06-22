
export class Pokemon{
  public id: string;
  public height: number;
  public weight: number;
  public name: string;
  public base_experience: number;
  public abilities: any[];
  public location_area_encounters: string;

  constructor(rawData: any){
    this.id = rawData.id;
    this.height = rawData.height;
    this.weight = rawData.weight;
    this.name = rawData.name;
    this.base_experience = rawData.base_experience;
    this.abilities = rawData.abilities || [];
    this.location_area_encounters = rawData.location_area_encounters;
  }
}