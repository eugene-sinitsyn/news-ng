import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ArticlesService } from './services/articles.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [ArticlesService]
})
export class NetworkModule {}