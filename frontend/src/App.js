import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import Footer from './components/Footer';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const App = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const addSampleBooks = useCallback(async () => {
    const sampleBooks = [
      {
        bookName: 'The Great Gatsby',
        authorName: 'F. Scott Fitzgerald',
        coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
        review: 'A masterpiece of American literature that explores themes of wealth, love, and the American Dream in the 1920s.'
      },
      {
        bookName: 'To Kill a Mockingbird',
        authorName: 'Harper Lee',
        coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop',
        review: 'A powerful story of racial injustice and childhood innocence in the American South. Truly unforgettable.'
      },
      {
        bookName: '1984',
        authorName: 'George Orwell',
        coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
        review: 'A dystopian masterpiece that remains terrifyingly relevant. A must-read for understanding surveillance and totalitarianism.'
      },
      {
        bookName: 'Pride and Prejudice',
        authorName: 'Jane Austen',
        coverImage: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=400&h=600&fit=crop',
        review: 'A brilliant satire of manners and romance. Elizabeth Bennet is one of literature\'s most beloved heroines.'
      }
    ];

    try {
      for (const book of sampleBooks) {
        await axios.post(`${API_URL}/api/books`, book);
      }
    } catch (error) {
      console.error('Error adding sample books:', error);
    }
  }, []);

  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/books`);
      setBooks(response.data);
      
      // Add sample books if no books exist
      if (response.data.length === 0) {
        await addSampleBooks();
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  }, [addSampleBooks]);

  useEffect(() => {
    fetchBooks();
    // Check for saved dark mode preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      setDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, [fetchBooks]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', !darkMode);
  };

  const handleBookAdded = () => {
    fetchBooks();
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingBook(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await axios.delete(`${API_URL}/api/books/${id}`);
        fetchBooks();
      } catch (error) {
        console.error('Error deleting book:', error);
        alert('Error deleting book. Please try again.');
      }
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="app">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="main-content">
        <div className="container">
          <div className="hero-section">
            <h1 className="hero-title">📚 My Read Shelf</h1>
            <p className="hero-subtitle">Your personal digital bookshelf</p>
          </div>

          <div className="search-section">
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="🔍 Search books by title or author..."
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>

          <BookForm
            onBookAdded={handleBookAdded}
            editingBook={editingBook}
            onCancelEdit={handleCancelEdit}
          />

          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading your bookshelf...</p>
            </div>
          ) : (
            <BookList
              books={books}
              onEdit={handleEdit}
              onDelete={handleDelete}
              searchQuery={searchQuery}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
