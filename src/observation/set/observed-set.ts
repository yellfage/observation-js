import type { EventPool } from '@yellfage/events'

import { EventChannel } from '@yellfage/events'

import type { AddedObservedSetEvent } from './added-observed-set-event'

import type { ClearedObservedSetEvent } from './cleared-observed-set-event'

import type { DeletedObservedSetEvent } from './deleted-observed-set-event'

import type { ReadonlyObservedSet } from './readonly-observed-set'

const addedSymbol = Symbol('Added')
const clearedSymbol = Symbol('Cleared')
const deletedSymbol = Symbol('Deleted')
export class ObservedSet<T>
  extends Set<T>
  implements Set<T>, ReadonlyObservedSet<T>
{
  public get added(): EventPool<[AddedObservedSetEvent<T>]> {
    return this[addedSymbol]
  }

  public get cleared(): EventPool<[ClearedObservedSetEvent<T>]> {
    return this[clearedSymbol]
  }

  public get deleted(): EventPool<[DeletedObservedSetEvent<T>]> {
    return this[deletedSymbol]
  }

  private readonly [addedSymbol] = new EventChannel<
    [AddedObservedSetEvent<T>]
  >()

  private readonly [clearedSymbol] = new EventChannel<
    [ClearedObservedSetEvent<T>]
  >()

  private readonly [deletedSymbol] = new EventChannel<
    [DeletedObservedSetEvent<T>]
  >()

  public static get [Symbol.species](): SetConstructor {
    return Set
  }

  public add(value: T): this {
    const previousSize = this.size

    super.add(value)

    if (previousSize !== this.size) {
      this[addedSymbol].queue({ target: this, value })
    }

    return this
  }

  public clear(): void {
    if (this.size) {
      super.clear()

      this[clearedSymbol].queue({ target: this })
    }
  }

  public delete(value: T): boolean {
    const isDeleted = super.delete(value)

    if (isDeleted) {
      this[deletedSymbol].queue({ target: this, value })
    }

    return isDeleted
  }
}
