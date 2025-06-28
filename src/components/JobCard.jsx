import React from 'react';

const JobCard = ({ job, onFavoriteToggle }) => {
  return (
    <div className="job-card border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold">{job.title}</h3>
      <p className="text-gray-600">{job.company}</p>
      <p className="text-gray-500">{job.location}</p>
      {job.salary && <p className="text-green-600">{job.salary}</p>}
      <div className="flex justify-between mt-4">
        <button className="view-details-btn bg-blue-500 text-white px-4 py-2 rounded">
          View Details
        </button>
        <button 
          onClick={() => onFavoriteToggle(job.id)}
          className={`favorite-btn text-2xl ${job.isFavorite ? 'text-red-500' : 'text-gray-400'}`}
        >
          {job.isFavorite ? '❤️' : '♡'}
        </button>
      </div>
    </div>
  );
};

export default JobCard;