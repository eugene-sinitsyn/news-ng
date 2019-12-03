export class TopArticlesRequestModel {
  public country: string; // TODO: replace with enum
  public category: string; // TODO: replace with enum
  public sources: string[];
  public searchString: string;
  public pageSize: number;
  public page: number;
}