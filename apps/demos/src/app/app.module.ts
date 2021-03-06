import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent, AppComponentModule } from './app-component';
import {
  getChunkStrategyCredentialsMap,
  getConcurrentSchedulerStrategyCredentialsMap, getFreStrategyCredentialsMap,
  RX_CUSTOM_STRATEGIES,
  RX_PRIMARY_STRATEGY,
} from './rx-angular-pocs';
import { ENVIRONMENT_SETTINGS } from './shared/environment.token';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './features/home/home.component';
import { tap } from 'rxjs/operators';
import { concurrent } from './rx-angular-pocs/cdk/render-strategies/scheduling/scheduler/react-concurrent-scheduler/concurrent';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppComponentModule,
  ],
  providers: [
    {
      provide: ENVIRONMENT_SETTINGS,
      useValue: environment,
    },
    {
      provide: RX_CUSTOM_STRATEGIES,
      useValue: {
        ...getConcurrentSchedulerStrategyCredentialsMap(),
        ...getChunkStrategyCredentialsMap()
      },
      multi: true,
    },
    {
      provide: RX_PRIMARY_STRATEGY,
      useValue: 'normal',
    },
  ],
  declarations: [HomeComponent],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
