import React, { useState } from 'react';
import { Container, Row, Col, Spinner, Pagination, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import JobCard from '../Components/JobCard';
import SearchBar from '../Components/SearchBar';

const Home = ({ jobs, loading, error, onSearch, toggleFavorite }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('date');
  const navigate = useNavigate();
  const jobsPerPage = 6;

  const parseSalary = (salaryStr) => {
    if (!salaryStr) return 0;
    return parseInt(salaryStr.replace(/[^\d]/g, ''), 10) || 0;
  };

  const sortedJobs = [...jobs].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.postedDate) - new Date(a.postedDate); // Newest first
    } else {
      return parseSalary(b.salary) - parseSalary(a.salary); // Highest salary first
    }
  });

  const paginatedJobs = sortedJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  const handleViewDetails = (id) => {
    navigate(`/job/${id}`);
  };

  return (
    <Container className="my-5">
      <SearchBar onSearch={onSearch} />

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Available Jobs</h2>
        <Form.Group className="mb-3" style={{ width: '200px' }}>
          <Form.Select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Sort by Date</option>
            <option value="salary">Sort by Salary</option>
          </Form.Select>
        </Form.Group>
      </div>

      {loading && (
        <div className="loading-spinner text-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <Row xs={1} md={2} lg={3} className="g-4 mb-4">
            {paginatedJobs.map(job => (
              <Col key={job.id}>
                <JobCard
                  job={job}
                  onFavoriteToggle={toggleFavorite}
                  onViewDetails={handleViewDetails}
                />
              </Col>
            ))}
          </Row>

          {jobs.length > jobsPerPage && (
            <div className="d-flex justify-content-center">
              <Pagination>
                <Pagination.Prev 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                />
                {Array.from({ length: Math.ceil(jobs.length / jobsPerPage) }).map((_, i) => (
                  <Pagination.Item
                    key={i}
                    active={i + 1 === currentPage}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(jobs.length / jobsPerPage)))}
                  disabled={currentPage === Math.ceil(jobs.length / jobsPerPage)}
                />
              </Pagination>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default Home;
