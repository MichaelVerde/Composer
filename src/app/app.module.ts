import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { DndModule } from 'ng2-dnd';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ComposerComponent } from './composer/composer.component';
import { GateToolboxComponent } from './gate-toolbox/gate-toolbox.component';
import { GateCanvasComponent } from './gate-canvas/gate-canvas.component';
import { GateComponent } from './gate/gate.component';
import { GateService } from './gate/gate.service';

@NgModule({
  declarations: [
    AppComponent,
    ComposerComponent,
    GateToolboxComponent,
    GateCanvasComponent,
    GateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DndModule.forRoot(),
    NgbModule.forRoot()
  ],
  providers: [GateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
