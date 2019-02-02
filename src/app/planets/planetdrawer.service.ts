import {ElementRef, Injectable, Input, Renderer2, ViewChild} from '@angular/core';
import {interval} from 'rxjs';
import {Planet, PlanetsService} from './planets.service';
import * as THREE from 'three/three-tdsloader';
import {Mesh} from 'three';
import {WebglService} from './webgl.service';

@Injectable({
  providedIn: 'root'
})
export class PlanetdrawerService {
  private animateObservable: any;
  private bodyViews: Array<Mesh> = [];
  private oldLength = 0;

  constructor(private webgl: WebglService,
              private planetsService: PlanetsService) {
  }

  createViews() {
    if (this.planetsService.planets.bodies.length !== this.oldLength) {
      this.bodyViews.forEach(body => this.webgl.deleteObject(body));
      this.bodyViews = this.planetsService.planets.bodies.map(body => this.webgl.makeSpere(body.x, body.y));
    }
  }

  animate() {
    this.animateObservable = interval(30).subscribe(
      () => {
        this.createViews();
        this.bodyViews.forEach((mesh, i) => {
            const body = this.planetsService.planets.bodies[i];
            mesh.position.set(body.x, body.y, mesh.position.z);
          }
        );
        this.webgl.render();
      }
    );
  }
}
