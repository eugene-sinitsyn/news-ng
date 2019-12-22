import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StateModule } from '@state';
import { AppComponent } from './root.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { TopArticlesComponent } from './pages/top-articles/top-articles.component';
import { SearchArticlesComponent } from './pages/search-articles/search-articles.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { TopFilterComponent } from './components/top-filter/top-filter.component';

const routes: Routes = [
  { path: '', component: TopArticlesComponent },
  { path: 'search', component: SearchArticlesComponent }
  // TODO: 404 page
];
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
    ArticleCardComponent,
    TopArticlesComponent,
    SearchArticlesComponent,
    ArticlesComponent,
    SearchFilterComponent,
    TopFilterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    ...materialModules,
    FontAwesomeModule,
    StateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class ViewModule {}