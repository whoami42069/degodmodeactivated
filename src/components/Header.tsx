import React from 'react';

interface HeaderProps {
  darkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ darkMode }) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-5xl font-extrabold">
        <span className="inline-block transform hover:scale-110 transition-transform duration-300">
          <span className="relative">
            <span className="absolute inset-0 blur-sm text-gray-500">$DEGOD MODE</span>
            <span className="relative text-white">$DEGOD MODE</span>
          </span>
        </span>
      </h1>
    </div>
  );
};

export default Header;