import React, { useState } from 'react';
import AlgorithmVisualizer from './components/AlgorithmVisualizer';
import type { SessionState, AlgorithmType } from './types';

const App: React.FC = () => {
  const [sessionState, setSessionState] = useState<SessionState | null>(null);

  const handleSessionStateUpdate = (newState: SessionState) => {
    setSessionState(newState);
  };

  const handleStartAlgorithm = (_algorithm: AlgorithmType, _inputData: any) => {
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AlgorithmVisualizer
        sessionState={sessionState}
        onSessionStateUpdate={handleSessionStateUpdate}
        onStartAlgorithm={handleStartAlgorithm}
      />
    </div>
  );
};

export default App;