# Security Acronyms Flashcards

A full-stack web application for learning and testing your knowledge of cybersecurity acronyms. Built with React and Node.js, this app provides an interactive flashcard system and quiz mode to help you master security terminology.

## Features

### 📚 Comprehensive Acronym Database

- Browse and search through 124+ security acronyms
- View definitions, helpful hints, and categories for each acronym
- Organized by categories including:
  - Protocols
  - Networking
  - Cryptography
  - Authentication
  - Access Control
  - Cloud Computing
  - Compliance
  - And many more!

### 🎯 Interactive Quiz Mode

- Customizable quiz lengths (10, 25, 50, 100 questions, or all)
- Progressive reveal system (show hint, show category, show answer)
- Flag difficult acronyms for later study
- View comprehensive results with study recommendations
- Track your progress through each quiz session

### ✏️ CRUD Operations

- Add new acronyms with definitions, hints, and categories
- Edit existing entries
- Delete acronyms with confirmation
- Full validation and error handling

### 🎨 Modern UI/UX

- Fully responsive design optimized for mobile, tablet, and desktop
- Dark mode support with system preference detection
- Smooth animations and transitions
- Tailwind CSS styling

## Tech Stack

### Frontend

- **React 19** - UI framework
- **React Router 7** - Client-side routing
- **Vite** - Build tool and development server
- **Tailwind CSS 4** - Utility-first CSS framework
- **ESLint & Prettier** - Code quality and formatting

### Backend

- **Node.js** - Runtime environment
- **Express 5** - Web framework
- **Sequelize** - ORM for database management
- **SQLite** - Database
- **CORS** - Cross-origin resource sharing

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd security-acronyms-flashcards
   ```

2. **Install server dependencies**

   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

## Running the Application

### Step 1: Seed the Database

First, populate the database with the security acronyms:

```bash
cd server
npm run seed
```

You should see output confirming that the database has been seeded with acronyms.

### Step 2: Start the Backend Server

In the `server` directory, run:

```bash
npm run dev
```

The server will start on **http://localhost:5000**

### Step 3: Start the Frontend Development Server

Open a new terminal, navigate to the `client` directory, and run:

```bash
cd client
npm run dev
```

The application will open in your browser at **http://localhost:5173** (Vite's default port).

## Available Scripts

### Server (in `/server` directory)

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon (auto-restart)
- `npm run seed` - Seed the database with acronyms
- `npm run export` - Export acronyms from database to JSON

### Client (in `/client` directory)

- `npm run dev` - Start the Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Usage Guide

### Browsing Acronyms

1. Click **"Acronyms"** from the navigation menu
2. Use the search bar to filter by acronym, definition, or category
3. Click the **Edit** button to modify an acronym
4. Click **"Add New Acronym"** to create a new entry

### Taking a Quiz

1. Click **"Quiz"** from the navigation menu
2. Select your desired quiz length
3. Try to recall the definition before revealing hints or answers
4. Use the **Show Category** button for a hint about the acronym's domain
5. Use the **Show Hint** button for additional context
6. Click **Show Answer** to reveal the full definition
7. **Flag for Study** any acronyms you want to review later
8. Navigate through questions using **Previous** and **Next** buttons
9. Click **Finish Quiz** on the last question to see your results

### Adding/Editing Acronyms

1. Navigate to the Acronyms page
2. Click **"Add New Acronym"** or **Edit** on an existing entry
3. Fill in the required fields:
   - **Acronym** (2-15 characters, required)
   - **Definition** (required)
   - **Category** (optional, e.g., Protocols, Cryptography)
   - **Hint** (optional, additional context)
4. Click **Add Acronym** or **Save Changes**

### Dark Mode

Click the moon/sun icon in the navigation bar to toggle between light and dark themes.

## Project Structure

```
security-acronyms-flashcards/
├── client/                    # Frontend React application
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── assets/          # Images, icons
│   │   ├── pages/           # React page components
│   │   │   ├── Home.jsx
│   │   │   ├── Acronyms.jsx
│   │   │   ├── Quiz.jsx
│   │   │   ├── AddAcronym.jsx
│   │   │   └── EditAcronym.jsx
│   │   ├── App.jsx          # Main app component with routing
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Global styles
│   ├── package.json
│   └── vite.config.js
│
├── server/                   # Backend Express application
│   ├── data/
│   │   └── acronyms.json    # Source data for acronyms
│   ├── db/                  # SQLite database (auto-generated)
│   ├── middleware/
│   │   └── asyncHandler.js  # Error handling wrapper
│   ├── models/
│   │   ├── flashcard.js     # Sequelize model
│   │   └── index.js         # Database connection
│   ├── routes/
│   │   ├── flashcards.js    # CRUD routes
│   │   └── quiz.js          # Quiz route
│   ├── app.js               # Express app configuration
│   ├── server.js            # Server entry point
│   ├── seed.js              # Database seeding script
│   ├── export.js            # Export utility
│   └── package.json
│
└── README.md                # This file
```

## API Endpoints

### Flashcards

- `GET /api/flashcards/all` - Get all flashcards
- `GET /api/flashcards/:id` - Get a specific flashcard
- `POST /api/flashcards/new` - Create a new flashcard
- `PUT /api/flashcards/:id` - Update a flashcard
- `DELETE /api/flashcards/:id` - Delete a flashcard

### Quiz

- `GET /api/quiz?count=<number>` - Get random quiz questions (or all if count=all)

## Database Schema

The application uses a single `Flashcards` table with the following fields:

- `id` - Integer, Primary Key, Auto-increment
- `acronym` - String (2-15 chars), Required, Unique, Indexed
- `definition` - Text, Required
- `hint` - Text, Optional
- `category` - String, Optional
- `createdAt` - DateTime, Auto-generated
- `updatedAt` - DateTime, Auto-updated

## Contributing

To contribute to this project:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly (mobile and desktop)
5. Submit a pull request

## Future Enhancements

Potential features for future development:

- User accounts and authentication
- Progress tracking and statistics
- Spaced repetition algorithm
- Export quiz results
- Import/export custom acronym sets
- Multi-language support
- Audio pronunciation

## License

ISC

## Acknowledgments

Created as a learning tool for cybersecurity professionals and students preparing for security certifications.

---

**Happy Learning! 🎓**
