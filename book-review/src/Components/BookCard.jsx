import React from "react";

const BookCard = ({
  image,
  title,
  description,
  author,
  publishedYear,
  onAddReview,
  onSeeReview,
  genre
}) => {
  return (
    <div
      className="w-64 bg-white/15 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden hover:scale-105 hover:bg-white/20 transition-all duration-500 ease-out border border-pink-200/30 group cursor-pointer"
      style={{ boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.25)' }}
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pink-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Info Section */}
      <div className="relative p-3 flex flex-col justify-between h-auto bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-100/10 via-pink-200/5 to-pink-100/10 rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative z-10 flex flex-col gap-1">
          <h2 className="text-base font-bold text-pink-800 group-hover:text-pink-900 transition-colors duration-300 drop-shadow-sm">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-pink-700/90 line-clamp-3 group-hover:text-pink-800/95 transition-colors duration-300">
            {description}
          </p>
          <p className="text-xs text-pink-600">
            <strong>Author:</strong> {author}
          </p>
          <p className="text-xs text-pink-600">
            <strong>Year:</strong> {publishedYear}
          </p>
          <p className="text-xs text-pink-600">
            <strong>Genre:</strong> {genre}
          </p>
          
          {/* Buttons */}
          <div className="flex gap-2 mt-2">
            <button
              onClick={onAddReview}
              className="flex-1 px-2 py-1 bg-pink-600 text-white rounded-lg shadow-md hover:bg-pink-700 transition-colors duration-300 text-xs"
            >
              Add Review
            </button>
            <button
              onClick={onSeeReview}
              className="flex-1 px-2 py-1 bg-pink-500 text-white rounded-lg shadow-md hover:bg-pink-600 transition-colors duration-300 text-xs"
            >
              See Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
