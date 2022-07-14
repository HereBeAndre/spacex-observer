export function typeGuardFunction<T>(object: T, key: string): boolean {
  return key in object;
}
