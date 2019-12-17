import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { StateModule } from '@state';
import { AppComponent } from './root.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ArticleCardComponent } from './components/article-card/article-card.component';

const routes: Routes = [];
const materialModules = [
  MatButtonModule,
  MatSelectModule,
  MatCardModule
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ArticleCardComponent
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