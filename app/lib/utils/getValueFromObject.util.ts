/**
 * Retrieves a value from an object based on the provided path.
 * If the path is a string, it directly accesses the corresponding property of the object.
 * If the path is an array of keys, it traverses the object to access the nested property.
 * Optionally, it can concatenate the retrieved value with an additional property of the object.
 *
 * @param object - The object from which to retrieve the value.
 * @param path - The path to the desired property, either as a string or an array of keys.
 * @param concat - Indicates whether to concatenate the retrieved value with an additional property.
 * @param additionalKey - The additional property to concatenate with the retrieved value (optional).
 * @returns The retrieved value, optionally concatenated with the additional property.
 */
export const getValueFromObject = (
  object: any,
  path: string | Array<string>,
  concat: boolean,
  additionalKey: string = '',
) => {
  if (typeof path === 'string') {
    return object[path];
  } else {
    let result = object;
    let additional = '';
    for (let i = 0; i < path.length; i++) {
      const key = path[i];
      if (i === path.length - 1 && concat) additional = result[additionalKey];
      result = result[key];
    }
    return concat ? `${result} ${additional}` : result;
  }
};
