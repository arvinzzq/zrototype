import G6 from '@antv/g6';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

class Zrototype {
  constructor(options) {
    const { objects, props } = options;
    this.nodeHashMap = {};
    this.edgeHashMap = {};
    this.objProtoMap = new Map();
    this.collectNodeEdges(objects);
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

  collectNodeEdges(objects) {
    if (!(objects instanceof Array)) {
      throw new Error('objects must be type of Array');
    }
    objects.forEach(object => {
      const chain = [];
      this.calcProtoChain(object, chain);
      this.objProtoMap.set(object, chain);
    })
  }

  calcProtoChain(obj, chain) {
    if (!(chain instanceof Array)) {
      throw new Error('chain must be type of Array');
    }
    const node = {
      id: obj.name || `${obj.constructor && obj.constructor.name}.prototype` || obj.toString(),
      value: obj.value || obj
    };
    chain.push(node);
    this.addNode(node);
    if (chain.length > 1) {
      const source = chain[chain.length - 2];
      const target = chain[chain.length - 1]
      const edge = {
        id: `${source.id}-${target.id}`,
        source,
        target
      }
      this.addEdge(edge);
    }
    const proto = Object.getPrototypeOf(obj.value || obj);
    if (proto) {
      calcProtoChain(proto, chain);
    } else {
      chain.push({
        id: 'null',
        value: null
      });
    }
  }

  getDrawData(width, height) {
    return {
      nodes: this.nodeHashMap.map(node => ({
        id: node.id,
        x: getRandomInt(width, height),
        y: getRandomInt(width, height)
      })),
      edges: this.edgeHashMap
    }
  }

  draw(props) {
    const { width = 500, height = 500 } = props;    
    const graph = new G6.Graph(props);
    graph.read(this.getDrawData(width, height));
  }
}

export {
  calcProtoChain
}