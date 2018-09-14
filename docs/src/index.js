import Zrototype from '../../lib/zrototype';

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

zrototype.draw({
  container: 'app',
  width: 500,
  height: 500
});
