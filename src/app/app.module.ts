import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { TasksComponent } from './tasks-operations/tasks/tasks.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from './app.routing';
import { RtlContainerComponent } from './tasks-operations/pages/rtl-container/rtl-container.component';
import { LtrContainerComponent } from './tasks-operations/pages/ltr-container/ltr-container.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    RtlContainerComponent,
    LtrContainerComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forRoot(routes),

  ],
   bootstrap: [AppComponent]
})
export class AppModule { }
