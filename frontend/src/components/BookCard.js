import React from 'react';
import './BookCard.css';

const BookCard = ({ book, onEdit, onDelete }) => {
  return (
    <div className="book-card">
      <div className="card-image-container">
        <img
          src={book.coverImage}
          alt={book.bookName}
          className="card-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
          }}
        />
        <div className="card-overlay">
          <div className="card-actions">
            <button
              className="action-btn edit-btn"
              onClick={() => onEdit(book)}
              title="Edit book"
            >
              ✏️
            </button>
            <button
              className="action-btn delete-btn"
              onClick={() => onDelete(book._id)}
              title="Delete book"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
      
      <div className="card-content">
        <h3 className="book-title">{book.bookName}</h3>
        <p className="book-author">by {book.authorName}</p>
        <p className="book-review">{book.review}</p>
      </div>
    </div>
  );
};

export default BookCard;
