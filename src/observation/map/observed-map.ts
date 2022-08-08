import type { EventPool } from '@yellfage/events'

import { EventChannel } from '@yellfage/events'

import type { ClearedObservedMapEvent } from './cleared-observed-map-event'

import type { DeletedObservedMapEvent } from './deleted-observed-map-event'

import type { ReadonlyObservedMap } from './readonly-observed-map'

import type { SettedObservedMapEvent } from './setted-observed-map-event'

const clearedSymbol = Symbol('Cleared')
const deletedSymbol = Symbol('Deleted')
const settedSymbol = Symbol('Setted')

// eslint-disable-next-line @typescript-eslint/naming-convention
export class ObservedMap<K, V>
  extends Map<K, V>
  implements Map<K, V>, ReadonlyObservedMap<K, V>
{
  public get cleared(): EventPool<[ClearedObservedMapEvent<K, V>]> {
    return this[clearedSymbol]
  }

  public get deleted(): EventPool<[DeletedObservedMapEvent<K, V>]> {
    return this[deletedSymbol]
  }

  public get setted(): EventPool<[SettedObservedMapEvent<K, V>]> {
    return this[settedSymbol]
  }

  private readonly [clearedSymbol] = new EventChannel<
    [ClearedObservedMapEvent<K, V>]
  >()

  private readonly [deletedSymbol] = new EventChannel<
    [DeletedObservedMapEvent<K, V>]
  >()

  private readonly [settedSymbol] = new EventChannel<
    [SettedObservedMapEvent<K, V>]
  >()

  public static get [Symbol.species](): MapConstructor {
    return Map
  }

  public clear(): void {
    if (!this.size) {
      return
    }

    super.clear()

    this[clearedSymbol].queue({ target: this })
  }

  public delete(key: K): boolean {
    const isDeleted = super.delete(key)

    if (isDeleted) {
      this[deletedSymbol].queue({ target: this, key })
    }

    return isDeleted
  }

  public set(key: K, value: V): this {
    if (this.get(key) !== value) {
      super.set(key, value)

      this[settedSymbol].queue({ target: this, key, value })
    }

    return this
  }
}
