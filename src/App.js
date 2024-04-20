import bg from "./Image/bg.jpg";
import React, { useState } from 'react';
import MovieList from './MovieList';
import Filter from './Filter';
import Movies from './Movies';
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieDetailsPage from "./MovieDetailsPage";
import MovieCard from "./MovieCard";
import "./App.css";

const App =()=> {
  const moviesData = Movies(); // movie data from Movies component
  const [movies, setMovies] = useState( moviesData); // State pour stocker la liste de films
  const [filteredMovies, setFilteredMovies] = useState( moviesData); // State pour stocker les films filtrés
  const [showForm, setShowForm] = useState(false); // State pour contrôler l'affichage du formulaire
  const [formData, setFormData] = useState({ // State pour stocker les données du formulaire tant que l'ID, le nom, la description, la note, l'image et le genre
    id: movies.length + 1,
    name: '',
    description: '',
    rating: '',
    imageURL: '',
    genre: '',
    poster: null,
  });

  //Gestion des changements dans les champs du formulaire en mettant à jour les données par défaut avec les nouvelles valeurs entrées par le user
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (e.target.type === "file") {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  //Fonction permettant d'ajouter un nouveau film à la liste des films
  const addMovie = () => {
    // Vérification des champs requis
    if (!formData.name || !formData.description || !formData.rating || !formData.imageURL || !formData.genre) {
      alert('Make sure to fill out all fields.'); // Affiche une alerte si un champ requis est vide
      return;
    }

   //Création d'un nouvel objet représentant le film à ajouter à la liste 
    const newMovie = {
      id: formData.id,
      ...formData,
      imageUrl: URL.createObjectURL(formData.image), // we are assuming that the image is stored locally for now
    };

    setMovies([...movies, newMovie]); // Mise à jour de la liste des films avec le nouveau film ajouté
    setFilteredMovies([...movies, newMovie]); // Mise à jour de la liste filtrée des films avec le nouveau film ajouté

    // Réinitialisation du formulaire et masquage du formulaire d'ajout de film après l'ajout d'un film
   
    setFormData({
      id: movies.length + 1,
      name: "",
      description: "",
      rating: "",
      trailer: "",
      genre: "",
      poster: null,
    });
    setShowForm(false);
  };

  const handleFilterChange = (type, value) => {
    //we define the function to handle filter changes
    let filtered;
    if (type === "title") {
      filtered = movies.filter((movie) => movie.name.includes(value));
    } else if (type === "rating") {
      filtered = movies.filter((movie) => movie.rating === value);
    }
    setFilteredMovies(filtered);
  };

  const toggleForm = () => {
    if (showForm) {
      setFormData({
        //here's the code that reset the form when we close it
        id: movies.length + 1,
        name: "",
        description: "",
        rating: "",
        trailer: "",
        genre: "",
        poster: null,
      });
    }
    setShowForm(!showForm);
  };

  return (
    <section style={{ //background
      backgroundImage: `url(${bg})`,
      position: "relative",
      backgroundPosition: "center",
      overflow: "hidden",
    }}>
    <Container className='my-5'>
    <Router>
      <div className="container mt-4">
      <h1 className='text-capitalize text-center fw-bold' style={{color: '#FF0303'}}>You Favourite Movies</h1>
        <button onClick={toggleForm}>
          {showForm ? "Close Form" : "Add New Movie"}
        </button>
        {showForm && (
          <div >
            <input
              style={{marginBottom: "10px", padding :"10"}}
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <input
              
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
            />
            <input
             
              type="text"
              name="rating"
              placeholder="Rating"
              value={formData.rating}
              onChange={handleInputChange}
            />
            <input
              
              type="text"
              name="trailer"
              placeholder="Trailer URL"
              value={formData.trailer}
              onChange={handleInputChange}
            />
            <input
              
              type="text"
              name="genre"
              placeholder="Genre"
              value={formData.genre}
              onChange={handleInputChange}
            />
            <input
              
              type="file"
              name="image"
              onChange={handleInputChange}
            />{" "}
            {/*this file input is for image upload */}
            <button  onClick={addMovie}>
              Submit
            </button>
          </div>
        )}
        
        <Filter onFilterChange={handleFilterChange} /> {/* filter component */}
        
        <Routes>
          {/* The next code sets up a route for the root URL ("/") of the app
          the 'exact' ensures the path must match exactly
          the 'path' specifies the URL path ("/")
          the 'element' renders a <div> with movie cards*/}
          <Route
            exact
            path="/"
            element={
              <div className="movie-grid">
                {filteredMovies.map((movie) => (
                  <div className="movie-card" key={movie.id}>
                    <MovieCard movie={movie} />{" "}
                    {/* display the movie card for each movie in the list */}
                  </div>
                ))}
              </div>
            }
          />
          {/*a route made to reveal the descrption of each movie
          the element part specifies that once the route is matched, it will render the MovieDetailsPage component, passing in the moviesData as a prop*/}
          <Route
            path="/movie/:id"
            element={<MovieDetailsPage movies={filteredMovies} />}
          />
        </Routes>
      </div>
    </Router>
    </Container>
    </section>
  );
};


export default App;