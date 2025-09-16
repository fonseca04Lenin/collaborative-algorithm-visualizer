# Collaborative Algorithm Visualizer

A real-time, collaborative web application for visualizing algorithm execution step-by-step. Multiple users can join the same session, watch each other's cursors live, and record/replay algorithm runs with auto-generated explanations.

## Features

- **Real-time Collaboration**: Multiple users can join sessions and see each other's cursors
- **Algorithm Visualization**: Step-by-step visualization of sorting and graph algorithms
- **Interactive Controls**: Play, pause, step forward/backward, and speed control
- **Auto-generated Explanations**: Each step includes human-readable explanations
- **Session Management**: Create or join sessions with simple codes
- **Replay System**: Record and replay algorithm executions

## Supported Algorithms

- **Bubble Sort**: Classic sorting algorithm with step-by-step comparisons and swaps
- **Breadth-First Search (BFS)**: Graph traversal algorithm
- **Depth-First Search (DFS)**: Graph traversal algorithm

## Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + Socket.IO
- **Real-time**: WebSocket communication for live collaboration
- **Visualization**: Custom React components with D3.js support

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Quick Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd Collaborative-Web-App
```

2. Run the setup script:
```bash
./setup.sh
```

3. Start the application:
```bash
./start.sh
```

4. Open your browser and navigate to:
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:3001`

### Manual Setup (Alternative)

If you prefer to set up manually:

1. Install dependencies for all packages:
```bash
# Install shared library dependencies
cd shared && npm install && cd ..

# Install backend dependencies  
cd backend && npm install && cd ..

# Install frontend dependencies
cd frontend && npm install && cd ..
```

2. Build the shared library:
```bash
cd shared && npm run build && cd ..
```

3. Start both servers:
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend  
cd frontend && npm run dev
```

### Usage

1. **Create a Session**: Click "Create New Session" to generate a session code
2. **Join a Session**: Enter a session code to join an existing session
3. **Select Algorithm**: Choose from available algorithms (Bubble Sort, BFS, DFS)
4. **Configure Input**: Set up input data for the selected algorithm
5. **Start Visualization**: Click "Start Visualization" to begin
6. **Control Playback**: Use the controls to play, pause, step through, or reset
7. **Collaborate**: Share the session code with others to collaborate in real-time

## Project Structure

```
Collaborative-Web-App/
├── frontend/          # React frontend application
├── backend/           # Node.js backend server
├── shared/            # Shared algorithms library
└── README.md
```

## API Endpoints

- `POST /api/sessions` - Create a new session
- `GET /api/sessions/:sessionId` - Get session information

## WebSocket Events

- `join-session` - Join a session
- `cursor-move` - Broadcast cursor position
- `update-session-state` - Update session state
- `start-algorithm` - Start algorithm execution

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
