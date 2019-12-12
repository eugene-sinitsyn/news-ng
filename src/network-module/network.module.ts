import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ArticlesService } from './services/articles.service';
import { SourcesService } from './services/sources.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [ArticlesService, SourcesService]
})
export class NetworkModule {}