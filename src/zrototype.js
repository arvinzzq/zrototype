import G6 from '@antv/g6';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function calcEdge(chain, index1, index2) {
  const source = chain[index1];
  const target = chain[index2];
  const edge = {
    id: `${source.id}-${target.id}`,
    source,
    target
  };
  return edge;
}

const objToArr = obj => Object.keys(obj).map(key => obj[key]);

class Zrototype {
  constructor(options) {
    const { objects, props } = options;
    this.nodeHashMap = {};
    this.edgeHashMap = {};
    this.objProtoMap = new Map();
    this.collectNodesEdges(objects);
  }

  addNode(node) {
    if (!this.nodeHashMap[node.id]) {
      this.nodeHashMap[node.id] = node;
    }
  }

  addEdge(edge) {
    if (!this.edgeHashMap[edge.id]) {
      this.edgeHashMap[edge.id] = edge;
    }
  }

  collectNodesEdges(objects) {
    if (!(objects instanceof Array)) {
      throw new Error('objects must be type of Array');
    }
    objects.forEach(object => {
      const chain = [];
      this.calcProtoChain(object, chain);
      this.objProtoMap.set(object, chain);
    });
  }

  calcProtoChain(obj, chain) {
    if (!(chain instanceof Array)) {
      throw new Error('chain must be type of Array');
    }
    const id = obj.$$name || `${obj.constructor && obj.constructor.name}.prototype` || obj.toString();
    const node = {
      id,
      value: obj.$$value || obj
    };
    chain.push(node);
    this.addNode(node);
    if (chain.length > 1) {
      this.addEdge(calcEdge(chain, chain.length - 2, chain.length - 1));
    }
    const proto = Object.getPrototypeOf(obj.$$value || obj);
    if (proto) {
      this.calcProtoChain(proto, chain);
    } else {
      const nodeNull = {
        id: 'null',
        value: null
      };
      chain.push(nodeNull);
      this.addNode(nodeNull);
      this.addEdge(calcEdge(chain, chain.length - 2, chain.length - 1));
    }
  }

  getDrawData(width, height) {
    const data = {
      nodes: objToArr(this.nodeHashMap).map(node => ({
        id: node.id,
        x: getRandomInt(0, width),
        y: getRandomInt(0, height),
        label: node.id
      })),
      edges: objToArr(this.edgeHashMap).map(edge => ({
        id: edge.id,
        source: edge.source.id,
        target: edge.target.id
      }))
    };
    return data;
  }

  draw(props = {}) {
    const { width = 500, height = 500 } = props;
    const graph = new G6.Graph(props);
    graph.edge({
      style() {
        return {
          stroke: '#b3b3b3',
          lineWidth: 2,
          endArrow: true
        }
      }
    });   
    graph.read(this.getDrawData(width, height));
    let node;
    let dx;
    let dy;
    graph.on('node:dragstart', ev=>{
      const {item} = ev;
      const model = item.getModel();
      node = item;
      dx = model.x - ev.x;
      dy = model.y - ev.y;
    });
    graph.on('node:drag', ev=>{
      node && graph.update(node, {
        x: ev.x+dx,
        y: ev.y+dy
      });
    });
    graph.on('node:dragend', ev=>{
      node = undefined;
    });
  }
}

export default Zrototype;