import type { EventPool } from '@yellfage/events'

import { EventChannel } from '@yellfage/events'

import type { ReadonlyObservedValue } from './readonly-observed-value'

import type { UpdatedObservedValueEvent } from './updated-observed-value-event'

const targetSymbol = Symbol('Target')
const updatedSymbol = Symbol('Updated')

export class ObservedValue<
  T extends boolean | number | string | null | undefined,
> implements ReadonlyObservedValue<T>
{
  public get target(): T {
    return this[targetSymbol]
  }

  public get updated(): EventPool<[UpdatedObservedValueEvent<T>]> {
    return this[updatedSymbol]
  }

  private [targetSymbol]: T

  private readonly [updatedSymbol] = new EventChannel<
    [UpdatedObservedValueEvent<T>]
  >()

  public constructor(target: T) {
    this[targetSymbol] = target
  }

  public static unpack<T extends boolean | number | string | null | undefined>(
    value: T | ObservedValue<T>,
  ): T {
    return value instanceof ObservedValue ? value.target : value
  }

  public static unpackMany<
    T extends boolean | number | string | null | undefined,
  >(...values: (T | ObservedValue<T>)[]): T[] {
    return values.map((value) => this.unpack(value))
  }

  public update(value: T | this): void {
    if (this.target === value) {
      return
    }

    const previousValue = this[targetSymbol]

    const nextValue = ObservedValue.unpack<T>(value)

    this[targetSymbol] = nextValue

    this[updatedSymbol].queue({ target: this, nextValue, previousValue })
  }

  public valueOf(): T {
    return this.target
  }
}
