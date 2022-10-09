import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Link, Routes } from "react-router-dom";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import AddReview from "./components/add-review";
import MoviesList from "./components/movies-list";
import Movie from "./components/movie";
import Login from "./components/login";

function App() {
  const [user, setUser] = React.useState({ name: "ho", id: "" });
  console.log(`Name: ${user.name} and ID: ${user.id}`);
  // async function logIn(name, id) {
  //   setUser({ name, id });
  //   console.log(`user ${user.name}`);
  // }

  async function logout() {
    setUser({ name: "logout", id: "" });
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
              {user.id ? (
                <Button variant="primary" type="button" onClick={logout}>
                  Logout User {user.name}
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
        <Route path="/movies/:id/review" element={<AddReview user={user} />} />
        <Route path="/login" element={<Login logIn={setUser} />} />
      </Routes>
    </div>
  );
}

export default App;
