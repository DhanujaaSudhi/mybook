# MyReadShelf 📚

A modern and responsive personal digital bookshelf application built with React.js, Node.js, Express.js, and MongoDB.

## Features

- ✨ **Modern UI Design** - Clean, elegant interface with smooth animations
- 🌙 **Dark/Light Mode** - Toggle between dark and light themes
- 📖 **Book Management** - Add, edit, and delete books
- 🔍 **Search Functionality** - Search books by title or author
- 📱 **Responsive Design** - Works perfectly on desktop and mobile
- 🎨 **Beautiful Cards** - Book cards with hover effects and animations
- 💾 **MongoDB Storage** - All data stored securely in MongoDB
- 🚀 **REST API** - Full CRUD operations via Express.js
- 📝 **Sample Data** - Pre-loaded with sample books to get started

## Tech Stack

### Frontend
- React.js 18.2.0
- Bootstrap 5.3.2
- Axios 1.6.2
- CSS3 with modern features

### Backend
- Node.js
- Express.js 4.18.2
- MongoDB (Mongoose 8.0.3)
- CORS 2.8.5
- dotenv 16.3.1

## Project Structure

```
MyReadShelf/
├── backend/
│   ├── models/
│   │   └── Book.js          # MongoDB schema
│   ├── routes/
│   │   └── bookRoutes.js    # API routes
│   ├── .env                 # Environment variables
│   ├── package.json         # Backend dependencies
│   └── server.js            # Express server
├── frontend/
│   ├── public/
│   │   └── index.html       # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js   # Navigation component
│   │   │   ├── BookForm.js  # Add/Edit book form
│   │   │   ├── BookCard.js  # Individual book card
│   │   │   ├── BookList.js  # List of books
│   │   │   └── Footer.js    # Footer component
│   │   ├── App.js           # Main application
│   │   ├── App.css          # Main styles
│   │   ├── index.js         # React entry point
│   │   └── index.css        # Global styles
│   └── package.json         # Frontend dependencies
└── README.md                # This file
```

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation Instructions

### 1. Clone or Download the Project

Navigate to the project directory:
```bash
cd "d:\New folder\MyReadShelf"
```

### 2. Backend Setup

Navigate to the backend directory:
```bash
cd backend
```

Install backend dependencies:
```bash
npm install
```

Configure environment variables:
- The `.env` file is already created with default settings
- MongoDB URI: `mongodb://localhost:27017/myreadshelf`
- Port: `5000`

If your MongoDB is running on a different port or host, update the `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/myreadshelf
```

### 3. Frontend Setup

Navigate to the frontend directory:
```bash
cd ../frontend
```

Install frontend dependencies:
```bash
npm install
```

### 4. Start MongoDB

Make sure MongoDB is running on your system:
```bash
# On Windows (if using MongoDB as a service)
# MongoDB should be running automatically

# Or start MongoDB manually
mongod
```

### 5. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
Backend will run on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
Frontend will run on `http://localhost:3000`

## Usage

### Adding a Book

1. Click on the "Add New Book" form on the homepage
2. Fill in the required fields:
   - Book Name
   - Author Name
   - Cover Image URL (use a direct image link)
   - Short Review (max 500 characters)
3. Click "Add Book"
4. The book will appear on your bookshelf with a success message

### Editing a Book

1. Hover over any book card
2. Click the ✏️ (edit) button
3. The form will populate with the book's details
4. Make your changes and click "Update Book"

### Deleting a Book

1. Hover over any book card
2. Click the 🗑️ (delete) button
3. Confirm the deletion in the popup

### Searching Books

1. Use the search bar at the top of the page
2. Type a book title or author name
3. Results will filter in real-time

### Dark/Light Mode

1. Click the theme toggle button in the navbar
2. Switch between dark and light modes
3. Your preference is saved in localStorage

## API Endpoints

### Books

- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get a single book by ID
- `POST /api/books` - Create a new book
- `PUT /api/books/:id` - Update a book by ID
- `DELETE /api/books/:id` - Delete a book by ID

### Sample Book Object

```json
{
  "_id": "unique_id",
  "bookName": "The Great Gatsby",
  "authorName": "F. Scott Fitzgerald",
  "coverImage": "https://example.com/image.jpg",
  "review": "A masterpiece of American literature...",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

## Sample Data

The application automatically loads 4 sample books when first launched:

1. **The Great Gatsby** by F. Scott Fitzgerald
2. **To Kill a Mockingbird** by Harper Lee
3. **1984** by George Orwell
4. **Pride and Prejudice** by Jane Austen

## Design Features

- **Modern Library Theme** - Elegant purple gradient color scheme
- **Soft Shadows** - Subtle box-shadows for depth
- **Rounded Corners** - 20px border-radius for cards
- **Smooth Transitions** - 0.3s ease transitions on all interactive elements
- **Hover Effects** - Cards lift and scale on hover
- **Loading Animations** - Spinner while fetching data
- **Success Messages** - Visual feedback after actions
- **Responsive Grid** - Bootstrap grid system for layout

## Troubleshooting

### MongoDB Connection Error

If you see "MongoDB connection error":
- Ensure MongoDB is running
- Check the MongoDB URI in `.env` file
- Verify MongoDB is on the correct port (default: 27017)

### CORS Error

If you encounter CORS issues:
- Ensure backend is running on port 5000
- Check that CORS is enabled in server.js
- Verify the API URL in frontend components

### Port Already in Use

If port 5000 or 3000 is already in use:
- Change the PORT in `.env` (backend)
- React will automatically offer an alternative port for frontend

### Images Not Loading

If book cover images don't display:
- Ensure the image URL is a direct link (not a webpage)
- Try using different image hosting services
- The app has a fallback placeholder for broken images

## Development

### Backend Development

Run with nodemon for auto-restart:
```bash
cd backend
npm run dev
```

### Frontend Development

React includes hot-reloading by default:
```bash
cd frontend
npm start
```

## Building for Production

### Frontend Build

```bash
cd frontend
npm run build
```

This creates an optimized production build in the `build/` directory.

### Backend Production

Use a process manager like PM2:
```bash
npm install -g pm2
pm2 start backend/server.js --name myreadshelf
```

## License

This project is open source and available for personal use.

## Author

Created with ❤️ for book lovers everywhere.

## Support

For issues or questions, please refer to the troubleshooting section or check the console for error messages.
