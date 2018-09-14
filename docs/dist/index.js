'use strict';

var _zrototype = require('../../lib/zrototype');

var _zrototype2 = _interopRequireDefault(_zrototype);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var obj1 = {
  a: 1,
  b: 3
};

function func() {
  this.name = 'func';
}

var obj2 = new func();

var obj3 = {
  head: 3,
  leg: 6
};

var zrototype = new _zrototype2.default({
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