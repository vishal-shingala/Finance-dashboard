import React from 'react'

const Card = ({ type, amount, className }) => {
  return (
    <div
      className={`
        bg-gray 
        rounded-xl 
        shadow-lg 
        p-4 sm:p-6 
        m-2 sm:m-3 md:m-4
        flex flex-col 
        flex-1
        items-start 
        justify-between 
        min-w-[160px] sm:min-w-[200px] md:min-w-[220px]
        min-h-[110px] sm:min-h-[120px] 
        transition-transform 
        duration-300 
        hover:shadow-2xl 
        hover:scale-105 sm:hover:scale-110
        group
        animate-fade-in-up
        cursor-pointer
        border
        border-white
      `}
    >
      <span className="text-accent text-xs sm:text-sm font-semibold uppercase tracking-wide mb-2 animate-fade-in-up">
        {type}
      </span>
      <span className={`text-2xl sm:text-3xl font-bold animate-fade-in-up group-hover:text-accent transition-colors duration-300 ${className || ''}`}>
        ₹ {amount?.toLocaleString()}
      </span>
      <div className="w-full h-1 mt-3 sm:mt-4 bg-accent rounded-full opacity-60 animate-fade-in-up group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  )
}

export default Card