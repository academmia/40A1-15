import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CInfoComponent } from 'src/course/c-info.component';

import { AppComponent } from './app.component';
import { ProjectService } from './projects/project.service';

@NgModule({
  declarations: [
    AppComponent,
    CInfoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
