import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/User.context";

const Navbar = () => {
  const navigate = useNavigate();
  const {setLogOut} = useContext(UserContext);
  const {openAddTransactionForm, setOpenAddTransactionForm} = useContext(UserContext);
  return (
    <nav className="w-full bg-dark sticky top-0 shadow-lg py-3 px-6 flex items-center justify-between animate-fade-in border-b border-gray">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-white tracking-wide hover:text-accent transition-colors duration-300 cursor-pointer animate-fade-in-up">
          FinDash
        </span>
      </div>

      <div className="flex-1 flex justify-center">
        <ul className="flex gap-8">
          <li onClick={() => navigate("/")} className="text-lg hover:cursor-pointer text-white font-semibold relative group px-2 py-1 transition-all duration-300">
            <span
              className="inline-block animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              Dashboard
            </span>
            <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full"></span>
          </li>
          <li onClick={() => navigate('/login')} className="text-lg text-white font-semibold relative group px-2 py-1 hover:cursor-pointer transition-all duration-300 ">
            <span
              className="inline-block animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
              onClick={()=>setLogOut(true)}
            >
              LogOut
            </span>
            <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full"></span>
          </li>
        </ul>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={()=> setOpenAddTransactionForm(true)} className="bg-gray-700 hover:bg-gray text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent animate-fade-in-up">
          Add Transaction 
        </button>
        <span
          onClick={()=>{navigate('/profile')}}
          className="flex items-center gap-2 bg-gray hover:bg-accent text-white px-3 py-2 rounded-full transition-all duration-300 shadow-md animate-fade-in-up"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.121 17.804A9.001 9.001 0 0112 15c2.21 0 4.21.805 5.879 2.146M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="font-medium">Profile</span>
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
