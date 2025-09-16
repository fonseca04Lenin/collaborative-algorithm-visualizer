#!/bin/bash

echo "Setting up Algorithm Visualizer..."

# Install dependencies for all packages
echo "Installing shared dependencies..."
cd shared && npm install && cd ..

echo "Installing frontend dependencies..."
cd frontend && npm install && cd ..

echo "Building shared package..."
cd shared && npm run build && cd ..

echo "Setup complete!"
echo ""
echo "To start the application:"
echo "  ./start.sh"
echo ""
echo "Or manually:"
echo "  cd frontend && npm run dev"
