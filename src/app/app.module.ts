import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { DndModule } from 'ng2-dnd';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderModule } from 'ngx-order-pipe';

import { AppComponent } from './app.component';
import { ComposerComponent } from './composer/composer.component';
import { GateToolboxComponent } from './gate-toolbox/gate-toolbox.component';
import { GateCanvasComponent } from './gate-canvas/gate-canvas.component';
import { GateComponent } from './gate/gate.component';
import { GateService } from './gate/gate.service';
import { SavesService } from './saves/saves.service';
import { SavesComponent } from './saves/saves.component';
import { SelectModule } from 'ng2-select';
import { HttpModule } from '@angular/http';
import { QbitComponent } from './qbit/qbit.component';

@NgModule({
  declarations: [
    AppComponent,
    ComposerComponent,
    GateToolboxComponent,
    GateCanvasComponent,
    GateComponent,
    SavesComponent,
    QbitComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DndModule.forRoot(),
    NgbModule.forRoot(),
    OrderModule,
    HttpModule
  ],
  providers: [GateService, SavesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
