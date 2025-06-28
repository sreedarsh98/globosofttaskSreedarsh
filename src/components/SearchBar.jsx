import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm, location);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchTerm, location]);

  return (
    <div className="search-bar flex flex-col md:flex-row gap-4 mb-6">
      <input
        type="text"
        placeholder="Search by job title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-1 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Search by location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="flex-1 p-2 border rounded"
      />
    </div>
  );
};

export default SearchBar;