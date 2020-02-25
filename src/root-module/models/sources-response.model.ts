import { ResponseStatus } from '../enums/response-status.enum';
import { SourceDetailsModel } from './source-details.model';

export class SourcesResponseModel {
  public status: ResponseStatus;
  public code?: string;
  public message?: string;
  public sources: SourceDetailsModel[];
}