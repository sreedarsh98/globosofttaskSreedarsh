import React, { useState, useEffect } from 'react';
import JobCard from '../components/JobCard';
import SearchBar from '../components/SearchBar';
import SkeletonLoader from '../components/SkeletonLoader';
import { useJobs } from '../hooks/useJobs';

const Home = () => {
  const { jobs, loading, error, toggleFavorite } = useJobs();
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [sortBy, setSortBy] = useState('date');
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  const handleSearch = (title, location) => {
    const filtered = jobs.filter(job => {
      const titleMatch = job.title.toLowerCase().includes(title.toLowerCase());
      const locationMatch = job.location.toLowerCase().includes(location.toLowerCase());
      return titleMatch && locationMatch;
    });
    setFilteredJobs(filtered);
    setCurrentPage(1); // Reset to first page on new search
  };

  useEffect(() => {
    setFilteredJobs(jobs);
  }, [jobs]);

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.postedDate) - new Date(a.postedDate);
    } else {
      const salaryA = a.salary ? parseInt(a.salary.replace(/[^0-9]/g, '')) : 0;
      const salaryB = b.salary ? parseInt(b.salary.replace(/[^0-9]/g, '')) : 0;
      return salaryB - salaryA;
    }
  });

  const paginatedJobs = sortedJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Job Listings</h1>
        <select 
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="date">Sort by Date</option>
          <option value="salary">Sort by Salary</option>
        </select>
      </div>
      
      <SearchBar onSearch={handleSearch} />
      
      {loading && <SkeletonLoader count={5} />}
      
      {error && <div className="error-message text-red-500">{error}</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedJobs.map(job => (
          <JobCard 
            key={job.id} 
            job={job} 
            onFavoriteToggle={toggleFavorite} 
          />
        ))}
      </div>
      
      {filteredJobs.length > jobsPerPage && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: Math.ceil(sortedJobs.length / jobsPerPage) }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 mx-1 border rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : ''}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(sortedJobs.length / jobsPerPage)))}
            disabled={currentPage === Math.ceil(sortedJobs.length / jobsPerPage)}
            className="px-4 py-2 mx-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;