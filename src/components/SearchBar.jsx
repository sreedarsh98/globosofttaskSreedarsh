import React, { useState, useEffect } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

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
    <div className="search-container p-4 mb-4">
      <h2 className="mb-4">Find Your Dream Job</h2>
      <div className="row g-3">
        <div className="col-md-5">
          <InputGroup>
            <InputGroup.Text>
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Job title, keywords"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </div>
        <div className="col-md-5">
          <InputGroup>
            <InputGroup.Text>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </InputGroup>
        </div>
        <div className="col-md-2">
          <Button variant="primary" className="w-100">
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;