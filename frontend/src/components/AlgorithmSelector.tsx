import React, { useState } from 'react';
import type { AlgorithmType } from '../types';
import { generateSampleGraph } from '../algorithms/graph';

interface AlgorithmSelectorProps {
  onStartAlgorithm: (algorithm: AlgorithmType, inputData: any) => void;
  currentAlgorithm?: AlgorithmType;
}

const AlgorithmSelector: React.FC<AlgorithmSelectorProps> = ({
  onStartAlgorithm,
  currentAlgorithm: _currentAlgorithm
}) => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmType>('bubbleSort');
  const [inputData, setInputData] = useState<any>({
    array: [5, 3, 8, 1, 2]
  });
  const [arrayInput, setArrayInput] = useState<string>('[5, 3, 8, 1, 2]');
  const [inputError, setInputError] = useState<string>('');

  const algorithms = [
    { id: 'bubbleSort' as AlgorithmType, name: 'Bubble Sort', description: 'Simple O(n²) sorting algorithm' },
    { id: 'mergeSort' as AlgorithmType, name: 'Merge Sort', description: 'Efficient O(n log n) divide-and-conquer sort' },
    { id: 'quickSort' as AlgorithmType, name: 'Quick Sort', description: 'Fast O(n log n) pivot-based sorting' },
    { id: 'bfs' as AlgorithmType, name: 'Breadth-First Search', description: 'Graph traversal algorithm' },
    { id: 'dfs' as AlgorithmType, name: 'Depth-First Search', description: 'Graph traversal algorithm' }
  ];


  const handleAlgorithmChange = (algorithm: AlgorithmType) => {
    setSelectedAlgorithm(algorithm);
    setInputError('');

    if (algorithm === 'bubbleSort' || algorithm === 'mergeSort' || algorithm === 'quickSort') {
      setInputData({ array: [5, 3, 8, 1, 2] });
      setArrayInput('[5, 3, 8, 1, 2]');
    } else if (algorithm === 'bfs' || algorithm === 'dfs') {
      const { nodes, edges } = generateSampleGraph();
      setInputData({
        nodes,
        edges,
        startNode: 'A'
      });
    }
  };

  const parseArrayInput = (value: string): { success: boolean; array?: number[]; error?: string } => {
    // Clean up the input - remove extra spaces, handle different formats
    const cleanValue = value.trim();

    // Try to parse different formats
    let arrayToParse = cleanValue;

    // If it doesn't start with [, add brackets
    if (!cleanValue.startsWith('[') && !cleanValue.startsWith('{')) {
      // Handle comma-separated values like "5, 3, 8, 1, 2"
      arrayToParse = `[${cleanValue}]`;
    }

    try {
      const parsed = JSON.parse(arrayToParse);

      if (!Array.isArray(parsed)) {
        return { success: false, error: 'Input must be an array' };
      }

      // Check if all elements are numbers
      for (let i = 0; i < parsed.length; i++) {
        const num = Number(parsed[i]);
        if (isNaN(num) || !isFinite(num)) {
          return { success: false, error: `Element at index ${i} (${parsed[i]}) is not a valid number` };
        }
        parsed[i] = num; // Convert to number
      }

      if (parsed.length === 0) {
        return { success: false, error: 'Array cannot be empty' };
      }

      if (parsed.length > 20) {
        return { success: false, error: 'Array cannot have more than 20 elements' };
      }

      return { success: true, array: parsed };
    } catch (e) {
      return { success: false, error: 'Invalid format. Use [1,2,3] or 1,2,3' };
    }
  };

  const handleArrayInputChange = (value: string) => {
    setArrayInput(value);

    const result = parseArrayInput(value);

    if (result.success && result.array) {
      setInputData({ array: result.array });
      setInputError('');
    } else {
      setInputError(result.error || 'Invalid input');
    }
  };

  const handleStartAlgorithm = () => {
    onStartAlgorithm(selectedAlgorithm, inputData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full mx-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Algorithm Visualizer
          </h1>
          <p className="text-gray-600">
            Interactive algorithm visualization and learning
          </p>
        </div>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Select Algorithm
            </h2>
            
            <div className="space-y-3">
              {algorithms.map((algo) => (
                <label
                  key={algo.id}
                  className={`block p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedAlgorithm === algo.id
                      ? 'border-blue-500 bg-blue-50 shadow-md ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="algorithm"
                    value={algo.id}
                    checked={selectedAlgorithm === algo.id}
                    onChange={() => handleAlgorithmChange(algo.id)}
                    className="sr-only"
                  />
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`font-medium ${selectedAlgorithm === algo.id ? 'text-blue-900' : 'text-gray-800'}`}>
                        {algo.name}
                      </div>
                      <div className={`text-sm ${selectedAlgorithm === algo.id ? 'text-blue-700' : 'text-gray-600'}`}>
                        {algo.description}
                      </div>
                    </div>
                    {selectedAlgorithm === algo.id && (
                      <div className="flex-shrink-0">
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-md font-semibold text-gray-800 mb-3">
              Input Data
            </h3>
        
            {(selectedAlgorithm === 'bubbleSort' || selectedAlgorithm === 'mergeSort' || selectedAlgorithm === 'quickSort') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Array to sort:
                </label>
                <input
                  type="text"
                  value={arrayInput}
                  onChange={(e) => handleArrayInputChange(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:border-transparent transition-colors ${
                    inputError
                      ? 'border-red-300 focus:ring-red-500 bg-red-50'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="[5, 3, 8, 1, 2] or 5, 3, 8, 1, 2"
                />
                {inputError ? (
                  <p className="text-xs text-red-600 mt-1 flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {inputError}
                  </p>
                ) : (
                  <div className="text-xs text-gray-500 mt-1">
                    <p>Valid formats: <code>[1,2,3]</code> or <code>1,2,3</code> or <code>1, 2, 3</code></p>
                    <p>Current array: <span className="font-mono font-semibold">[{inputData?.array?.join(', ') || ''}]</span></p>
                  </div>
                )}
              </div>
            )}

            {(selectedAlgorithm === 'bfs' || selectedAlgorithm === 'dfs') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Node:
                </label>
                <select
                  value={inputData?.startNode || 'A'}
                  onChange={(e) => setInputData({ ...inputData, startNode: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {inputData?.nodes?.map((node: any) => (
                    <option key={node.id} value={node.id}>
                      {node.label}
                    </option>
                  )) || (
                    <option value="A">A</option>
                  )}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Sample graph provided
                </p>
              </div>
            )}
          </div>

          <button
            onClick={handleStartAlgorithm}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Start Visualization
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmSelector;
