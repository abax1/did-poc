/**
 * function deep_copy()
 *
 * returns a deep copy of an object.
 *
 * params: source object
 *
 * returns: copy of object
 */
export function deep_copy(obj) {
  return JSON.parse(JSON.stringify(obj));
}
