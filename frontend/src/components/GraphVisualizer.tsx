import React from 'react';
import type { AlgorithmStep, AlgorithmType, GraphNode, GraphEdge } from '../types';

interface GraphVisualizerProps {
  step: AlgorithmStep;
  algorithm: AlgorithmType;
}

const GraphVisualizer: React.FC<GraphVisualizerProps> = ({ step, algorithm }) => {
  const { state } = step;
  const { nodes, edges, visited, current, queue } = state;

  const getNodeColor = (nodeId: string) => {
    if (current === nodeId) {
      return '#ef4444'; // red-500
    }
    if (visited.includes(nodeId)) {
      return '#22c55e'; // green-500
    }
    if (queue && queue.includes(nodeId)) {
      return '#eab308'; // yellow-500
    }
    return '#3b82f6'; // blue-500
  };

  const getEdgeColor = (from: string, to: string) => {
    if (visited.includes(from) && visited.includes(to)) {
      return '#22c55e'; // green-500
    }
    return '#d1d5db'; // gray-300
  };

  const getEdgeWidth = (from: string, to: string) => {
    if (visited.includes(from) && visited.includes(to)) {
      return '3';
    }
    return '2';
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        {algorithm.toUpperCase()} Traversal
      </h2>
      
      <div className="flex-1 flex">
        <div className="flex-1 flex items-center justify-center">
          <svg
            width="500"
            height="400"
            viewBox="0 0 500 400"
            className="border border-gray-200 rounded-lg bg-white"
          >
            {edges.map((edge: GraphEdge, index: number) => {
              const fromNode = nodes.find((n: GraphNode) => n.id === edge.from);
              const toNode = nodes.find((n: GraphNode) => n.id === edge.to);
              
              if (!fromNode || !toNode) return null;
              
              return (
                <line
                  key={index}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  style={{
                    stroke: getEdgeColor(edge.from, edge.to),
                    strokeWidth: getEdgeWidth(edge.from, edge.to),
                    transition: 'all 0.3s ease'
                  }}
                />
              );
            })}
            
            {nodes.map((node: GraphNode) => (
              <g key={node.id}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="20"
                  style={{
                    fill: getNodeColor(node.id),
                    transition: 'all 0.3s ease'
                  }}
                />
                <text
                  x={node.x}
                  y={node.y + 5}
                  textAnchor="middle"
                  style={{
                    fill: 'white',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif'
                  }}
                >
                  {node.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
        
        <div className="w-64 p-4 space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Status</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">Current:</span>{' '}
                <span className="text-red-600 font-bold">
                  {current || 'None'}
                </span>
              </div>
              <div>
                <span className="font-medium">Visited:</span>{' '}
                <span className="text-green-600">
                  {visited.length > 0 ? visited.join(', ') : 'None'}
                </span>
              </div>
              <div>
                <span className="font-medium">Queue/Stack:</span>{' '}
                <span className="text-yellow-600">
                  {queue && queue.length > 0 ? queue.join(', ') : 'Empty'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Legend</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span>Current</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span>Visited</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <span>In Queue/Stack</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span>Unvisited</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphVisualizer;
