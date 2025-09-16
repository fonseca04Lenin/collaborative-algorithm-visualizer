import React from 'react';
import type { AlgorithmStep, AlgorithmType } from '../types';

interface ArrayVisualizerProps {
  step: AlgorithmStep;
  algorithm: AlgorithmType;
}

const ArrayVisualizer: React.FC<ArrayVisualizerProps> = ({ step, algorithm }) => {
  if (!step || !step.state) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 capitalize">
          {algorithm.replace(/([A-Z])/g, ' $1').trim()}
        </h2>
        <p className="text-gray-600">No step data available</p>
      </div>
    );
  }

  const { state } = step;
  const {
    array,
    comparing,
    swapping,
    sorted,
    dividing,
    merging,
    pivot,
    partitioning
  } = state;

  const getBarColor = (index: number) => {
    if (sorted && sorted.includes(index)) {
      return '#22c55e';
    }
    if (swapping && (swapping[0] === index || swapping[1] === index)) {
      return '#ef4444';
    }
    if (comparing && (comparing[0] === index || comparing[1] === index)) {
      return '#f59e0b';
    }
    if (pivot !== undefined && index === pivot) {
      return '#8b5cf6';
    }
    if (partitioning && index >= partitioning.left && index <= partitioning.right) {
      return '#06b6d4';
    }
    if (dividing && index >= dividing.left && index <= dividing.right) {
      return '#f97316';
    }
    if (merging && index >= merging.left && index <= merging.right) {
      return '#84cc16';
    }
    return '#3b82f6';
  };

  const getBarHeight = (value: number) => {
    const maxValue = Math.max(...array);
    const minHeight = 40;
    const maxHeight = 250;
    return minHeight + (value / maxValue) * (maxHeight - minHeight);
  };

  const getBorderColor = (index: number) => {
    if (sorted && sorted.includes(index)) {
      return '#16a34a';
    }
    if (swapping && (swapping[0] === index || swapping[1] === index)) {
      return '#dc2626';
    }
    if (comparing && (comparing[0] === index || comparing[1] === index)) {
      return '#d97706';
    }
    if (pivot !== undefined && index === pivot) {
      return '#7c3aed';
    }
    if (partitioning && index >= partitioning.left && index <= partitioning.right) {
      return '#0891b2';
    }
    if (dividing && index >= dividing.left && index <= dividing.right) {
      return '#ea580c';
    }
    if (merging && index >= merging.left && index <= merging.right) {
      return '#65a30d';
    }
    return '#2563eb';
  };

  const getBarScale = (index: number) => {
    if (swapping && (swapping[0] === index || swapping[1] === index)) {
      return 'scale(1.1)';
    }
    if (comparing && (comparing[0] === index || comparing[1] === index)) {
      return 'scale(1.05)';
    }
    return 'scale(1)';
  };

  return (
    <div className="h-full flex flex-col">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 capitalize">
          {algorithm.replace(/([A-Z])/g, ' $1').trim()}
        </h2>
        <div className="text-lg text-gray-600 mb-2">
          Array: <span className="font-mono font-semibold">[{array.join(', ')}]</span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-8">
        <div className="flex items-end justify-center space-x-3 min-h-[300px]">
          {array.map((value: number, index: number) => (
            <div
              key={index}
              className="flex flex-col items-center relative"
              style={{
                transform: getBarScale(index),
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <div
                className="text-lg font-bold text-white mb-2 bg-gray-700 px-2 py-1 rounded-md shadow-lg"
                style={{
                  backgroundColor: getBarColor(index),
                  borderColor: getBorderColor(index),
                  borderWidth: '2px',
                  borderStyle: 'solid',
                }}
              >
                {value}
              </div>

              <div
                className="relative rounded-lg shadow-lg border-2 transition-all duration-400 ease-out"
                style={{
                  height: `${getBarHeight(value)}px`,
                  width: '48px',
                  backgroundColor: getBarColor(index),
                  borderColor: getBorderColor(index),
                  boxShadow: swapping && (swapping[0] === index || swapping[1] === index)
                    ? '0 10px 25px rgba(239, 68, 68, 0.4)'
                    : comparing && (comparing[0] === index || comparing[1] === index)
                    ? '0 8px 20px rgba(245, 158, 11, 0.4)'
                    : '0 4px 15px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div
                  className="absolute inset-0 rounded-md"
                  style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.1) 100%)'
                  }}
                />

                {(comparing && (comparing[0] === index || comparing[1] === index)) && (
                  <div className="absolute inset-0 rounded-md animate-pulse bg-white opacity-20" />
                )}

                {(swapping && (swapping[0] === index || swapping[1] === index)) && (
                  <div className="absolute inset-0 rounded-md animate-bounce bg-white opacity-30" />
                )}
              </div>

              <div className="text-sm font-medium text-gray-600 mt-3 bg-gray-100 px-2 py-1 rounded-md">
                {index}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mx-8 mb-8 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-800 text-lg mb-3">Current Action</h3>

            {pivot !== undefined && (
              <div className="flex items-center space-x-3 p-3 bg-violet-50 rounded-lg border border-violet-200">
                <div className="w-4 h-4 bg-violet-500 rounded-full"></div>
                <span className="text-violet-700 font-medium">
                  Pivot element: {array[pivot]} at position {pivot}
                </span>
              </div>
            )}

            {partitioning && (
              <div className="flex items-center space-x-3 p-3 bg-cyan-50 rounded-lg border border-cyan-200">
                <div className="w-4 h-4 bg-cyan-500 rounded-full"></div>
                <span className="text-cyan-700 font-medium">
                  Partitioning array from position {partitioning.left} to {partitioning.right}
                </span>
              </div>
            )}

            {dividing && (
              <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                <span className="text-orange-700 font-medium">
                  Dividing array from position {dividing.left} to {dividing.right}
                </span>
              </div>
            )}

            {merging && (
              <div className="flex items-center space-x-3 p-3 bg-lime-50 rounded-lg border border-lime-200">
                <div className="w-4 h-4 bg-lime-500 rounded-full"></div>
                <span className="text-lime-700 font-medium">
                  Merging subarrays from position {merging.left} to {merging.right}
                </span>
              </div>
            )}

            {comparing && (
              <div className="flex items-center space-x-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                <div className="w-4 h-4 bg-amber-500 rounded-full"></div>
                <span className="text-amber-700 font-medium">
                  Comparing values {array[comparing[0]]} and {array[comparing[1]]} at positions {comparing[0]} and {comparing[1]}
                </span>
              </div>
            )}

            {swapping && (
              <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
                <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-700 font-medium">
                  Swapping values {array[swapping[0]]} and {array[swapping[1]]} at positions {swapping[0]} and {swapping[1]}
                </span>
              </div>
            )}

            {sorted && sorted.length > 0 && (
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-green-700 font-medium">
                  {sorted.length === array.length ? 'Array is completely sorted!' : `${sorted.length} element${sorted.length > 1 ? 's' : ''} in final position`}
                </span>
              </div>
            )}

            {!comparing && !swapping && !pivot && !partitioning && !dividing && !merging && (!sorted || sorted.length === 0) && (
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className="text-blue-700 font-medium">Ready to start sorting</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-gray-800 text-lg mb-3">Legend</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-amber-500 rounded border border-amber-600"></div>
                <span className="text-sm font-medium text-gray-700">Comparing</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded border border-red-600"></div>
                <span className="text-sm font-medium text-gray-700">Swapping</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded border border-green-600"></div>
                <span className="text-sm font-medium text-gray-700">Sorted</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded border border-blue-600"></div>
                <span className="text-sm font-medium text-gray-700">Unsorted</span>
              </div>
              {algorithm === 'quickSort' && (
                <>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-violet-500 rounded border border-violet-600"></div>
                    <span className="text-sm font-medium text-gray-700">Pivot</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-cyan-500 rounded border border-cyan-600"></div>
                    <span className="text-sm font-medium text-gray-700">Partitioning</span>
                  </div>
                </>
              )}
              {algorithm === 'mergeSort' && (
                <>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-orange-500 rounded border border-orange-600"></div>
                    <span className="text-sm font-medium text-gray-700">Dividing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-lime-500 rounded border border-lime-600"></div>
                    <span className="text-sm font-medium text-gray-700">Merging</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArrayVisualizer;