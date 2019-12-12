const metadataSymbol = Symbol('metadata');

export function Metadata(value: any): PropertyDecorator {
  return (targetClass: Object, fieldName: string | symbol) => {
    const prototype = Object.getPrototypeOf(targetClass);
    if (!prototype[metadataSymbol]) prototype[metadataSymbol] = {};
    prototype[metadataSymbol][fieldName] = value;
  };
};

export function readMetadata(
  targetClass: Object,
  fieldName: string | symbol
): any {
  const prototype = Object.getPrototypeOf(targetClass);
  return prototype[metadataSymbol][fieldName];
}