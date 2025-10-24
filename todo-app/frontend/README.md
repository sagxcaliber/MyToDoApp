# Todo App Frontend

A modern, responsive React frontend for the Todo App built with Vite.

## Features

- ✨ Modern, beautiful UI with gradient backgrounds
- 📱 Fully responsive design
- ⚡ Fast development with Vite
- 🎯 Real-time todo management
- ✏️ Inline editing capabilities
- 🗑️ Delete confirmation
- 📊 Todo statistics
- 🎨 Smooth animations and transitions

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **CSS3** - Styling with modern features

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Docker

The frontend can be containerized using Docker:

```bash
docker build -t todo-frontend .
docker run -p 3000:80 todo-frontend
```

## Environment Variables

- `VITE_API_URL` - Backend API URL (default: http://51.21.191.178:8000)

## API Integration

The frontend communicates with the FastAPI backend through the following endpoints:

- `GET /todos` - Get all todos
- `POST /todos` - Create a new todo
- `PUT /todos/{id}` - Update a todo
- `DELETE /todos/{id}` - Delete a todo

## Project Structure

```
src/
├── components/          # React components
│   ├── TodoForm.jsx     # Add new todo form
│   ├── TodoItem.jsx     # Individual todo item
│   └── TodoList.jsx     # Todo list container
├── services/            # API services
│   └── api.js          # API client
├── App.jsx             # Main app component
├── main.jsx            # App entry point
└── index.css           # Global styles
```
