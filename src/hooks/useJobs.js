import { useState, useEffect } from 'react';
  import { data } from '../data';

const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
       
        setTimeout(() => {
          const storedFavorites = JSON.parse(localStorage.getItem('favoriteJobs') || '[]');
          
          // const mockJobs = [
          //   {
          //     id: "1",
          //     title: "Frontend Developer",
          //     company: "Tech Corp",
          //     location: "New York, NY",
          //     salary: "$90,000 - $120,000",
          //     description: "We are looking for a skilled Frontend Developer to join our team. Responsibilities include developing user interfaces, implementing responsive designs, and collaborating with the backend team.\n\nRequirements:\n- 3+ years of React experience\n- Strong JavaScript skills\n- Familiarity with modern frontend tools",
          //     postedDate: "2023-05-15",
          //     isFavorite: storedFavorites.includes("1")
          //   },
          //   {
          //     id: "2",
          //     title: "Backend Engineer",
          //     company: "Data Systems",
          //     location: "Remote",
          //     salary: "$110,000 - $140,000",
          //     description: "Join our backend team to build scalable APIs and services. You'll work with Node.js, Python, and various databases to create robust backend systems.\n\nRequirements:\n- Experience with RESTful APIs\n- Knowledge of database design\n- Understanding of cloud services",
          //     postedDate: "2023-05-20",
          //     isFavorite: storedFavorites.includes("2")
          //   },
          //   {
          //     id: "3",
          //     title: "UX Designer",
          //     company: "Creative Minds",
          //     location: "San Francisco, CA",
          //     salary: "$85,000 - $105,000",
          //     description: "We need a creative UX Designer to help us build intuitive user experiences. You'll create wireframes, prototypes, and conduct user research.\n\nRequirements:\n- Portfolio demonstrating UX skills\n- Experience with Figma or Sketch\n- Understanding of user-centered design",
          //     postedDate: "2023-05-10",
          //     isFavorite: storedFavorites.includes("3")
          //   }
          // ];
          const mockJobs=data
          setJobs(mockJobs);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError('Failed to fetch jobs');
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const toggleFavorite = (id) => {
    setJobs(prevJobs => {
      const updatedJobs = prevJobs.map(job => 
        job.id === id ? { ...job, isFavorite: !job.isFavorite } : job
      );
      
      // Update localStorage
      const favoriteIds = updatedJobs
        .filter(job => job.isFavorite)
        .map(job => job.id);
      localStorage.setItem('favoriteJobs', JSON.stringify(favoriteIds));
      
      return updatedJobs;
    });
  };

  return { jobs, loading, error, toggleFavorite };
};

export default useJobs;