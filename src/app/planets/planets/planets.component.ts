import {Component, OnInit} from '@angular/core';
import {PlanetsService} from '../planets.service';
import {PlanetdrawerService} from '../planetdrawer.service';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styles: []
})
export class PlanetsComponent implements OnInit {

  constructor(private planetsService: PlanetsService, private planetdrawerService: PlanetdrawerService) {
  }

  ngOnInit() {
  }

  start() {
    this.planetsService.start();
    this.planetdrawerService.animate();
  }

  stop() {
    this.planetsService.stop();
  }
}
