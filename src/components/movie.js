import React, { useState, useEffect } from "react";
import MovieDataService from "../services/movies";
import { Link, useParams } from "react-router-dom";
import moment from "moment";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

const Movie = ({ user }) => {
  const [movie, setMovie] = useState({
    id: null,
    title: "",
    rated: "",
    reviews: [],
  });

  console.log(`this is the user ${user.name} and ${user.id}`);

  const getMovie = (id) => {
    MovieDataService.get(id)
      .then((response) => {
        setMovie(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const params = useParams();
  useEffect(() => {
    getMovie(params.id);
  }, [params.id]);
  
  console.log(`UserId: ${user.id} and Review ID: ${movie.title}`);

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Image src={`${movie.poster}/100px250`} fluid />
          </Col>
          <Col>
            <Card>
              <Card.Header as="h5">{movie.title}</Card.Header>
              <Card.Body>
                <Card.Text>{movie.plot}</Card.Text>
                {user.id && (
                  <Link to={`/movies/${params.id}/review`}>Add Reviews</Link>
                )}
              </Card.Body>
            </Card>
            <br />
            {movie.reviews && movie.reviews.length > 0
              ? movie.reviews.map((review) => {
                  return (
                    <Card key={review.id}>
                      <Card.Body>
                        <h5>{`ID: ${review._id}`}</h5>
                        <h5>{`${review.name} reviewed on ${moment(
                          review.date
                        ).format("Do MMMM YYYY")}`}</h5>
                        <p>{review.review}</p>
                        {user.id === review.user_id && (
                          <Row>
                            <Col>
                              <Link
                                to={{
                                  pathname: `/movies/${params.id}/review`,
                                }}
                                state={review}
                              >
                                Edit
                              </Link>
                            </Col>
                            <Col>
                              <Button variant="danger">Delete</Button>
                            </Col>
                          </Row>
                        )}
                      </Card.Body>
                    </Card>
                  );
                })
              : "No reviews yet."}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Movie;
