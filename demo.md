# Algorithm Visualizer Demo Guide

## Quick Start

1. **Install dependencies:**
   ```bash
   npm run install-all
   ```

2. **Start the application:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## Demo Scenarios

### Scenario 1: Bubble Sort Visualization

1. **Create a new session** by clicking "Create New Session"
2. **Select Bubble Sort** from the algorithm options
3. **Modify the array** (optional): Change `[5, 3, 8, 1, 2]` to your preferred values
4. **Click "Start Visualization"**
5. **Use controls:**
   - Click "Play" to auto-advance through steps
   - Use "Previous"/"Next" to step manually
   - Adjust playback speed (0.5x to 4x)
   - Use the progress slider to jump to any step

### Scenario 2: Graph Traversal (BFS/DFS)

1. **Create a new session**
2. **Select BFS or DFS** from the algorithm options
3. **Choose a start node** (A, B, C, D, E, or F)
4. **Click "Start Visualization"**
5. **Watch the traversal:**
   - Red node = currently being processed
   - Green nodes = already visited
   - Yellow nodes = in queue/stack
   - Blue nodes = unvisited

### Scenario 3: Multi-User Collaboration

1. **Create a session** and note the session code (e.g., "ABC123")
2. **Open another browser tab/window** and go to http://localhost:5173
3. **Join the session** using the session code
4. **Move your mouse** in both windows to see live cursor tracking
5. **One user starts an algorithm** - both users see the same visualization
6. **Both users can control playback** - changes sync in real-time

## Features Demonstrated

### Real-time Collaboration
- Multi-user sessions with live cursor tracking
- Synchronized algorithm state across all users
- Real-time WebSocket communication

### Algorithm Visualization
- **Bubble Sort**: Step-by-step array sorting with color-coded comparisons
- **BFS**: Breadth-first graph traversal with queue visualization
- **DFS**: Depth-first graph traversal with stack visualization

### Interactive Controls
- Play/Pause/Reset functionality
- Manual step navigation (Previous/Next)
- Variable playback speed (0.5x to 4x)
- Progress slider for time-travel navigation

### Auto-generated Explanations
- Each step includes human-readable explanations
- Context-aware descriptions based on algorithm state
- Educational content for learning algorithms

### Session Management
- Create new sessions with unique codes
- Join existing sessions
- Persistent session state

## Technical Architecture

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + Socket.IO
- **Real-time**: WebSocket communication for live collaboration
- **Algorithms**: Generator functions for step-by-step execution
- **Visualization**: Custom React components with SVG graphics

## API Endpoints

- `POST /api/sessions` - Create new session
- `GET /api/sessions/:id` - Get session info

## WebSocket Events

- `join-session` - Join a session
- `cursor-move` - Broadcast cursor position
- `update-session-state` - Sync algorithm state
- `start-algorithm` - Start algorithm execution

## Next Steps for Enhancement

1. **More Algorithms**: Merge Sort, Quick Sort, Dijkstra's Algorithm
2. **User Avatars**: Color-coded cursors with user names
3. **Chat System**: Real-time messaging during collaboration
4. **Export/Import**: Save and share algorithm runs
5. **Mobile Support**: Responsive design for mobile devices
6. **Performance**: Optimize for larger datasets and more users
