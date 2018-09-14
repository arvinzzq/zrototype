'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

function calcEdge(chain, index1, index2) {
  var source = chain[index1];
  var target = chain[index2];
  var edge = {
    id: source.id + '-' + target.id,
    source: source,
    target: target
  };
  return edge;
}

var objToArr = function objToArr(obj) {
  return Object.keys(obj).map(function (key) {
    return obj[key];
  });
};

var Zrototype = function () {
  function Zrototype(options) {
    _classCallCheck(this, Zrototype);

    var objects = options.objects,
        props = options.props;

    this.nodeHashMap = {};
    this.edgeHashMap = {};
    this.objProtoMap = new Map();
    this.collectNodesEdges(objects);
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
    key: 'collectNodesEdges',
    value: function collectNodesEdges(objects) {
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
    value: function calcProtoChain(obj, chain) {
      if (!(chain instanceof Array)) {
        throw new Error('chain must be type of Array');
      }
      var id = obj.$$name || (obj.constructor && obj.constructor.name) + '.prototype' || obj.toString();
      var node = {
        id: id,
        value: obj.$$value || obj
      };
      chain.push(node);
      this.addNode(node);
      if (chain.length > 1) {
        this.addEdge(calcEdge(chain, chain.length - 2, chain.length - 1));
      }
      var proto = Object.getPrototypeOf(obj.$$value || obj);
      if (proto) {
        this.calcProtoChain(proto, chain);
      } else {
        var nodeNull = {
          id: 'null',
          value: null
        };
        chain.push(nodeNull);
        this.addNode(nodeNull);
        this.addEdge(calcEdge(chain, chain.length - 2, chain.length - 1));
      }
    }
  }, {
    key: 'getDrawData',
    value: function getDrawData(width, height) {
      var data = {
        nodes: objToArr(this.nodeHashMap).map(function (node) {
          return {
            id: node.id,
            x: getRandomInt(0, width),
            y: getRandomInt(0, height),
            label: node.id
          };
        }),
        edges: objToArr(this.edgeHashMap).map(function (edge) {
          return {
            id: edge.id,
            source: edge.source.id,
            target: edge.target.id
          };
        })
      };
      return data;
    }
  }, {
    key: 'draw',
    value: function draw() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _props$width = props.width,
          width = _props$width === undefined ? 500 : _props$width,
          _props$height = props.height,
          height = _props$height === undefined ? 500 : _props$height;

      var graph = new _g2.default.Graph(props);
      graph.edge({
        style: function style() {
          return {
            stroke: '#b3b3b3',
            lineWidth: 2
          };
        }
      });
      graph.read(this.getDrawData(width, height));
      var node = void 0;
      var dx = void 0;
      var dy = void 0;
      graph.on('node:dragstart', function (ev) {
        var item = ev.item;

        var model = item.getModel();
        node = item;
        dx = model.x - ev.x;
        dy = model.y - ev.y;
      });
      graph.on('node:drag', function (ev) {
        node && graph.update(node, {
          x: ev.x + dx,
          y: ev.y + dy
        });
      });
      graph.on('node:dragend', function (ev) {
        node = undefined;
      });
    }
  }]);

  return Zrototype;
}();

exports.default = Zrototype;