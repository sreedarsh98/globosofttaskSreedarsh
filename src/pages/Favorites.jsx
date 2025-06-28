import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import JobCard from '../Components/JobCard';


const Favorites = ({ jobs, toggleFavorite, onViewDetails }) => {
  const favoriteJobs = jobs.filter(job => job.isFavorite);

  return (
    <Container className="my-5">
      <Card className="mb-4">
        <Card.Body>
          <h1>Your Favorite Jobs</h1>
          <p className="text-muted">
            {favoriteJobs.length} {favoriteJobs.length === 1 ? 'job' : 'jobs'} saved
          </p>
        </Card.Body>
      </Card>
      
      {favoriteJobs.length === 0 ? (
        <Card className="empty-state">
          <Card.Body>
            <div className="empty-state-icon">
              <FontAwesomeIcon icon={faHeartBroken} size="3x" />
            </div>
            <h3>No favorites yet</h3>
            <p className="text-muted mb-4">Save jobs you're interested in by clicking the heart icon.</p>
            <Button variant="primary" href="/">
              Browse Jobs
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {favoriteJobs.map(job => (
            <Col key={job.id}>
              <JobCard
                job={job} 
                onFavoriteToggle={toggleFavorite}
                onViewDetails={onViewDetails}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Favorites;