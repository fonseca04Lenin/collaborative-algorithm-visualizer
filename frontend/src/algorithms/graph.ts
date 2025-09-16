import type { GraphStep, GraphNode, GraphEdge } from '../types';
import {
  bfsSteps as sharedBfsSteps,
  dfsSteps as sharedDfsSteps,
  generateSampleGraph as sharedGenerateSampleGraph
} from '../../../shared/dist/algorithms/graph';

export function* bfsSteps(
  nodes: GraphNode[],
  edges: GraphEdge[],
  startNodeId: string
): Generator<GraphStep, void, unknown> {
  yield* sharedBfsSteps(nodes, edges, startNodeId);
}

export function* dfsSteps(
  nodes: GraphNode[],
  edges: GraphEdge[],
  startNodeId: string
): Generator<GraphStep, void, unknown> {
  yield* sharedDfsSteps(nodes, edges, startNodeId);
}

export function generateSampleGraph(): { nodes: GraphNode[], edges: GraphEdge[] } {
  return sharedGenerateSampleGraph();
}