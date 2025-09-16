import React, { useState } from 'react';

interface SessionManagerProps {
  onJoinSession: (sessionId: string) => void;
  onCreateSession: () => void;
}

const SessionManager: React.FC<SessionManagerProps> = ({ onJoinSession, onCreateSession }) => {
  const [sessionId, setSessionId] = useState('');

  const handleJoinSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (sessionId.trim()) {
      onJoinSession(sessionId.trim().toUpperCase());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Algorithm Visualizer
          </h1>
          <p className="text-gray-600">
            Collaborative real-time algorithm visualization
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Join Existing Session
            </h2>
            <form onSubmit={handleJoinSession} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={sessionId}
                  onChange={(e) => setSessionId(e.target.value)}
                  placeholder="Enter session code (e.g., ABC123)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  maxLength={6}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                Join Session
              </button>
            </form>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Create New Session
            </h2>
            <button
              onClick={onCreateSession}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
            >
              Create New Session
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Share the session code with others to collaborate in real-time
          </p>
        </div>
      </div>
    </div>
  );
};

export default SessionManager;
