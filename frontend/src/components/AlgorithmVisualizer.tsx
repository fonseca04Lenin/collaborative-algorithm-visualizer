import React, { useState, useEffect } from 'react';
import ArrayVisualizer from './ArrayVisualizer';
import GraphVisualizer from './GraphVisualizer';
import Controls from './Controls';
import type { AlgorithmType, AlgorithmStep } from '../types';
import { bubbleSortSteps, mergeSortSteps, quickSortSteps } from '../algorithms/sorting';
import { bfsSteps, dfsSteps } from '../algorithms/graph';

const getAlgorithmDescription = (algorithm: AlgorithmType): { title: string; description: string; complexity: string; howItWorks: string } => {
  switch (algorithm) {
    case 'bubbleSort':
      return {
        title: 'Bubble Sort',
        description: 'Bubble Sort is one of the simplest sorting algorithms to understand. It repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.',
        complexity: 'Time: O(n²) average and worst case, O(n) best case | Space: O(1)',
        howItWorks: 'The algorithm gets its name because smaller elements "bubble" to the top of the list. After each complete pass through the array, the largest unsorted element is guaranteed to be in its correct position at the end.'
      };
    case 'mergeSort':
      return {
        title: 'Merge Sort',
        description: 'Merge Sort is a divide-and-conquer algorithm that divides the array into halves, recursively sorts each half, and then merges the sorted halves back together.',
        complexity: 'Time: O(n log n) all cases | Space: O(n)',
        howItWorks: 'It works by continuously splitting the array in half until each subarray has only one element, then merging these subarrays back together in sorted order. This guarantees consistent O(n log n) performance.'
      };
    case 'quickSort':
      return {
        title: 'Quick Sort',
        description: 'Quick Sort is a highly efficient divide-and-conquer algorithm that picks a "pivot" element and partitions the array around it, placing smaller elements before and larger elements after the pivot.',
        complexity: 'Time: O(n log n) average case, O(n²) worst case | Space: O(log n)',
        howItWorks: 'After partitioning, the pivot is in its final sorted position. The algorithm then recursively sorts the subarrays on either side of the pivot. Despite its worst-case O(n²) complexity, it performs very well in practice.'
      };
    case 'bfs':
      return {
        title: 'Breadth-First Search (BFS)',
        description: 'BFS is a graph traversal algorithm that explores all vertices at the current depth level before moving to vertices at the next depth level.',
        complexity: 'Time: O(V + E) where V is vertices and E is edges | Space: O(V)',
        howItWorks: 'It uses a queue data structure to keep track of vertices to visit. BFS guarantees the shortest path in unweighted graphs and is useful for finding the minimum number of edges between two nodes.'
      };
    case 'dfs':
      return {
        title: 'Depth-First Search (DFS)',
        description: 'DFS is a graph traversal algorithm that explores as far as possible along each branch before backtracking to explore other branches.',
        complexity: 'Time: O(V + E) where V is vertices and E is edges | Space: O(V)',
        howItWorks: 'It uses a stack (or recursion) to keep track of vertices to visit. DFS is useful for detecting cycles, finding connected components, and solving maze-like problems where you need to explore all possible paths.'
      };
    default:
      return {
        title: 'Algorithm',
        description: 'Select an algorithm to see its description.',
        complexity: '',
        howItWorks: ''
      };
  }
};

interface AlgorithmVisualizerProps {
  algorithm: AlgorithmType;
  inputData: any;
  onBack: () => void;
}

const AlgorithmVisualizer: React.FC<AlgorithmVisualizerProps> = ({
  algorithm,
  inputData,
  onBack
}) => {
  const [currentStep, setCurrentStep] = useState<AlgorithmStep | null>(null);
  const [steps, setSteps] = useState<AlgorithmStep[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1000);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const generateSteps = (algorithm: AlgorithmType, inputData: any): AlgorithmStep[] => {
    const stepArray: AlgorithmStep[] = [];

    switch (algorithm) {
      case 'bubbleSort':
        const bubbleSteps = bubbleSortSteps(inputData.array);
        stepArray.push(...bubbleSteps);
        break;
      case 'mergeSort':
        const mergeSteps = mergeSortSteps(inputData.array);
        stepArray.push(...mergeSteps);
        break;
      case 'quickSort':
        const quickSteps = quickSortSteps(inputData.array);
        stepArray.push(...quickSteps);
        break;
      case 'bfs':
        for (const step of bfsSteps(inputData.nodes, inputData.edges, inputData.startNode)) {
          stepArray.push(step);
        }
        break;
      case 'dfs':
        for (const step of dfsSteps(inputData.nodes, inputData.edges, inputData.startNode)) {
          stepArray.push(step);
        }
        break;
    }

    return stepArray;
  };

  useEffect(() => {
    const newSteps = generateSteps(algorithm, inputData);
    setSteps(newSteps);
    setCurrentStep(newSteps[0] || null);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [algorithm, inputData]);

  const handleStepChange = (stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < steps.length) {
      setCurrentStepIndex(stepIndex);
      setCurrentStep(steps[stepIndex]);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setCurrentStep(steps[0] || null);
    setIsPlaying(false);
  };

  // Auto-play functionality
  useEffect(() => {
    let interval: number | undefined;

    if (isPlaying && currentStepIndex < steps.length - 1) {
      interval = window.setInterval(() => {
        setCurrentStepIndex(prevIndex => {
          const nextStep = prevIndex + 1;
          if (nextStep < steps.length) {
            setCurrentStep(steps[nextStep]);
            if (nextStep >= steps.length - 1) {
              setIsPlaying(false);
            }
            return nextStep;
          }
          return prevIndex;
        });
      }, playbackSpeed);
    }

    return () => {
      if (interval !== undefined) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, steps.length, playbackSpeed]);

  const renderVisualization = () => {
    if (!currentStep) return null;

    switch (algorithm) {
      case 'bubbleSort':
      case 'mergeSort':
      case 'quickSort':
        return (
          <ArrayVisualizer
            step={currentStep}
            algorithm={algorithm}
          />
        );
      case 'bfs':
      case 'dfs':
        return (
          <GraphVisualizer
            step={currentStep}
            algorithm={algorithm}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">
            Algorithm Visualizer
          </h1>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-500">
              Algorithm: {algorithm}
            </div>
            <button
              onClick={onBack}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            >
              Back
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow-sm p-6 h-full">
          {renderVisualization()}
        </div>
      </div>

      <div className="bg-white border-t p-6">
        <Controls
          currentStep={currentStepIndex}
          totalSteps={steps.length}
          isPlaying={isPlaying}
          onStepChange={handleStepChange}
          onPlayPause={handlePlayPause}
          onReset={handleReset}
          playbackSpeed={playbackSpeed}
          onPlaybackSpeedChange={setPlaybackSpeed}
        />

        {currentStep && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Step {currentStep.stepNumber + 1}:</strong> {currentStep.explanation}
            </p>
          </div>
        )}

        <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-900">
              About {getAlgorithmDescription(algorithm).title}
            </h3>

            <p className="text-blue-800 leading-relaxed">
              {getAlgorithmDescription(algorithm).description}
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {getAlgorithmDescription(algorithm).complexity && (
                <div className="bg-white border border-blue-200 rounded-md p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    Complexity Analysis
                  </h4>
                  <p className="text-sm text-blue-700 font-mono bg-blue-50 p-2 rounded">
                    {getAlgorithmDescription(algorithm).complexity}
                  </p>
                </div>
              )}

              {getAlgorithmDescription(algorithm).howItWorks && (
                <div className="bg-white border border-blue-200 rounded-md p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    How It Works
                  </h4>
                  <p className="text-sm text-blue-700 leading-relaxed">
                    {getAlgorithmDescription(algorithm).howItWorks}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmVisualizer;