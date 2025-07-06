export function createNestedObjectArray(
  arrayName: string | number,
  indexArrayItem: string | number,
  nameArrayField: string | number,
  value: any,
) {
  const accFormData:any = {};

  if (arrayName && indexArrayItem && nameArrayField) {
    if (!accFormData[arrayName]) {
      accFormData[arrayName] = [];
    }
    if (!accFormData[arrayName][indexArrayItem]) {
      accFormData[arrayName][indexArrayItem] = {
        [nameArrayField]: value,
      };
    }
    accFormData[arrayName][indexArrayItem][nameArrayField] = value;
    return accFormData;
  }
}
