#!/bin/bash

echo "Starting Algorithm Visualizer..."

# Function to kill background processes on exit
cleanup() {
    echo "Stopping server..."
    kill $FRONTEND_PID 2>/dev/null
    exit
}

# Set up trap to cleanup on script exit
trap cleanup EXIT INT TERM

# Start frontend server
echo "Starting frontend server..."
cd frontend
npm run dev &
FRONTEND_PID=$!

echo "Server is starting up!"
echo "Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop the server"

# Wait for the process
wait
