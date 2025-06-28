import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Navbar, Container, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Home from './pages/Home';
import JobDetails from './pages/JobDetails';
import Favorites from './pages/Favorites';
import useJobs from './hooks/useJobs';
import './App.css';

const App = () => {
  const { jobs, loading, error, toggleFavorite } = useJobs();
  const [filteredJobs, setFilteredJobs] = useState([]);

  const handleSearch = (title, location) => {
    const filtered = jobs.filter(job => {
      const titleMatch = job.title.toLowerCase().includes(title.toLowerCase());
      const locationMatch = job.location.toLowerCase().includes(location.toLowerCase());
      return titleMatch && locationMatch;
    });
    setFilteredJobs(filtered);
  };

  useEffect(() => {
    setFilteredJobs(jobs);
  }, [jobs]);

  return (
    <Router>
      <Navbar bg="light" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/" className="navbar-brand">
            JobBoard
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <div className="ms-auto d-flex">
              <Link to="/" className="nav-link me-3">
                Jobs
              </Link>
              <Link to="/favorites" className="nav-link">
                <FontAwesomeIcon icon={faHeart} className="me-1" />
                Favorites
              </Link>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                jobs={filteredJobs} 
                loading={loading} 
                error={error} 
                onSearch={handleSearch} 
                toggleFavorite={toggleFavorite} 
              />
            } 
          />
          <Route 
            path="/job/:id" 
            element={
              <JobDetails 
                jobs={jobs} 
                toggleFavorite={toggleFavorite} 
              />
            } 
          />
          <Route 
            path="/favorites" 
            element={
              <Favorites 
                jobs={jobs} 
                toggleFavorite={toggleFavorite} 
              />
            } 
          />
        </Routes>
      </Container>

      <footer className="bg-light py-4 mt-5 border-top">
        <Container>
          <p className="text-center text-muted mb-0">
            © {new Date().getFullYear()} JobBoard. All rights reserved.
          </p>
        </Container>
      </footer>
    </Router>
  );
};

export default App;