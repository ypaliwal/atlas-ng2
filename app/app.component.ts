import { Component } from '@angular/core';

import { DataCallsService } from './services/dataCalls.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers: [ DataCallsService ]
})
export class AppComponent  { 
}