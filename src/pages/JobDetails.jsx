import React from 'react';
import { useParams } from 'react-router-dom';
import { useJobs } from '../hooks/useJobs';

const JobDetails = () => {
  const { id } = useParams();
  const { jobs, toggleFavorite } = useJobs();
  const job = jobs.find(j => j.id === id);

  if (!job) return <div className="container mx-auto px-4 py-8">Job not found</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">{job.title}</h1>
            <h2 className="text-xl text-gray-700">{job.company}</h2>
            <p className="text-gray-500">{job.location}</p>
          </div>
          <button 
            onClick={() => toggleFavorite(job.id)}
            className="text-2xl"
          >
            {job.isFavorite ? '❤️' : '♡'}
          </button>
        </div>
        
        {job.salary && (
          <div className="my-4 p-3 bg-gray-100 rounded">
            <span className="font-semibold">Salary:</span> {job.salary}
          </div>
        )}
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Job Description</h3>
          <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
        </div>
        
        <div className="mt-6 text-sm text-gray-500">
          Posted on: {new Date(job.postedDate).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;