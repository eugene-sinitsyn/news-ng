export class Page<T> {
  public constructor(
    private readonly array: T[],
    public readonly total: number
  ) {}

  public toArray(): T[] {
    return this.array;
  }
}