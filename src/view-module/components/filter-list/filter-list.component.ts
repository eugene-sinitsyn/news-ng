import { Component } from '@angular/core';
import { IconDefinition, faTrash } from '@fortawesome/free-solid-svg-icons'
import { MatDialogRef } from '@angular/material/dialog';
import { TopFilterStateModel } from '@state';

@Component({
  selector: 'news-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.scss']
})
export class FilterListComponent {
  public constructor(
    private readonly dialogRef: MatDialogRef<FilterListComponent>
  ) {}

  public readonly faTrash: IconDefinition = faTrash;

  // TODO: get saved filters from localStorage
  public filters: { [name: string]: TopFilterStateModel } = {};

  public get title(): string {
    return !this.filters || !this.filterNames.length
      ? 'filter.no-saved-filters'
      : 'filter.select-filter';
  }

  public get filterNames(): string[] {
    return this.filters ? Object.keys(this.filters) : [];
  }

  public applyFilter(filterName: string): void {
    // TODO: apply filter
    console.log(`applyFilter(${filterName})`);
    this.dialogRef.close();
  }

  public deleteFilter(filterName: string): void {
    // TODO: delete filter
    console.log(`deleteFilter(${filterName})`);
  }
}