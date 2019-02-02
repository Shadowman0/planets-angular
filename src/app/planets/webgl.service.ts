import {ElementRef, Injectable, Renderer2} from '@angular/core';
import * as THREE from 'three';
import './js/EnableThreeExamples';
import 'three/examples/js/controls/OrbitControls';
import 'three/examples/js/loaders/ColladaLoader';

@Injectable({
  providedIn: 'root'
})
export class WebglService {
  private camera: THREE.PerspectiveCamera;
  private scene = new THREE.Scene();
  private webGlRenderer: THREE.WebGLRenderer;
  private controls: THREE.OrbitControls;

  init(hostElementRef: ElementRef, ngRenderer: Renderer2) {
    const hostElement = hostElementRef.nativeElement;
    this.webGlRenderer = new THREE.WebGLRenderer({
      alpha: true,    // transparent background
      antialias: true // smooth edges
    });
    this.webGlRenderer.setSize(
      hostElement.clientWidth,
      hostElement.clientWidth / 1.8
    );
    ngRenderer.appendChild(
      hostElement,
      this.webGlRenderer.domElement
    );
    this.webGlRenderer.setSize(hostElement.clientWidth, hostElement.clientWidth / 1.8);
    this.camera = new THREE.PerspectiveCamera(23, 1.77, 10, 50000);
    this.camera.position.set(0, 50, 1900);


    const ambient = new THREE.AmbientLight(0x444444);
    this.scene.add(ambient);
    const light = new THREE.SpotLight(0xffffff);
    light.position.set(0, 1500, 1000);
    this.scene.add(light);

    this.webGlRenderer.render(this.scene, this.camera);
  }

  public addControls() {
    this.controls = new THREE.OrbitControls(this.camera);
    this.controls.rotateSpeed = 1.0;
    this.controls.zoomSpeed = 1.2;
  }

  makeLine(): THREE.Line {
    const geometry = new THREE.Geometry();

    geometry.vertices.push(new THREE.Vector3(-200, 0, 200));
    geometry.vertices.push(new THREE.Vector3(0, 200, 200));
    geometry.vertices.push(new THREE.Vector3(200, 0, 200));

    const material = new THREE.LineBasicMaterial({
      color: 0x0000ff,
      linewidth: 10
    });
    const line = new THREE.Line(geometry, material);

    this.scene.add(line);
    this.webGlRenderer.render(this.scene, this.camera);

    return line;
  }

  makeSpere(x: number, y: number): THREE.Mesh {
    const material = new THREE.MeshBasicMaterial({color: 0xff0000});
    const sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(5, 0, 200), material);
    sphere.position.set(x, y, 200);
    this.scene.add(sphere);
    this.webGlRenderer.render(this.scene, this.camera);
    return sphere;
  }

  animate(): void {
    window.addEventListener('DOMContentLoaded', () => {
      this.render();
    });

    window.addEventListener('resize', () => {
      this.resize();
    });
  }

  deleteObject(obj: THREE.Object3D) {
    this.scene.remove(obj);
    this.webGlRenderer.render(this.scene, this.camera);
  }

  resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.webGlRenderer.setSize(width, height);
  }

  render() {
    this.webGlRenderer.render(this.scene, this.camera);
  }
}
