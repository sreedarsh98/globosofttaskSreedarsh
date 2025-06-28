import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faMapMarkerAlt, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const JobCard = ({ job, onFavoriteToggle, onViewDetails }) => {
  return (
    <Card className="job-card mb-4 h-100">
      <Card.Body>
        <div className="d-flex justify-content-between">
          <div>
            <Card.Title>{job.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-primary">{job.company}</Card.Subtitle>
          </div>
          <button 
            onClick={() => onFavoriteToggle(job.id)}
            className="favorite-btn"
          >
            <FontAwesomeIcon 
              icon={job.isFavorite ? solidHeart : regularHeart} 
              color={job.isFavorite ? "#dc3545" : "#6c757d"} 
            />
          </button>
        </div>
        
        <div className="mb-2">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2 text-muted" />
          <span className="text-muted">{job.location}</span>
        </div>
        
        {job.salary && (
          <Badge bg="light" text="primary" className="salary-badge mb-3">
            {job.salary}
          </Badge>
        )}
        
        <div className="d-flex justify-content-between align-items-center">
          <Button 
            variant="primary" 
            onClick={() => onViewDetails(job.id)}
          >
            View Details
          </Button>
          <small className="text-muted">
            <FontAwesomeIcon icon={faCalendarAlt} className="me-1" />
            {new Date(job.postedDate).toLocaleDateString()}
          </small>
        </div>
      </Card.Body>
    </Card>
  );
};

export default JobCard;