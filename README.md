# classes
element class manipulation

## Installation

```sh
$ npm  i --save @auojs/classes
# or
$ yarn add @auojs/classes
```

## Example

```js
import classes from '@auojs/classes'

classes(el)
  .add('foo')
  .toogle('bar')
  .remove(/^item-\d+/);
```

## API

### .add(class)

Add `class`.

### .remove(class)

Remove `class` name or all classes matching the given regular expression.

### .toggle(class)

Toggle `class`.

### .has(class)

Check if `class` is present.

### .array()

Return an array of classes.

## Test

```
$ make test
```

## License

MIT