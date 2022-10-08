import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Link, Routes } from "react-router-dom";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

// import AddReview from "./components/add-review";
import MoviesList from "./components/movies-list";
import Movie from "./components/movie";
import Login from "./components/login";

function App() {
  const [user, setUser] = React.useState(null);

  async function logIn(user = null) {
    setUser(user);
    console.log(user);
  }

  async function logout() {
    setUser(null);
  }

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Movie Reviews</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>
              <Link to={"/movies"}>Movies</Link>
            </Nav.Link>
            {/* <Nav.Link as={Link} to={"/add-review"}>
              Add Review
            </Nav.Link> */}
            <Nav.Link>
              {user ? (
                <Button variant="primary" type="button" onClick={logout}>
                  Logout User
                </Button>
              ) : (
                <Link to={"/login"}>Login</Link>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Routes>
        <Route path="/movies" element={<MoviesList />} />
        {/* <Route path="/movies/:id" render={(props) => <Movie {...props} user={user} />} /> */}
        <Route path="/movies/id/:id" element={<Movie user={user} />} />
        {/* <Route path="/add-review" element={<AddReview />} /> */}
        <Route path="/login" element={<Login logIn={logIn} />} />
      </Routes>
    </div>
  );
}

export default App;
