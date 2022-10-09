import React, { useState } from "react";
import MovieDataService from "../services/movies";
import { Link, useParams, useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const AddReview = ({ user }) => {
  let editing = false;
  let initialReviewState = "";

  const location = useLocation();
  const dataState = location.state;

  if (dataState) {
    editing = true;
    initialReviewState = dataState;
  }

  const [review, setReview] = useState(initialReviewState);
  // keeps track if review is submitted
  const [submitted, setSubmitted] = useState(false);
  const params = useParams();

  const onChangeReview = (e) => {
    const newReview = e.target.value;
    setReview(newReview);
  };

  const saveReview = () => {
    const data = {
      review,
      name: user.name,
      user_id: user.id,
      movie_id: params.id, // get movie id direct from url
    };

    
    if (editing) {
      const data2 = {
        review,
        user_id: user.id,
        review_id: dataState._id
      };
      //get existing review id from location state
      MovieDataService.updateReview(data2)
        .then((response) => {
          setSubmitted(true);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      MovieDataService.createReview(data)
        .then((response) => {
          setSubmitted(true);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <div>
      <h1>Review</h1>
      {submitted ? (
        <div>
          <h4>Review submitted successfully</h4>
          <Link to={`/movies/id/${params.id}`}>Back to Movie</Link>
        </div>
      ) : (
        <Form>
          <Form.Group>
            <Form.Label>{editing ? "Edit" : "Create"} Review</Form.Label>
            <Form.Control
              type="text"
              required
              // value={review}
              onChange={onChangeReview}
            />
          </Form.Group>
          <Button variant="primary" onClick={saveReview}>
            Submit
          </Button>
        </Form>
      )}
    </div>
  );
};

export default AddReview;
