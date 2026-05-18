import React from 'react';
import BookCard from './BookCard';
import './BookList.css';

const BookList = ({ books, onEdit, onDelete, searchQuery }) => {
  const filteredBooks = books.filter(book => {
    const query = searchQuery.toLowerCase();
    return (
      book.bookName.toLowerCase().includes(query) ||
      book.authorName.toLowerCase().includes(query)
    );
  });

  if (filteredBooks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📚</div>
        <h3>No books found</h3>
        <p>
          {searchQuery
            ? 'Try adjusting your search terms'
            : 'Start by adding your first book to the shelf!'}
        </p>
      </div>
    );
  }

  return (
    <div className="book-list">
      <div className="row g-4">
        {filteredBooks.map((book) => (
          <div key={book._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <BookCard book={book} onEdit={onEdit} onDelete={onDelete} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
