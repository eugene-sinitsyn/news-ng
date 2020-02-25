import { SourceDetailsModel } from './source-details.model';
import { ResponseStatus } from '../enums/response-status.enum';

export class SourcesResponseModel {
  public status: ResponseStatus;
  public code?: string;
  public message?: string;
  public sources: SourceDetailsModel[];
}