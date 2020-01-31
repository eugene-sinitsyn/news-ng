export class Page<T> {
  public constructor(array?: T[], total?: number) {
    this.array = array || [];
    this.total = total || 0;
  }

  public array: T[];
  public total: number;
}