import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../Components/BookCard";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
import bookimg from "../assets/bookimg";
import { UserContext } from "../Context/UserContext";
import api from '../api'

const ExploreBooks = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const {currentUser} = useContext(UserContext)
  const booksPerPage = 5;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
          const res = await api.get("/api/books/getBook"); // no need to add base URL
        setBooks(res.data.books);
        setFilteredBooks(res.data.books);
      } catch (error) {
        setMessage(error?.response?.data?.message || "Server Error");
      }
    };
    fetchBooks();
  }, []);
 const reviewPage = (userId, bookId) => {
  if (!userId) {
    alert("Please login to add a review");
    navigate("/login");
    return;
  }
  navigate(`/user/${userId}/${bookId}/addReview`);
};

  const allReviewPage = (bookId) => {
    navigate(`/book/${bookId}/reviews`)
  }

  // Filter and sort books
  useEffect(() => {
    const query = searchQuery.toLowerCase();
    let filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.genre.toLowerCase().includes(query)
    );

    if (sortBy === "yearAsc") filtered.sort((a, b) => a.publishedYear - b.publishedYear);
    else if (sortBy === "yearDesc") filtered.sort((a, b) => b.publishedYear - a.publishedYear);
    else if (sortBy === "ratingAsc") filtered.sort((a, b) => (a.stars || 0) - (b.stars || 0));
    else if (sortBy === "ratingDesc") filtered.sort((a, b) => (b.stars || 0) - (a.stars || 0));

    setFilteredBooks(filtered);
    setCurrentPage(1);
  }, [searchQuery, books, sortBy]);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const goToPage = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
  <div className="relative min-h-screen w-full p-4">
    {/* Blurred background */}
    <div
      className="absolute inset-0 bg-cover bg-center filter blur-sm -z-10"
      style={{ backgroundImage: `url(${assets.b3})` }}
    ></div>

      {/* Responsive Navbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 p-4 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-pink-200/30 gap-4">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <img 
            src={assets.logo} 
            alt="Logo" 
            className="h-12 w-12 sm:h-14 sm:w-14 rounded-full border-2 border-pink-500 object-cover"
          />
          <span className="text-pink-700 font-bold text-lg sm:text-xl">Book Review</span>
        </div>

        {/* Search + Sort */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search by Title, Author or Genre"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 p-2 rounded-lg border border-pink-200/50 focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full sm:w-48 p-2 rounded-lg border border-pink-200/50 focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
          >
            <option value="">Sort By</option>
            <option value="yearAsc">Year: Low to High</option>
            <option value="yearDesc">Year: High to Low</option>
            <option value="ratingAsc">Rating: Low to High</option>
            <option value="ratingDesc">Rating: High to Low</option>
          </select>
        </div>

        {/* Home Button */}
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-pink-600 text-white rounded-xl shadow-md hover:bg-pink-700 transition-colors w-full sm:w-auto"
        >
          Home
        </button>
      </div>

      {message && <p className="text-red-600 text-center mb-4">{message}</p>}

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
        {currentBooks.map((book) => (
          <BookCard
            key={book._id}
            image={bookimg[`a${Math.ceil(Math.random() * 5)}`]} // random image
            title={book.title}
            description={book.description}
            author={book.author}
            publishedYear={book.publishedYear}
            genre={book.genre}
            onAddReview={() => reviewPage(currentUser?._id , book._id)}
            onSeeReview={() => allReviewPage(book._id)}
          />
        ))}
        {currentBooks.length === 0 && (
          <p className="col-span-full text-center text-pink-700 mt-6">No books found</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md font-semibold ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-pink-500/50 text-white hover:bg-pink-600 transition-colors"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`px-3 py-1 rounded-md font-semibold ${
                currentPage === i + 1
                  ? "bg-pink-600 text-white"
                  : "bg-white/20 text-pink-700 hover:bg-pink-500/50 transition-colors"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md font-semibold ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-pink-500/50 text-white hover:bg-pink-600 transition-colors"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ExploreBooks;
