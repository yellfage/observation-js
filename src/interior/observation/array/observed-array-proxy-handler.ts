import type { EventChannel } from '@yellfage/events'

import type {
  InsertedObservedArrayEvent,
  ObservedArray,
  ResizedObservedArrayEvent,
} from '../../../observation'

export class ObservedArrayProxyHandler<T>
  implements ProxyHandler<ObservedArray<T>>
{
  private readonly resized: EventChannel<[ResizedObservedArrayEvent<T>]>

  private readonly inserted: EventChannel<[InsertedObservedArrayEvent<T>]>

  public constructor(
    resized: EventChannel<[ResizedObservedArrayEvent<T>]>,
    inserted: EventChannel<[InsertedObservedArrayEvent<T>]>,
  ) {
    this.resized = resized
    this.inserted = inserted
  }

  public set(
    target: ObservedArray<T>,
    name: string | symbol,
    value: unknown,
  ): boolean {
    if (name === 'length') {
      return this.handleLengthSetting(target, value)
    }

    if (!Number.isNaN(name)) {
      return this.handleIndexSetting(target, Number(name), value)
    }

    return this.handlePropertySetting(target, name, value)
  }

  private handleLengthSetting(
    target: ObservedArray<T>,
    value: unknown,
  ): boolean {
    const previousLength = target.length

    target.length = value as number

    if (previousLength !== target.length) {
      this.resized.queue({
        target,
        length: target.length,
      })
    }

    return true
  }

  private handleIndexSetting(
    target: ObservedArray<T>,
    index: number,
    value: unknown,
  ): boolean {
    const previousValue = target[index]

    target[index] = value as T

    if (Number.isInteger(index) && previousValue !== value) {
      this.inserted.queue({ target, index, item: value as T })
    }

    return true
  }

  private handlePropertySetting(
    target: ObservedArray<T>,
    name: symbol | string,
    value: unknown,
  ): boolean {
    target[name] = value

    return true
  }
}
