import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PlanetsComponent} from './planets/planets/planets.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {InjectableRxStompConfig, RxStompService, rxStompServiceFactory} from '@stomp/ng2-stompjs';
import {myRxStompConfig} from './my-rx-stomp.config';

@NgModule({
  declarations: [
    AppComponent,
    PlanetsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // AppSocketModule
  ],
  providers: [HttpClient,
    {
      provide: InjectableRxStompConfig,
      useValue: myRxStompConfig
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig]
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
