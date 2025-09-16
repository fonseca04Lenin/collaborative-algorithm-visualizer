import React, { useState } from 'react';
import AlgorithmVisualizer from './components/AlgorithmVisualizer';
import AlgorithmSelector from './components/AlgorithmSelector';
import type { AlgorithmType } from './types';

const App: React.FC = () => {
  const [currentAlgorithm, setCurrentAlgorithm] = useState<AlgorithmType | null>(null);
  const [inputData, setInputData] = useState<any>(null);

  const handleStartAlgorithm = (algorithm: AlgorithmType, data: any) => {
    setCurrentAlgorithm(algorithm);
    setInputData(data);
  };

  if (currentAlgorithm && inputData) {
    return (
      <div className="min-h-screen bg-gray-100">
        <AlgorithmVisualizer
          algorithm={currentAlgorithm}
          inputData={inputData}
          onBack={() => {
            setCurrentAlgorithm(null);
            setInputData(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AlgorithmSelector onStartAlgorithm={handleStartAlgorithm} />
    </div>
  );
};

export default App;