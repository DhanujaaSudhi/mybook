import React, { useState } from 'react';
import axios from 'axios';
import './BookForm.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const BookForm = ({ onBookAdded, editingBook, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    bookName: editingBook?.bookName || '',
    authorName: editingBook?.authorName || '',
    coverImage: editingBook?.coverImage || '',
    review: editingBook?.review || ''
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingBook) {
        await axios.put(`${API_URL}/api/books/${editingBook._id}`, formData);
      } else {
        await axios.post(`${API_URL}/api/books`, formData);
      }
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
      setFormData({
        bookName: '',
        authorName: '',
        coverImage: '',
        review: ''
      });
      
      onBookAdded();
      onCancelEdit();
    } catch (error) {
      console.error('Error saving book:', error);
      alert('Error saving book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="book-form-container">
      <div className="form-card">
        <h2 className="form-title">
          {editingBook ? '✏️ Edit Book' : '📖 Add New Book'}
        </h2>
        
        {showSuccess && (
          <div className="success-message">
            ✓ {editingBook ? 'Book updated successfully!' : 'Book added successfully!'}
          </div>
        )}

        <form onSubmit={handleSubmit} className="book-form">
          <div className="form-group">
            <label htmlFor="bookName">Book Name *</label>
            <input
              type="text"
              id="bookName"
              name="bookName"
              value={formData.bookName}
              onChange={handleChange}
              required
              placeholder="Enter book name"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="authorName">Author Name *</label>
            <input
              type="text"
              id="authorName"
              name="authorName"
              value={formData.authorName}
              onChange={handleChange}
              required
              placeholder="Enter author name"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="coverImage">Cover Image URL *</label>
            <input
              type="url"
              id="coverImage"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              required
              placeholder="https://example.com/book-cover.jpg"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="review">Short Review *</label>
            <textarea
              id="review"
              name="review"
              value={formData.review}
              onChange={handleChange}
              required
              placeholder="Write your review (max 500 characters)"
              maxLength="500"
              rows="4"
              className="form-control"
            ></textarea>
            <small className="char-count">{formData.review.length}/500</small>
          </div>

          <div className="form-buttons">
            <button
              type="submit"
              className="btn btn-primary submit-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Saving...
                </>
              ) : (
                editingBook ? 'Update Book' : 'Add Book'
              )}
            </button>
            
            {editingBook && (
              <button
                type="button"
                className="btn btn-secondary cancel-btn"
                onClick={onCancelEdit}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
