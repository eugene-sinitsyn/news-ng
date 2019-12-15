import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { StateModule } from '@state';
import { AppComponent } from './root.component';

const routes: Routes = [];
const materialModules = [
  MatButtonModule
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    ...materialModules,
    StateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class ViewModule {}