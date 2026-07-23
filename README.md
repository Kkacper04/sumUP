# SumUP

SumUP is a lightweight project management application with a modern UI. It allows you to quickly add, track, and manage your daily projects.

## Features

- **Project Tracking:** Add, remove, and update the status of your projects (In Progress, Completed, On Hold).
- **Modern UI/UX:** Built with a glassmorphic aesthetic, soft shadows, and smooth animations.
- **Responsive Design:** Fully responsive layout for desktop and mobile.
- **FastAPI Backend:** Fast backend operations powered by Python and FastAPI.
- **SQLite Database:** Zero-config local database.

## Tech Stack

**Frontend:**
- React 19
- Vite
- TailwindCSS
- Framer Motion
- Lucide React

**Backend:**
- Python 3.11+
- FastAPI
- SQLAlchemy (SQLite)
- Uvicorn

## Getting Started

### Prerequisites
Make sure you have Node.js and Python installed on your machine.

### Backend Setup
1. Navigate to the root directory.
2. Activate the virtual environment (if you are using one):
   ```bash
   .\.venv\Scripts\activate
   ```
3. Run the FastAPI server:
   ```bash
   python -m uvicorn backend.main:app --port 8001 --reload
   ```

### Frontend Setup
1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install Node dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173` and the backend API at `http://localhost:8001`.

## Contributing
Contributions, issues and feature requests are welcome.

## License
This project is open source and available under the [MIT License](LICENSE).
