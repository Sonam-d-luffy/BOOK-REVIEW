import React from "react";

const InputField = ({ 
  label, 
  type, 
  name, 
  value, 
  onChange, 
  placeholder 
}) => {
  return (
    <div className="flex flex-col space-y-3 sm:space-y-4 w-full group relative">
      {label && (
        <label 
          htmlFor={name} 
          className="text-pink-800 font-bold text-base sm:text-lg md:text-xl tracking-wide drop-shadow-sm group-focus-within:text-pink-900 transition-colors duration-300"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          
          className="
            w-full 
            p-1.5 sm:p-2 md:p-2.5   /* reduced padding for smaller height */
            rounded-xl sm:rounded-2xl md:rounded-3xl 
            bg-white/15 backdrop-blur-lg 
            border border-pink-200/30 
            focus:bg-white/25 
            focus:border-pink-300/50 
            focus:ring-4 focus:ring-pink-200/20
            hover:bg-white/20 hover:border-pink-300/40
            outline-none 
            text-pink-800 placeholder-pink-600/60 
            font-medium 
            shadow-xl hover:shadow-2xl 
            transition-all duration-500 ease-out 
            text-sm sm:text-base md:text-lg
            group-focus-within:scale-[1.02]
            transform
          "
        />
        
        {/* Animated Border Glow */}
        <div className="absolute inset-0 rounded-xl sm:rounded-2xl md:rounded-3xl bg-gradient-to-r from-pink-200/20 via-pink-300/10 to-pink-200/20 blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 -z-10 scale-105"></div>
        
        {/* Floating Particles */}
        <div className="absolute top-2 right-4 w-2 h-2 bg-pink-300/40 rounded-full opacity-0 group-focus-within:opacity-100 transition-all duration-700 group-focus-within:animate-pulse"></div>
        <div className="absolute bottom-3 left-4 w-1.5 h-1.5 bg-pink-200/50 rounded-full opacity-0 group-focus-within:opacity-100 transition-all duration-500 delay-200"></div>
        
        {/* Shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out rounded-xl sm:rounded-2xl md:rounded-3xl pointer-events-none"></div>
        
        {/* Inner Glow */}
        <div className="absolute inset-0.5 bg-gradient-to-r from-pink-100/5 via-pink-200/3 to-pink-100/5 rounded-xl sm:rounded-2xl md:rounded-3xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </div>
      
      {/* Decorative Element */}
      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-transparent via-pink-300/30 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 blur-sm"></div>
    </div>
  );
};

export default InputField;
