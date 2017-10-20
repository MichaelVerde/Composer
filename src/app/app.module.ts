import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { DndModule } from 'ng2-dnd';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderModule } from 'ngx-order-pipe';
import { SidebarModule } from 'ng-sidebar';

import { AppComponent } from './app.component';
import { ComposerComponent } from './composer/composer.component';
import { GateToolboxComponent } from './gate-toolbox/gate-toolbox.component';
import { GateCanvasComponent } from './gate-canvas/gate-canvas.component';
import { GateComponent } from './gate/gate.component';
import { GateService } from './gate/gate.service';
import { SavesService } from './saves/saves.service';
import { SavesComponent } from './saves/saves.component';
import { HttpModule } from '@angular/http';
import { QbitComponent } from './qbit/qbit.component';
import { OutputsComponent } from './outputs/outputs.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { HighlightJsModule, HighlightJsService } from 'angular2-highlight-js';

@NgModule({
  declarations: [
    AppComponent,
    ComposerComponent,
    GateToolboxComponent,
    GateCanvasComponent,
    GateComponent,
    SavesComponent,
    QbitComponent,
    OutputsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    FormsModule,
    DndModule.forRoot(),
    NgbModule.forRoot(),
    SidebarModule.forRoot(),
    OrderModule,
    HttpModule,
    HighlightJsModule
  ],
  providers: [GateService, SavesService, HighlightJsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
