import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart as solidHeart, 
  faHeart as regularHeart,
  faMapMarkerAlt,
  faDollarSign,
  faCalendarAlt,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';

const JobDetails = ({ jobs, toggleFavorite }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = jobs.find(j => j.id === id);

  if (!job) {
    return (
      <Container className="my-5">
        <Card>
          <Card.Body className="text-center py-5">
            <h2>Job Not Found</h2>
            <p>The job you're looking for doesn't exist or may have been removed.</p>
            <Button variant="primary" onClick={() => navigate('/')}>
              Back to Job Listings
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Card className="job-details mx-auto">
        <Card.Body>
          <div className="d-flex justify-content-between mb-4">
            <div>
              <Button 
                variant="outline-secondary" 
                onClick={() => navigate('/')}
                className="mb-3"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                Back to Jobs
              </Button>
              <h1>{job.title}</h1>
              <h3 className="text-primary mb-3">{job.company}</h3>
              
              <div className="d-flex flex-wrap gap-3 mb-4">
                <div>
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2 text-muted" />
                  <span className="text-muted">{job.location}</span>
                </div>
                {job.salary && (
                  <div>
                    <FontAwesomeIcon icon={faDollarSign} className="me-2 text-muted" />
                    <span className="text-muted">{job.salary}</span>
                  </div>
                )}
                <div>
                  <FontAwesomeIcon icon={faCalendarAlt} className="me-2 text-muted" />
                  <span className="text-muted">
                    Posted on {new Date(job.postedDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => toggleFavorite(job.id)}
              className="favorite-btn align-self-start"
            >
              <FontAwesomeIcon 
                icon={job.isFavorite ? solidHeart : regularHeart} 
                size="lg"
                color={job.isFavorite ? "#dc3545" : "#6c757d"} 
              />
            </button>
          </div>
          
          {job.salary && (
            <Badge bg="light" text="primary" className="salary-badge mb-4 p-2">
              <FontAwesomeIcon icon={faDollarSign} className="me-2" />
              {job.salary}
            </Badge>
          )}
          
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Job Description</Card.Title>
              {job.description.split('\n').map((paragraph, i) => (
                <p key={i} className="mb-3">{paragraph}</p>
              ))}
            </Card.Body>
          </Card>
          
          <div className="d-flex gap-3">
            <Button variant="primary" size="lg">
              Apply Now
            </Button>
            <Button 
              variant="outline-secondary" 
              size="lg"
              onClick={() => navigate('/')}
            >
              Back to Listings
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default JobDetails;