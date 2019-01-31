import {Component, OnInit} from '@angular/core';
import {PlanetsService} from '../planets.service';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styles: []
})
export class PlanetsComponent implements OnInit {

  constructor(private planetsService: PlanetsService) {
  }

  ngOnInit() {
  }

  start() {
    this.planetsService.start();
  }

  stop() {
    this.planetsService.stop();
  }
}
