import React from "react";

const InfoCard = ({ image, title, description, onClick, buttonName }) => {
  return (
    <div className="w-full sm:w-1/3 lg:w-1/5 p-2"> {/* responsive width */}
      <div 
        className="w-full bg-white/15 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden hover:scale-105 hover:bg-white/20 transition-all duration-500 ease-out border border-pink-200/30 group cursor-pointer"
        style={{ boxShadow: '0 10px 25px -10px rgba(0, 0, 0, 0.25)' }}
      >
        {/* Image section */}
        <div className="relative h-36 w-full overflow-hidden"> {/* increased height from h-24 → h-36 */}
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover object-top group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pink-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        {/* Info section */}
        <div className="relative p-3 flex flex-col justify-between h-28 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm"> {/* slightly reduced height to balance */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-100/10 via-pink-200/5 to-pink-100/10 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <h2 className="text-base font-bold text-pink-800 group-hover:text-pink-900 transition-colors duration-300 mb-1 drop-shadow-sm">
                {title}
              </h2>
              <p className="text-xs text-pink-700/90 leading-tight line-clamp-2 group-hover:text-pink-800/95 transition-colors duration-300">
                {description}
              </p>
            </div>

            {/* Button */}
            <button
              onClick={onClick}
              className="mt-2 px-3 py-1.5 bg-pink-600 text-white rounded-lg shadow-sm hover:bg-pink-700 transition-colors duration-300 text-xs"
            >
              {buttonName}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
