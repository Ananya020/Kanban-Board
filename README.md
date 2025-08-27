# Kanban Board

A modern BASIC Kanban board application built with React and DND Kit for smooth drag-and-drop functionality. This project allows users to organize tasks across different columns in a Kanban-style interface.

## Features

- Drag and drop cards between columns
- Create new task cards
- Responsive design
- Real-time updates
- Persistent storage

## Tech Stack

- **Frontend:**
  - React
  - Vite (Build tool)
  - DND Kit (Drag and Drop functionality)
  - TailwindCSS (Styling)

- **Backend:**
  - Express.js
  - CORS enabled
  - In-memory data storage

## Prerequisites

- Node.js (v22.17.0 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Ananya020/Kanban-Board.git
cd kanban-board
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

1. Start the frontend development server:
```bash
npm run dev
```

2. Start the backend server:
```bash
node backend/server.js
```

The frontend will be available at `http://localhost:5173`
The backend API will be running at `http://localhost:4000`

## API Endpoints

- `GET /board` - Retrieve the current board state
- `POST /board` - Update the board state

## Project Structure

```
kanban-board/
├── src/
│   ├── components/
│   │   ├── AddCardForm.jsx
│   │   ├── Board.jsx
│   │   ├── Card.jsx
│   │   └── Column.jsx
│   ├── data/
│   │   └── initialData.js
│   ├── App.jsx
│   └── main.jsx
├── backend/
│   └── server.js
└── public/
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- [React](https://reactjs.org/)
- [DND Kit](https://dndkit.com/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
