import type { ObservedValue } from './observed-value'

export interface ObservedValueEvent<
  T extends boolean | number | string | null | undefined,
> {
  readonly target: ObservedValue<T>
}
