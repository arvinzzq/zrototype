'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcProtoChain = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _g = require('@antv/g6');

var _g2 = _interopRequireDefault(_g);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

var Zrototype = function () {
  function Zrototype(options) {
    _classCallCheck(this, Zrototype);

    var objects = options.objects,
        props = options.props;

    this.nodeHashMap = {};
    this.edgeHashMap = {};
    this.objProtoMap = new Map();
    this.collectNodeEdges(objects);
  }

  _createClass(Zrototype, [{
    key: 'addNode',
    value: function addNode(node) {
      if (!this.nodeHashMap[node.id]) {
        this.nodeHashMap[node.id] = node;
      }
    }
  }, {
    key: 'addEdge',
    value: function addEdge(edge) {
      if (!this.edgeHashMap[edge.id]) {
        this.edgeHashMap[edge.id] = edge;
      }
    }
  }, {
    key: 'collectNodeEdges',
    value: function collectNodeEdges(objects) {
      var _this = this;

      if (!(objects instanceof Array)) {
        throw new Error('objects must be type of Array');
      }
      objects.forEach(function (object) {
        var chain = [];
        _this.calcProtoChain(object, chain);
        _this.objProtoMap.set(object, chain);
      });
    }
  }, {
    key: 'calcProtoChain',
    value: function (_calcProtoChain) {
      function calcProtoChain(_x, _x2) {
        return _calcProtoChain.apply(this, arguments);
      }

      calcProtoChain.toString = function () {
        return _calcProtoChain.toString();
      };

      return calcProtoChain;
    }(function (obj, chain) {
      if (!(chain instanceof Array)) {
        throw new Error('chain must be type of Array');
      }
      var node = {
        id: obj.name || (obj.constructor && obj.constructor.name) + '.prototype' || obj.toString(),
        value: obj.value || obj
      };
      chain.push(node);
      this.addNode(node);
      if (chain.length > 1) {
        var source = chain[chain.length - 2];
        var target = chain[chain.length - 1];
        var edge = {
          id: source.id + '-' + target.id,
          source: source,
          target: target
        };
        this.addEdge(edge);
      }
      var proto = Object.getPrototypeOf(obj.value || obj);
      if (proto) {
        calcProtoChain(proto, chain);
      } else {
        chain.push({
          id: 'null',
          value: null
        });
      }
    })
  }, {
    key: 'getDrawData',
    value: function getDrawData(width, height) {
      return {
        nodes: this.nodeHashMap.map(function (node) {
          return {
            id: node.id,
            x: getRandomInt(width, height),
            y: getRandomInt(width, height)
          };
        }),
        edges: this.edgeHashMap
      };
    }
  }, {
    key: 'draw',
    value: function draw(props) {
      var _props$width = props.width,
          width = _props$width === undefined ? 500 : _props$width,
          _props$height = props.height,
          height = _props$height === undefined ? 500 : _props$height;

      var graph = new _g2.default.Graph(props);
      graph.read(this.getDrawData(width, height));
    }
  }]);

  return Zrototype;
}();

exports.calcProtoChain = calcProtoChain;