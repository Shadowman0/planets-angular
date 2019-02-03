import {ElementRef, Injectable, Renderer2} from '@angular/core';
import * as THREE from 'three';
import './js/EnableThreeExamples';
import 'three/examples/js/controls/OrbitControls';
import 'three/examples/js/loaders/ColladaLoader';
import {Mesh} from 'three';

@Injectable({
  providedIn: 'root'
})
export class WebglService {
  private camera: THREE.PerspectiveCamera;
  private scene = new THREE.Scene();
  private webGlRenderer: THREE.WebGLRenderer;
  private controls: THREE.OrbitControls;
  private controlSphere: Mesh;

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
    this.makeAxes();
    this.webGlRenderer.render(this.scene, this.camera);
  }

  public addControls() {
    this.controls = new THREE.OrbitControls(this.camera);
    // this.controls.enableRotate = false;
    // this.controls.enablePan = false;
    // this.controls.target = false;
    this.controls.rotateSpeed = 1.0;
    this.controls.zoomSpeed = 1.2;

    const material = new THREE.MeshBasicMaterial({color: 0x000000});
    const sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(5, 0, 200), material);
    sphere.position.set(this.controls.target.x, this.controls.target.y, this.controls.target.z);
    this.scene.add(sphere);
    this.controlSphere = sphere;
  }

  makeAxes() {
    this.drawLine(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1000, 0));
    this.drawLine(new THREE.Vector3(0, 0, 0), new THREE.Vector3(1000, 0, 0));
    this.drawLine(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 1000));
    this.render();
  }

  private drawLine(vector1, vector2) {
    const material = new THREE.LineBasicMaterial({
      color: 0x000000,
      linewidth: 10
    });
    const geometry = new THREE.Geometry();
    geometry.vertices.push(vector1);
    geometry.vertices.push(vector2);
    const line = new THREE.Line(geometry, material);
    this.scene.add(line);
    return line;
  }

  makeSpere(x: number, y: number): THREE.Mesh {
    const material = new THREE.MeshBasicMaterial({color: 0xff0000});
    const sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(5, 0, 200), material);
    sphere.position.set(x, y, 0);
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
    if (this.controlSphere) {
      this.controlSphere.position.set(this.controls.target.x, this.controls.target.y, this.controls.target.z);
    }
    this.webGlRenderer.render(this.scene, this.camera);
  }
}
