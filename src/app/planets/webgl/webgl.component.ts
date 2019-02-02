import {AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {WebglService} from '../webgl.service';
import * as THREE from 'three';
import {Planet} from '../planets.service';
import {interval} from 'rxjs';
import {Mesh} from 'three';

@Component({
  selector: 'app-webgl',
  templateUrl: './webgl.component.html',
  styles: []
})
export class WebglComponent implements AfterViewInit {
  @Input() public bodies: Array<Planet>;
  @ViewChild('container') canvasContainer: ElementRef;
  private line: THREE.Line;
  private animateObservable: any;
  private bodyViews: Mesh[];

  constructor(private webgl: WebglService,
              private renderer2: Renderer2) {
  }

  ngAfterViewInit(): void {
    this.webgl.init(this.canvasContainer, this.renderer2);
    this.webgl.addControls();
    this.line = this.webgl.makeLine();
    // this.webgl.makeSpere(0, 0);
    this.webgl.makeSpere(0, 100);
  }

  animate() {
    this.bodyViews = this.bodies.map(body => this.webgl.makeSpere(body.x - 800, body.y - 400));
    this.animateObservable = interval(30).subscribe(
      () => {
        this.bodyViews.forEach((mesh, i) => {
            const body = this.bodies[i];
            mesh.position.set(body.x - 800, body.y - 400, mesh.position.z);
          }
        );
        this.webgl.render();
      }
    );
  }

}
