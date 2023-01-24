export function notNull<T>(value: T): value is NonNullable<T> {
  return value !== null;
}

export function notNullish<T>(value: T): value is NonNullable<T> {
  return value !== null && value != undefined
}
