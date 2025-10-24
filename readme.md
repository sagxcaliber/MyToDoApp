# 📝 Todo App

A full-stack todo application with a modern React frontend and FastAPI backend.

## ✨ Features

- **Modern UI**: Beautiful, responsive design with gradient backgrounds
- **Real-time Updates**: Instant todo management with live updates
- **Inline Editing**: Edit todos directly in the list
- **Smart Organization**: Separate sections for pending and completed todos
- **Statistics**: Track your productivity with todo counts
- **Mobile Friendly**: Fully responsive design for all devices

## 🚀 Quick Start

### Option 1: Docker (Recommended)

```bash
# Start both frontend and backend
./start-app.sh
```

### Option 2: Manual Setup

1. **Start the Backend**:
```bash
cd todo-app/backend
pip install -r app/requirements.txt
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

2. **Start the Frontend**:
```bash
cd todo-app/frontend
npm install
npm run dev
```

3. **Access the App**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## 🏗️ Architecture

### Backend (FastAPI)
- **Framework**: FastAPI with SQLModel
- **Database**: SQLite with automatic migrations
- **API**: RESTful endpoints with automatic documentation
- **CORS**: Configured for frontend communication

### Frontend (React + Vite)
- **Framework**: React 18 with hooks
- **Build Tool**: Vite for fast development
- **Styling**: Modern CSS with gradients and animations
- **HTTP Client**: Axios for API communication
- **Icons**: Lucide React for beautiful icons

## 📁 Project Structure

```
todo-app/
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI application
│   │   ├── models.py         # Todo data model
│   │   ├── crud.py          # Database operations
│   │   ├── database.py      # Database connection
│   │   └── requirements.txt # Python dependencies
│   └── Dockerfile           # Backend container
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API client
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # App entry point
│   ├── package.json         # Node.js dependencies
│   └── Dockerfile           # Frontend container
└── docker-compose.yml       # Multi-container setup
```

## 🔧 Development

### Backend Development
- Hot reload enabled with `--reload` flag
- Automatic API documentation at `/docs`
- Database auto-initialization on startup

### Frontend Development
- Vite dev server with hot module replacement
- Environment variables support
- Modern ES6+ features

## 🐳 Docker Deployment

The app is fully containerized and can be deployed anywhere Docker runs:

```bash
cd todo-app
docker-compose up --build
```

This will:
- Build both frontend and backend containers
- Set up networking between services
- Expose frontend on port 3000
- Expose backend on port 8000

## 📱 Usage

1. **Add Todos**: Click the input field and type your todo
2. **Add Description**: Click to expand and add optional details
3. **Complete Todos**: Click the circle button to mark as done
4. **Edit Todos**: Click the edit icon to modify inline
5. **Delete Todos**: Click the trash icon (with confirmation)
6. **View Stats**: See your progress in the footer

## 🛠️ API Endpoints

- `GET /todos` - Get all todos
- `POST /todos` - Create a new todo
- `PUT /todos/{id}` - Update a todo
- `DELETE /todos/{id}` - Delete a todo
- `GET /docs` - Interactive API documentation

## 🎨 Customization

The app uses CSS custom properties for easy theming. Modify the gradient colors in `index.css` to match your brand.

## 📄 License

This project is open source and available under the MIT License.
