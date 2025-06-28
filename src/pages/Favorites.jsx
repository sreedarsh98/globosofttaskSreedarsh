import React from 'react';
import { useJobs } from '../hooks/useJobs';
import JobCard from '../components/JobCard';

const Favorites = () => {
  const { jobs, toggleFavorite } = useJobs();
  const favoriteJobs = jobs.filter(job => job.isFavorite);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Favorite Jobs</h1>
      
      {favoriteJobs.length === 0 ? (
        <p>You haven't favorited any jobs yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteJobs.map(job => (
            <JobCard 
              key={job.id} 
              job={job} 
              onFavoriteToggle={toggleFavorite} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;