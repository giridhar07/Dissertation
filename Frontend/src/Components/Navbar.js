import React from 'react';

const Navbar = () => {
  return (
    <div className="fixed w-full shadow-md bg-white z-10">
      <div className="flex justify-between items-center h-20 max-w-[1240px] mx-auto px-4">
        <h1 className="text-3xl font-bold text-[#003da5]">LiverCheck</h1>
        
        <ul className="flex space-x-6">
          <li className="text-black hover:text-[#003da5] text-xl cursor-pointer">
            <a href="/">Home</a>
          </li>
          <li className="text-black hover:text-[#003da5] text-xl cursor-pointer">
            <a href="/about">About</a>
          </li>
          <li className="text-black hover:text-[#003da5] text-xl cursor-pointer">
            <a href="/contact">Contact Us</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;