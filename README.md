[![npm version](https://img.shields.io/npm/v/zrototype.svg)](https://www.npmjs.com/package/zrototype)
[![npm download](https://img.shields.io/npm/dt/zrototype.svg)](https://www.npmjs.com/package/zrototype)

# zrototype
zrototype create graph ↔️ of prototype of given objects.

## Background

Emm... The reason I write zrototype is some of my friends are misunderstand with [[prototype]] and [[prototype]] chain of Javascript. I explained too many times to say anything... So zrototype is used to tell the truth. 😴

## Usage

### Demo

⚠️ If code compression is turned on, the name of function is the compressed name.

```javascript
import Zrototype from 'zrototype';

const obj1 = {
  a: 1,
  b: 3
};

function func() {
  this.name = 'func';
}

const obj2 = new func();

const obj3 = {
  head: 3,
  leg: 6
};

const zrototype = new Zrototype({
  objects: [{
    $$name: 'obj1',
    $$value: obj1
  }, {
    $$name: 'obj2',
    $$value: obj2
  }, {
    $$name: 'obj3',
    $$value: obj3
  }, {
    $$name: 'Function',
    $$value: Function
  }]
});

// draw options will be directly passed to G6 graph.
zrototype.draw({
  container: 'app',
  width: 500,
  height: 500
});

// zrototype.objProtoMap => set of obj and its prototype chain.

```

<p align="center">
  <img width="400px" src="./demo.png" />
</p>

## Development

```
npm run dev
```