import { ArticleSourceModel } from './article-source.model';

export class ArticleModel {
  public source: ArticleSourceModel;
  public author: string;
  public title: string;
  public description: string;
  public url: string;
  public urlToImage: string;
  public publishedAt: string;
  public content: string;
}