import type { EventPool } from '@yellfage/events'

import { EventChannel } from '@yellfage/events'

import { ObservedArrayProxyHandler } from '../../interior'

import type { InsertedObservedArrayEvent } from './inserted-observed-array-event'

import type { ReadonlyObservedArray } from './readonly-observed-array'

import type { ResizedObservedArrayEvent } from './resized-observed-array-event'

const insertedSymbol = Symbol('Inserted')
const resizedSymbol = Symbol('Resized')

export class ObservedArray<T>
  extends Array<T>
  implements Array<T>, ReadonlyObservedArray<T>
{
  public get inserted(): EventPool<[InsertedObservedArrayEvent<T>]> {
    return this[insertedSymbol]
  }

  public get resized(): EventPool<[ResizedObservedArrayEvent<T>]> {
    return this[resizedSymbol]
  }

  private readonly [insertedSymbol] = new EventChannel<
    [InsertedObservedArrayEvent<T>]
  >()

  private readonly [resizedSymbol] = new EventChannel<
    [ResizedObservedArrayEvent<T>]
  >()

  public static get [Symbol.species](): ArrayConstructor {
    return Array
  }

  public constructor(arrayLength?: number)
  public constructor(...items: T[])
  public constructor(...args: [number]) {
    super(...args)

    // eslint-disable-next-line no-constructor-return
    return new Proxy(
      this,
      new ObservedArrayProxyHandler(this[resizedSymbol], this[insertedSymbol]),
    )
  }
}
