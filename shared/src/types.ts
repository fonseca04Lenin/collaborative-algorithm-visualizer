export interface AlgorithmStep {
  state: any;
  explanation: string;
  stepNumber: number;
}

export interface SortingStep extends AlgorithmStep {
  state: {
    array: number[];
    comparing?: [number, number];
    swapping?: [number, number];
    sorted?: number[];
    // Merge sort specific
    dividing?: { left: number; right: number };
    merging?: { left: number; mid: number; right: number };
    leftArray?: number[];
    rightArray?: number[];
    // Quick sort specific
    pivot?: number;
    partitioning?: { left: number; right: number; pivot: number };
    partitioned?: { left: number; right: number };
  };
}

export interface GraphStep extends AlgorithmStep {
  state: {
    nodes: GraphNode[];
    edges: GraphEdge[];
    visited: string[];
    current?: string;
    queue?: string[];
    path?: string[];
  };
}

export interface GraphNode {
  id: string;
  x: number;
  y: number;
  label: string;
}

export interface GraphEdge {
  from: string;
  to: string;
  weight?: number;
}

export type AlgorithmType = 'bubbleSort' | 'mergeSort' | 'quickSort' | 'bfs' | 'dfs';

export interface SessionState {
  algorithm: AlgorithmType;
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  inputData: any;
  steps: AlgorithmStep[];
}
