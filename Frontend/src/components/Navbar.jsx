import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/User.context";

const Navbar = () => {
  const navigate = useNavigate();
  const {setLogOut} = useContext(UserContext);
  const {openAddTransactionForm, setOpenAddTransactionForm} = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className="w-full bg-dark sticky top-0 z-50 shadow-lg py-3 px-3 sm:px-6 flex items-center justify-between animate-fade-in border-b border-gray">
      <div className="flex items-center gap-2">
        <span className="text-lg sm:text-2xl font-bold text-white tracking-wide hover:text-accent transition-colors duration-300 cursor-pointer animate-fade-in-up">
          FinDash
        </span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex flex-1 justify-center">
        <ul className="flex gap-4 lg:gap-8">
          <li onClick={() => handleNavClick("/")} className="text-sm lg:text-lg hover:cursor-pointer text-white font-semibold relative group px-2 py-1 transition-all duration-300">
            <span className="inline-block animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Dashboard
            </span>
            <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full"></span>
          </li>
          <li onClick={() => handleNavClick("/transactions")} className="text-sm lg:text-lg hover:cursor-pointer text-white font-semibold relative group px-2 py-1 transition-all duration-300">
            <span className="inline-block animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Transactions
            </span>
            <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full"></span>
          </li>
          <li onClick={() => { handleNavClick('/login'); setLogOut(true); }} className="text-sm lg:text-lg text-white font-semibold relative group px-2 py-1 hover:cursor-pointer transition-all duration-300">
            <span className="inline-block animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Logout
            </span>
            <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full"></span>
          </li>
        </ul>
      </div>

      {/* Desktop Buttons */}
      <div className="hidden md:flex items-center gap-3 lg:gap-4">
        <button onClick={()=> setOpenAddTransactionForm(true)} className="bg-gray-700 hover:bg-gray text-white font-semibold px-3 lg:px-4 py-2 text-sm lg:text-base rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent animate-fade-in-up">
          Add Transaction 
        </button>
        <span
          onClick={()=>{navigate('/profile')}}
          className="hidden lg:flex items-center gap-2 bg-gray hover:bg-accent text-white px-3 py-2 rounded-full transition-all duration-300 shadow-md animate-fade-in-up cursor-pointer"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9.001 9.001 0 0112 15c2.21 0 4.21.805 5.879 2.146M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="font-medium">Profile</span>
        </span>
        <button onClick={() => { navigate('/profile'); }} className="lg:hidden bg-gray hover:bg-accent text-white p-2 rounded-full transition-all duration-300">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9.001 9.001 0 0112 15c2.21 0 4.21.805 5.879 2.146M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center gap-2">
        <button onClick={()=> setOpenAddTransactionForm(true)} className="bg-gray-700 hover:bg-gray text-white font-semibold px-2 py-1.5 text-xs sm:text-sm rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent">
          Add
        </button>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white p-2 hover:bg-gray rounded-lg transition-colors duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 z-50 bg-dark border-b border-gray md:hidden">
          <ul className="flex flex-col gap-0">
            <li onClick={() => handleNavClick("/")} className="text-base hover:cursor-pointer text-white font-semibold px-4 py-3 hover:bg-gray-700 transition-all duration-300 border-b border-gray">
              Dashboard
            </li>
            <li onClick={() => handleNavClick("/transactions")} className="text-base hover:cursor-pointer text-white font-semibold px-4 py-3 hover:bg-gray-700 transition-all duration-300 border-b border-gray">
              Transactions
            </li>
            <li onClick={() => { handleNavClick('/profile'); }} className="text-base hover:cursor-pointer text-white font-semibold px-4 py-3 hover:bg-gray-700 transition-all duration-300 border-b border-gray">
              Profile
            </li>
            <li onClick={() => { handleNavClick('/login'); setLogOut(true); }} className="text-base text-white font-semibold px-4 py-3 hover:bg-gray-700 transition-all duration-300 hover:cursor-pointer">
              LogOut
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
