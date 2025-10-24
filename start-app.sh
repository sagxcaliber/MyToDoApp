#!/bin/bash

# Todo App Startup Script

echo "🚀 Starting Todo App..."

# Check if docker-compose is available
if command -v docker-compose &> /dev/null; then
    echo "📦 Starting with Docker Compose..."
    cd todo-app
    docker-compose up --build
elif command -v docker &> /dev/null && command -v compose &> /dev/null; then
    echo "📦 Starting with Docker Compose (newer version)..."
    cd todo-app
    docker compose up --build
else
    echo "🐍 Starting with Python and Node.js..."
    
    # Start backend
    echo "Starting FastAPI backend..."
    cd todo-app/backend
    python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 &
    BACKEND_PID=$!
    
    # Wait a moment for backend to start
    sleep 3
    
    # Start frontend
    echo "Starting React frontend..."
    cd ../frontend
    npm run dev &
    FRONTEND_PID=$!
    
    echo "✅ Both services are running!"
    echo "🌐 Frontend: http://localhost:3000"
    echo "🔧 Backend API: http://localhost:8000"
    echo "📚 API Docs: http://localhost:8000/docs"
    echo ""
    echo "Press Ctrl+C to stop both services"
    
    # Wait for user to stop
    wait $BACKEND_PID $FRONTEND_PID
fi
