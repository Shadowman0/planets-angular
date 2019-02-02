import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Socket} from 'ngx-socket-io';
import {RxStompService} from '@stomp/ng2-stompjs';
import {Subscription} from 'rxjs';

export class Planet {
  x: number;
  y: number;
}

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {
  bodiesSubscription: Subscription;
  planets: { bodies: Array<Planet> } = {bodies: []};
  url = 'http://localhost:8080';
  started: boolean;

  constructor(private http: HttpClient, private broker: RxStompService) {
  }

  start() {
    this.started = true;
    this.http
      .post(`${this.url}/start`, null, {})
      .subscribe();
    this.subscribeToBodiesSocket();
  }

  stop() {
    this.started = false;
    this.http
      .post(`${this.url}/stop`, null, {})
      .subscribe();
    this.bodiesSubscription.unsubscribe();
  }

  subscribeToBodiesSocket() {
    this.bodiesSubscription = this.broker.watch('/topic/bodies').subscribe(value => {
        this.planets = JSON.parse(value.body);
      }
    );
  }
}
