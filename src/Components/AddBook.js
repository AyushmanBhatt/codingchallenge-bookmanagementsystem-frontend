import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publicationYear, setPublicationYear] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    const bookData = { title, author, publicationYear };
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:8080/api/admin/addNewBook', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) {
        throw new Error('Failed to add book. Please try again.');
      }

      setSuccess('Book added successfully!');
      setTitle('');
      setAuthor('');
      setPublicationYear('');
    } catch (error) {
      setError(error.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="author" className="form-label">Author</label>
          <input
            type="text"
            id="author"
            className="form-control"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="publicationYear" className="form-label">Publication Year</label>
          <input
            type="number"
            id="publicationYear"
            className="form-control"
            value={publicationYear}
            onChange={(e) => setPublicationYear(e.target.value)}
            required
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <button type="submit" className="btn btn-success w-100">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
