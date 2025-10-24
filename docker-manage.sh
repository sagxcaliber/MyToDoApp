#!/bin/bash

# Docker Compose Management Script for Todo App

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker Desktop and try again."
        exit 1
    fi
}

# Function to check if docker-compose is available
check_compose() {
    if command -v docker-compose &> /dev/null; then
        COMPOSE_CMD="docker-compose"
    elif docker compose version &> /dev/null; then
        COMPOSE_CMD="docker compose"
    else
        print_error "Neither docker-compose nor 'docker compose' is available."
        exit 1
    fi
}

# Function to build and start services
start_services() {
    print_status "Building and starting Todo App services..."
    
    # Navigate to todo-app directory
    cd todo-app
    
    # Build and start services
    $COMPOSE_CMD up --build -d
    
    print_success "Services started successfully!"
    print_status "Waiting for services to be healthy..."
    
    # Wait for services to be ready
    sleep 10
    
    # Check service status
    $COMPOSE_CMD ps
    
    echo ""
    print_success "🎉 Todo App is now running!"
    echo ""
    echo -e "${GREEN}📱 Frontend:${NC} http://localhost:3000"
    echo -e "${GREEN}🔧 Backend API:${NC} http://localhost:8000"
    echo -e "${GREEN}📚 API Documentation:${NC} http://localhost:8000/docs"
    echo ""
    echo -e "${BLUE}To view logs:${NC} $COMPOSE_CMD logs -f"
    echo -e "${BLUE}To stop services:${NC} $COMPOSE_CMD down"
}

# Function to stop services
stop_services() {
    print_status "Stopping Todo App services..."
    cd todo-app
    $COMPOSE_CMD down
    print_success "Services stopped successfully!"
}

# Function to restart services
restart_services() {
    print_status "Restarting Todo App services..."
    cd todo-app
    $COMPOSE_CMD restart
    print_success "Services restarted successfully!"
}

# Function to view logs
view_logs() {
    cd todo-app
    print_status "Showing logs (Press Ctrl+C to exit)..."
    $COMPOSE_CMD logs -f
}

# Function to clean up
cleanup() {
    print_status "Cleaning up Docker resources..."
    cd todo-app
    $COMPOSE_CMD down -v --remove-orphans
    docker system prune -f
    print_success "Cleanup completed!"
}

# Function to show help
show_help() {
    echo "Todo App Docker Management Script"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  start     Build and start all services (default)"
    echo "  stop      Stop all services"
    echo "  restart   Restart all services"
    echo "  logs      View service logs"
    echo "  status    Show service status"
    echo "  cleanup   Stop services and clean up Docker resources"
    echo "  help      Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 start    # Start the application"
    echo "  $0 logs     # View logs"
    echo "  $0 stop     # Stop the application"
}

# Main script logic
main() {
    # Check prerequisites
    check_docker
    check_compose
    
    # Parse command line arguments
    case "${1:-start}" in
        start)
            start_services
            ;;
        stop)
            stop_services
            ;;
        restart)
            restart_services
            ;;
        logs)
            view_logs
            ;;
        status)
            cd todo-app
            $COMPOSE_CMD ps
            ;;
        cleanup)
            cleanup
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            print_error "Unknown command: $1"
            show_help
            exit 1
            ;;
    esac
}

# Run main function
main "$@"
