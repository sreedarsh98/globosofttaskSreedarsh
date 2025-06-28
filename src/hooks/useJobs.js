import { useEffect, useState } from 'react';
import { useFavorites } from '../context/FavoritesContext';

export const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isFavorite } = useFavorites();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Replace with actual API call
        const response = await fetch('/jobs.json');
        const data = await response.json();
        setJobs(data.map(job => ({
          ...job,
          isFavorite: isFavorite(job.id)
        })));
      } catch (err) {
        setError('Failed to fetch jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [isFavorite]);

  const toggleFavorite = (id) => {
    setJobs(prev => prev.map(job => 
      job.id === id ? { ...job, isFavorite: !job.isFavorite } : job
    ));
  };

  return { jobs, loading, error, toggleFavorite };
};