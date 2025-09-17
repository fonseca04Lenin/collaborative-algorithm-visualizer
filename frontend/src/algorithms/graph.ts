import type { GraphStep, GraphNode, GraphEdge } from '../types';

export function* bfsSteps(
  nodes: GraphNode[],
  edges: GraphEdge[],
  startNodeId: string
): Generator<GraphStep, void, unknown> {
  let stepNumber = 0;
  const visited: string[] = [];
  const queue: string[] = [startNodeId];
  const adjacencyList = buildAdjacencyList(nodes, edges);

  yield {
    state: {
      nodes: [...nodes],
      edges: [...edges],
      visited: [...visited],
      queue: [...queue],
      current: startNodeId
    },
    explanation: `Starting BFS from node ${startNodeId}`,
    stepNumber: stepNumber++
  };

  while (queue.length > 0) {
    const current = queue.shift()!;

    // Show dequeuing step
    yield {
      state: {
        nodes: [...nodes],
        edges: [...edges],
        visited: [...visited],
        queue: [...queue],
        current
      },
      explanation: `Processing node ${current} from queue`,
      stepNumber: stepNumber++
    };

    if (!visited.includes(current)) {
      visited.push(current);

      yield {
        state: {
          nodes: [...nodes],
          edges: [...edges],
          visited: [...visited],
          queue: [...queue],
          current
        },
        explanation: `Visiting node ${current}`,
        stepNumber: stepNumber++
      };

      const neighbors = adjacencyList.get(current) || [];
      for (const neighbor of neighbors) {
        if (!visited.includes(neighbor) && !queue.includes(neighbor)) {
          queue.push(neighbor);

          yield {
            state: {
              nodes: [...nodes],
              edges: [...edges],
              visited: [...visited],
              queue: [...queue],
              current
            },
            explanation: `Adding neighbor ${neighbor} to queue`,
            stepNumber: stepNumber++
          };
        }
      }
    } else {
      yield {
        state: {
          nodes: [...nodes],
          edges: [...edges],
          visited: [...visited],
          queue: [...queue],
          current
        },
        explanation: `Node ${current} already visited, skipping`,
        stepNumber: stepNumber++
      };
    }
  }

  yield {
    state: {
      nodes: [...nodes],
      edges: [...edges],
      visited: [...visited],
      queue: [],
      current: undefined
    },
    explanation: 'BFS traversal complete',
    stepNumber: stepNumber++
  };
}

export function* dfsSteps(
  nodes: GraphNode[],
  edges: GraphEdge[],
  startNodeId: string
): Generator<GraphStep, void, unknown> {
  let stepNumber = 0;
  const visited: string[] = [];
  const stack: string[] = [startNodeId];
  const adjacencyList = buildAdjacencyList(nodes, edges);

  yield {
    state: {
      nodes: [...nodes],
      edges: [...edges],
      visited: [...visited],
      queue: [...stack],
      current: startNodeId
    },
    explanation: `Starting DFS from node ${startNodeId}`,
    stepNumber: stepNumber++
  };

  while (stack.length > 0) {
    const current = stack.pop()!;

    // Show popping step
    yield {
      state: {
        nodes: [...nodes],
        edges: [...edges],
        visited: [...visited],
        queue: [...stack],
        current
      },
      explanation: `Processing node ${current} from stack`,
      stepNumber: stepNumber++
    };

    if (!visited.includes(current)) {
      visited.push(current);

      yield {
        state: {
          nodes: [...nodes],
          edges: [...edges],
          visited: [...visited],
          queue: [...stack],
          current
        },
        explanation: `Visiting node ${current}`,
        stepNumber: stepNumber++
      };

      const neighbors = adjacencyList.get(current) || [];
      for (const neighbor of neighbors) {
        if (!visited.includes(neighbor) && !stack.includes(neighbor)) {
          stack.push(neighbor);

          yield {
            state: {
              nodes: [...nodes],
              edges: [...edges],
              visited: [...visited],
              queue: [...stack],
              current
            },
            explanation: `Adding neighbor ${neighbor} to stack`,
            stepNumber: stepNumber++
          };
        }
      }
    } else {
      yield {
        state: {
          nodes: [...nodes],
          edges: [...edges],
          visited: [...visited],
          queue: [...stack],
          current
        },
        explanation: `Node ${current} already visited, skipping`,
        stepNumber: stepNumber++
      };
    }
  }

  yield {
    state: {
      nodes: [...nodes],
      edges: [...edges],
      visited: [...visited],
      queue: [],
      current: undefined
    },
    explanation: 'DFS traversal complete',
    stepNumber: stepNumber++
  };
}

function buildAdjacencyList(nodes: GraphNode[], edges: GraphEdge[]): Map<string, string[]> {
  const adjacencyList = new Map<string, string[]>();

  nodes.forEach(node => {
    adjacencyList.set(node.id, []);
  });

  edges.forEach(edge => {
    adjacencyList.get(edge.from)?.push(edge.to);
    adjacencyList.get(edge.to)?.push(edge.from);
  });

  return adjacencyList;
}

export function generateSampleGraph(): { nodes: GraphNode[], edges: GraphEdge[] } {
  const nodes: GraphNode[] = [
    { id: 'A', x: 100, y: 100, label: 'A' },
    { id: 'B', x: 200, y: 100, label: 'B' },
    { id: 'C', x: 300, y: 100, label: 'C' },
    { id: 'D', x: 100, y: 200, label: 'D' },
    { id: 'E', x: 200, y: 200, label: 'E' },
    { id: 'F', x: 300, y: 200, label: 'F' }
  ];

  const edges: GraphEdge[] = [
    { from: 'A', to: 'B' },
    { from: 'A', to: 'D' },
    { from: 'B', to: 'C' },
    { from: 'B', to: 'E' },
    { from: 'C', to: 'F' },
    { from: 'D', to: 'E' },
    { from: 'E', to: 'F' }
  ];

  return { nodes, edges };
}