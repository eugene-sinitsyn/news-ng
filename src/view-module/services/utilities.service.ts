export class UtilitiesService {
  public static enumToList<EnumType>(enumeration: any): EnumType[] {
    return Object.keys(enumeration)
      .filter(key => Number.isNaN(Number(key)))
      .map(key => enumeration[key]);
  }
}