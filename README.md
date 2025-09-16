# Algorithm Visualizer

An interactive web application for visualizing algorithm execution step-by-step with auto-generated explanations.

## Features

- **Algorithm Visualization**: Step-by-step visualization of sorting and graph algorithms
- **Interactive Controls**: Play, pause, step forward/backward, and speed control
- **Auto-generated Explanations**: Each step includes human-readable explanations
- **Educational Content**: Learn how algorithms work with detailed explanations

## Supported Algorithms

- **Bubble Sort**: Classic sorting algorithm with step-by-step comparisons and swaps
- **Breadth-First Search (BFS)**: Graph traversal algorithm
- **Depth-First Search (DFS)**: Graph traversal algorithm

## Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **Visualization**: Custom React components with D3.js support
- **Algorithms**: Generator functions for step-by-step execution

## 🌐 Live Demo

**Try it online**: [https://fonseca04lenin.github.io/collaborative-algorithm-visualizer/](https://fonseca04lenin.github.io/collaborative-algorithm-visualizer/)

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

# Install frontend dependencies
cd frontend && npm install && cd ..
```

2. Build the shared library:
```bash
cd shared && npm run build && cd ..
```

3. Start the frontend server:
```bash
cd frontend && npm run dev
```

### Usage

1. **Select Algorithm**: Choose from available algorithms (Bubble Sort, BFS, DFS)
2. **Configure Input**: Set up input data for the selected algorithm
3. **Start Visualization**: Click "Start Visualization" to begin
4. **Control Playback**: Use the controls to play, pause, step through, or reset

## Project Structure

```
Algorithm-Visualizer/
├── frontend/          # React frontend application
├── shared/            # Shared algorithms library
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
