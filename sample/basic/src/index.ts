import {
  ObservedArray,
  ObservedMap,
  ObservedSet,
  ObservedValue,
} from '@yellfage/observation'

const value = new ObservedValue<string>('')
const array = new ObservedArray<string>()
const set = new ObservedSet<string>()
const map = new ObservedMap<string, string>()

value.updated.on((event) => {
  console.log('Value | Setted', event)
})

array.inserted.on((event) => {
  console.log('Array | Inserted', event)
})

array.resized.on((event) => {
  console.log('Array | Resized', event)
})

set.added.on((event) => {
  console.log('Set | Added', event)
})

set.cleared.on((event) => {
  console.log('Set | Cleared', event)
})

set.deleted.on((event) => {
  console.log('Set | Deleted', event)
})

map.cleared.on((event) => {
  console.log('Map | Cleared', event)
})

map.deleted.on((event) => {
  console.log('Map | Deleted', event)
})

map.setted.on((event) => {
  console.log('Map | Setted', event)
})

value.update('Hello, world')

array.push('3', '2', '1')
array.sort()
array.reverse()
array.splice(0, 3, '10', '20', '30')
array.unshift('6', '5', '4')
array[0] = '100'
array.length = 0

set.add('foo')
set.add('bar')
set.delete('foo')
set.clear()

map.set('foo', 'foo')
map.set('bar', 'bar')
map.delete('foo')
map.clear()
